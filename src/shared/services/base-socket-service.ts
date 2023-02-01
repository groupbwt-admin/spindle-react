import socketIOClient, {Socket} from "socket.io-client";
import {SERVER_BASE_IP} from 'shared/config/variables';
import {LocalStorageService} from "./local-storage-service";


class _SocketService {
	get socket(): Socket {
		return this._socket;
	}
	set socket(value: Socket) {
		this._socket = value;
	}
	private _socket: Socket = socketIOClient(SERVER_BASE_IP!, {
		transportOptions: {
			polling: {
				extraHeaders: {
					Authorization: `Bearer ${LocalStorageService.get('token')}`,
				}
			}
		},
		autoConnect: false,
	})

	emit(type: string, payload?: object | void) {
		this.socket.emit(type, payload && payload)
	}

	save(type, fn) {
		this.socket.emit(type, fn)
	}

	on(type: string, fn) {
		this.socket.on(type, fn)
	}

	off(type: string) {
		this.socket.off(type)
	}
}

export const SocketService = new _SocketService();
