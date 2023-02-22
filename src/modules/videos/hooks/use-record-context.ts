import { useContext } from 'react';

import {
	selectIsOnline,
	selectIsRecording,
} from 'app/store/record-socket/selects';

import { RecordContext } from '../context/record-context';

export const useRecordContext = () => {
	const { startRecording } = useContext(RecordContext);
	const isRecording = selectIsRecording();
	const isOnline = selectIsOnline();

	return {
		isRecording,
		isOnline,
		startRecording,
	};
};
