import { useRecordSocketState } from 'app/store/record-socket/state';

export const selectStatus = () =>
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useRecordSocketState((state) => state.recordStatus);
export const selectIsConnected = () =>
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useRecordSocketState((state) => state.isConnected);
export const selectIsRecording = () =>
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useRecordSocketState((state) => state.isRecording);
