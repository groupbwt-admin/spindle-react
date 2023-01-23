import io, {ManagerOptions, SocketOptions, Socket} from "socket.io-client";
import {useEffect, useRef, useState} from "react";

export const useSocket = (url?: string, options?: Partial<ManagerOptions & SocketOptions> | undefined) => {
	const [socket, setSocket] = useState<Socket>(io(url ? url : '', options));
	useEffect(() => {

		socket.on('disconnect', () => {
			console.log('disconnected');
		})
		socket.on('connect', () => {
			console.log('connect');
		});

		if (!socket.connected) {
			socket.connect();
		}
		return () => {
			socket.off('disconnect');
			socket.off('connect');
			if (socket) {
				socket.close();
			}
		};
	}, [socket]);

	if (!url) {
		console.error('SERVER_BASE_IP is undefined !!!')
	}
	return socket;

};
