import {proxy} from 'valtio';
import {devtools,} from 'valtio/utils'

import {RECORDING_STATUS, SOCKET_ACTIONS} from "shared/constants/record-statuses";
import {SocketService} from "shared/services/base-socket-service";

interface ISocket {
	isLoading: boolean
	error: string
	isConnected: boolean
	recordStatus: string,
	isRecording: boolean
	emit: (data: IEmitProps) => void;
	save: (type: string, fn: (video: { id: string }) => void) => void
	connect: () => void,
	close: () => void,
	onConnectListener: () => void,
	onDisconnectedListener: (stopRecording: () => void) => void,
	unfollowListener: (type: string) => void,
	setStatus: (status: string) => void,
	setIsRecording: (isShow: boolean) => void,
	setIsConnected: (isOnline: boolean) => void

}

interface IEmitProps {
	type: string,
	payload?: object | void
}


export const socketState = proxy<ISocket>(
	{
		isLoading: true,
		error: '',
		isConnected: false,
		recordStatus: RECORDING_STATUS.permission_requested,
		isRecording: false,
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
			this.isConnected = false
		},
		onConnectListener() {
			SocketService.on(SOCKET_ACTIONS.connect, () => {
				this.isConnected = true
			});
		},
		onDisconnectedListener(stopRecording) {
			SocketService.on(SOCKET_ACTIONS.disconnect, () => {
				this.isConnected = false
				stopRecording()
				SocketService.socket?.close()
			})
		},
		unfollowListener(type) {
			SocketService.off(type);
			if (this.isConnected) {
				this.isConnected = false
			}
		},
		setStatus(status) {
			this.recordStatus = status
		},
		setIsRecording(isShow) {
			this.isRecording = isShow
		},
		setIsConnected(isConnected) {
			this.isConnected = isConnected
		},
	},
)


devtools(socketState, {name: 'socketState', enabled: true});
