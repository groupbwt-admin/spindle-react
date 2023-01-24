import React, {useEffect, useState,} from 'react';
import {LocalStorageService} from 'shared/services/local-storage-service';
import {SERVER_BASE_IP} from 'shared/config/variables';
import {useSocket} from './useSocket'
import {VideoApi} from "../../../app/api/video-api/video-api";
import { useQuery} from "react-query";
import {VIDEO_ROUTES} from "../../../shared/config/routes";
import {useNavigate} from "react-router-dom";
import {VIDEO_QUERY_KEYS} from "../../../shared/constants/query-keys";

export const SOCKET_ACTIONS = {
	CONNECT: "connect",
	DISCONNECT: 'disconnect',
	START: 'record:start',
	SAVE: 'record:save',
	GENERATE_VIDEO_PATH: 'record:generate-video-path',
	RESET: 'record:reset',
}

const socketOptions = {
	transportOptions: {
		polling: {
			extraHeaders: {
				Authorization: `Bearer ${LocalStorageService.get('token')}`,
			}
		}
	},
	autoConnect: false,
};

export const useSocketStream = () => {
	const [isConnect, setIsConnect] = useState(false);
	const socket = useSocket(SERVER_BASE_IP, socketOptions);
	const navigate = useNavigate()
	const lastVideo = useQuery({
		queryKey: [VIDEO_QUERY_KEYS.lastVideo,],
		queryFn: () => VideoApi.getLastVideo(),
	});
	const socketEmit = {
		start: (payload: Blob) => socket.emit(SOCKET_ACTIONS.START, {chunk: payload}),
		save: () => {
			socket.emit(SOCKET_ACTIONS.SAVE);
			navigate(VIDEO_ROUTES.VIDEO.generate(lastVideo.data.id))
		},
		generateVideoPath: () => socket.emit(SOCKET_ACTIONS.GENERATE_VIDEO_PATH),
		reset: () => socket?.emit(SOCKET_ACTIONS.RESET),
	};
	return {
		socketEmit,
		isConnect,
	}
}
