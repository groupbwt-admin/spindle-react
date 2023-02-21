import {proxy} from 'valtio';
import {devtools,} from 'valtio/utils'

import {RECORDING_STATUS, SOCKET_ACTIONS} from "shared/constants/record-statuses";
import {SocketService} from "shared/services/base-socket-service";

interface ISocket {
	isLoading: boolean
	error: string
	isConnect: boolean
	recordStatus: string,
	isRecording: boolean
	isOnline: boolean
	emit: (data: IEmitProps) => void;
	save: (type: string, fn: (video: object) => void) => void
	connect: () => void,
	close: () => void,
	onConnectListener: () => void,
	onDisconnectedListener: (stopRecording: () => void) => void,
	unfollowListener: (type: string) => void,
	setStatus: (status: string) => void,
	setIsRecording: (isShow: boolean) => void,
	setIsOnline: (isOnline: boolean) => void

}

interface IEmitProps {
	type: string,
	payload?: object | void
}


export const socketState = proxy<ISocket>(
	{
		isLoading: true,
		error: '',
		isConnect: false,
		recordStatus: RECORDING_STATUS.permission_requested,
		isRecording: false,
		isOnline: true,
		emit(data) {
			if (this.recordStatus !== RECORDING_STATUS.reset) {
				SocketService.emit(data.type, data.payload)
			}
		},
		save(type, fn) {
			SocketService.save(type, fn)
		},
		connect() {
			if (!SocketService.socket.connected) {
				SocketService.socket.connect()
			}
		},
		close() {
			SocketService.socket.close()
			this.isConnect = false
		},
		onConnectListener() {
			SocketService.on(SOCKET_ACTIONS.connect, () => {
				this.isConnect = true
			});
		},
		onDisconnectedListener(stopRecording) {
			SocketService.on(SOCKET_ACTIONS.disconnect, () => {
				this.isConnect = false
				stopRecording()
				SocketService.socket?.close()
			})
		},
		unfollowListener(type) {
			SocketService.off(type);
			if (this.isConnect) {
				this.isConnect = false
			}
		},
		setStatus(status) {
			this.recordStatus = status
		},
		setIsRecording(isShow) {
			this.isRecording = isShow
		},
		setIsOnline(isOnline) {
			this.isOnline = isOnline
		},
	},
)


devtools(socketState, {name: 'socketState', enabled: true});
