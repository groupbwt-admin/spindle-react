import socketIOClient from "socket.io-client";
import {LocalStorageService} from "./local-storage-service";
import {SERVER_BASE_IP} from 'shared/config/variables';

interface IEmitProps {
	type: string,
	payload?: object
}

export const socket = socketIOClient(SERVER_BASE_IP!, {
	transportOptions: {
		polling: {
			extraHeaders: {
				Authorization: `Bearer ${LocalStorageService.get('token')}`,
			}
		}
	},
	autoConnect: false,
});

export const socketConnect =  () => {
	if (!socket.connected) {
		socket.connect();
	}
}
export const socketEmit = (data: IEmitProps) => socket.emit(data.type, data.payload)
export const socketEmitSave = (type, fn) => socket.emit(type, fn)
export const socketOn = (type, fn) => socket.on(type, fn)
export const socketOff = (type) => socket.off(type)
export const socketClose = () => socket.close()
