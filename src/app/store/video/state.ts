import {devtools} from 'valtio/utils'
import {proxy} from 'valtio';
import {socketConnect, socketEmit, socketEmitSave,} from "shared/services/base-socket-service";

interface ISocket {
	isLoading: boolean
	error: string
	emit: (data: IEmitProps) => void;
	save: (type: string, fn: (video: object) => void) => void
	connect: () => void,

}

interface IEmitProps {
	type: string,
	payload?: object,

}

export const socketState = proxy<ISocket>(
		{
			isLoading: true,
			error: '',
			emit(data: IEmitProps) {
				try {
					socketEmit({type: data.type, payload: data.payload})
				} catch (e) {
					socketState.error = data.type + 'failed !'
					console.error(e)
				}

			},
			save: async (type, fn) => {
				try {
					await socketEmitSave(type, fn)
				} catch (e) {
					socketState.error = type + 'failed !'
					console.error(e)
				}
			},
			connect: async () => {
				try {
					await socketConnect()
					socketState.isLoading = false
				} catch (e) {
					socketState.isLoading = false
					socketState.error = 'Connect failed !'
					console.error(e)

				}
			}
		},
	)
;

devtools(socketState, {name: 'socketState', enabled: true});
