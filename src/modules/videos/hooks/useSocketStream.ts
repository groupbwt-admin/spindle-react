import React, {useEffect, useRef, useState} from 'react';
import {io, Socket} from 'socket.io-client'
import {selectUserData} from 'app/store/user/selects';
import {LocalStorageService} from 'shared/services/local-storage-service';
import {axios} from 'app/config/axios/axios';


export const useSocketStream = () => {
	const userData = selectUserData();


	const [socketId, setSocketId] = useState<number | string>('')
	console.log(socketId)
	const socketOptions = {
		transportOptions: {
			polling: {
				extraHeaders: {
					Authorization: `Bearer ${LocalStorageService.get('token')}`,
				}
			}
		}
	};
/////91.225.201.50:10000
	const socket: Socket = io('91.225.201.50:10000', socketOptions)

	useEffect(() => {
			socket.emit('user:connect', {userId: userData?.id});
			socket.on('user:connect:response', (data) => {
				setSocketId(data)
			});
	}, [])


	// const socketRecord = (chunk: Blob) => {
	// 	socket.emit('record:start', {
	// 		socketId: socketId,
	// 	});
	// 	socket.emit('record:append', {
	// 		chunk: chunk,
	// 		socketId: socketId,
	// 	})
	// 	console.log(chunk)
	// }

	const saveVideo = async () => {
		// await socket.emit('record:stop', { socketId: socketId })

		const data = {
			"socketId": socketId,
			"title": "2",
			"tags": [
				"test",

			]
		}
		await	axios.post('http://spindle-api.groupbwt.com/api/videos/save', data);
		await	console.log('save stop')
	}


	return {

		socket, socketId,
		saveVideo
	}

}
