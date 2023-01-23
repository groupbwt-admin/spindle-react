import React, {useEffect, useState, useRef} from 'react';
import {LocalStorageService} from 'shared/services/local-storage-service';
import {SERVER_BASE_IP} from 'shared/config/variables';
import io, {ManagerOptions, Socket, SocketOptions} from 'socket.io-client';


const useSocket = (url?: string, options?: Partial<ManagerOptions & SocketOptions> | undefined) => {
	const {current: socket} = useRef(io(url ? url : '', options));
	useEffect(() => {
		return () => {
			if (socket) {
				socket.close();
			}
		};
	}, [socket]);

	return socket;

	if (!url) {
		console.error('SERVER_BASE_IP is undefined !!!')
	}
};

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
	}
};

export const useSocketStream = () => {
	const [isConnect, setIsConnect] = useState(false);
	const socket = useSocket(SERVER_BASE_IP, socketOptions);

	const socketEmit = {
		start: (payload: Blob) => socket.emit(SOCKET_ACTIONS.START, {chunk: payload}),
		save: async () => {
			await socket.emit(SOCKET_ACTIONS.SAVE);
			await socket.disconnect();
			console.log('save disconnect');
		},
		generateVideoPath: () => socket.emit(SOCKET_ACTIONS.GENERATE_VIDEO_PATH),
		connect: () => {
			socket.connect();
			console.log('connect');
		},
		reset: () => socket?.emit(SOCKET_ACTIONS.RESET),
	};


	useEffect(() => {
		socket.on('connect', () => {
			console.log('connected');
			setIsConnect(true)

		})
		socket.on('disconnect', () => {
			console.log('disconnected');
			setIsConnect(false)

		})
	}, []);


	return {
		socketEmit,
		isConnect,

	}

}
