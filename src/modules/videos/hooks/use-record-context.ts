import React, {useContext} from 'react';

import {selectIsConnect, selectIsRecording} from "../../../app/store/record-socket/selects";
import {RecordContext} from "../context/record-context";

export const useRecordContext = () => {
	const {startRecording} = useContext(RecordContext);
	const isRecording = selectIsRecording()
	const isConnected = selectIsConnect()

	return {
		isRecording,
		isConnected,
		startRecording
	}
}


