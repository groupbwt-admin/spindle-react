import socketIOClient, { Socket } from 'socket.io-client';

import { RECORD_SOCKET_PATH } from 'shared/config/variables';

import { LocalStorageService } from './local-storage-service';

class _SocketService {
	private _socket: Socket = socketIOClient(RECORD_SOCKET_PATH!, {
		transportOptions: {
			polling: {
				extraHeaders: {
					Authorization: `Bearer ${LocalStorageService.get('token')}`,
				},
			},
		},
		autoConnect: false,
	});
	get socket(): Socket {
		return this._socket;
	}

	set socket(value: Socket) {
		this._socket = value;
	}

	emit(type: string, payload?: object | void) {
		this.socket.emit(type, payload && payload);
	}

	save(type, fn) {
		this.socket.emit(type, fn);
	}

	on(type: string, fn) {
		this.socket.on(type, fn);
	}

	off(type: string) {
		this.socket.off(type);
	}
}

export const SocketService = new _SocketService();
