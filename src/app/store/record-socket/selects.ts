/* eslint-disable react-hooks/rules-of-hooks */
import { shallow } from 'zustand/shallow';

import { useRecordSocketState } from 'app/store/record-socket/state';

export const selectStatus = () =>
	useRecordSocketState((state) => state.recordStatus, shallow);
export const selectIsConnected = () =>
	useRecordSocketState((state) => state.isConnected, shallow);
export const selectIsRecording = () =>
	useRecordSocketState((state) => state.isRecording, shallow);
