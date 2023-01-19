import React, { useState} from 'react';
import {io, Socket} from 'socket.io-client'
import {LocalStorageService} from 'shared/services/local-storage-service';


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
	const [socket, setSocket] = useState<Socket | null>(io('91.225.201.50:10000', socketOptions));

/////91.225.201.50:10000

	const saveVideo =  () => {
			socket?.emit('record:save')
	}

	return {
		socket,
		saveVideo
	}

}
