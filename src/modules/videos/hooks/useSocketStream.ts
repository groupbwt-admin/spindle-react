import React, {useEffect, useRef, useState} from 'react';
import {io, Socket} from 'socket.io-client'
import {selectUserData} from 'app/store/user/selects';
import {LocalStorageService} from 'shared/services/local-storage-service';
import {axios} from 'app/config/axios/axios';


export const useSocketStream = () => {
	const [socket, setSocket] = useState<Socket | null>(null);
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

	useEffect(() => {
		return () => {
			setSocket(io('91.225.201.50:10000', socketOptions))
		};
	}, []);



	const saveVideo = async () => {
		if(socket){
			socket.emit('record:save')
			console.log('save stop')
		}

	}


	return {
		socket,
		saveVideo
	}

}
