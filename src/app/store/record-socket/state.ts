import {devtools,} from 'valtio/utils'
import {proxy} from 'valtio';
import {SocketService} from "../../../shared/services/base-socket-service";
import {SOCKET_ACTIONS} from "../../../shared/constants/record-statuses";

interface ISocket {
	isLoading: boolean
	error: string
	isConnect: boolean
	emit: (data: IEmitProps) => void;
	save: (type: string, fn: (video: object) => void) => void
	connect: () => void,
	onConnectListener: () => void,
	onDisconnectedListener: (stopRecording: () => void) => void,
	unfollowListener: (type: string) => void,
	close: () => void,
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
		emit(data: IEmitProps) {
			SocketService.emit(data.type, data.payload)
		},
		save(type, fn) {
			SocketService.save(type, fn)
		},
		connect() {
			if (!SocketService.socket.connected) {
				SocketService.socket.connect()
			}
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
				SocketService.socket.close()
			})
		},
		unfollowListener(type) {
			SocketService.off(type);
			if (this.isConnect) {
				this.isConnect = false
			}
		},
		close() {
			SocketService.socket.close()
			this.isConnect = false
		}

	},
)

devtools(socketState, {name: 'socketState', enabled: true});
