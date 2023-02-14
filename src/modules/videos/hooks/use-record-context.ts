import React, {useContext} from 'react';
import {RecordContext} from "../context/record-context";
import {selectIsRecording} from "../../../app/store/record-socket/selects";

export const useRecordContext = () => {
	const {startRecording} = useContext(RecordContext);
	const isRecording = selectIsRecording()

	return {
		isRecording,
		startRecording
	}
}


