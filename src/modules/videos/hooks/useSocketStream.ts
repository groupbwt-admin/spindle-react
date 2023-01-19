import React, {useState} from 'react';
import {io, Socket} from 'socket.io-client'
import {LocalStorageService} from 'shared/services/local-storage-service';
import {SERVER_BASE_IP} from 'shared/config/variables';

export const useSocketStream = () => {
	const socketOptions = {
		transportOptions: {
			polling: {
				extraHeaders: {
					Authorization: `Bearer ${LocalStorageService.get('token')}`,
				}
			}
		}
	};
	const [socket, setSocket] = useState<Socket | null>(io(SERVER_BASE_IP, socketOptions));

	console.log(socket?.id)
/////91.225.201.50:10000
	const socketConnect = () => {
		if (!socket) {
			setSocket(io(SERVER_BASE_IP, socketOptions))
		}
	}

	const socketStart = (videoChunk: Blob) => {
		socket?.emit('record:start', {
			chunk: videoChunk,
		})
	}
	const socketReset = () => {
		if (!socket) throw Error('No socket connection!');
		socket.emit('record:save')
	}
	const socketSave = async () => {
		if (!socket) throw Error('No socket connection!');
		await socket.emit('record:save')
		await socket.disconnect()
		// await setSocket(null)

	}

	return {
		socketConnect,
		socketStart,
		socketSave,
		socketReset
	}

}
