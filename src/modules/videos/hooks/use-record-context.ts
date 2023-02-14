import React, {useContext} from 'react';

import {selectIsRecording} from "../../../app/store/record-socket/selects";
import {RecordContext} from "../context/record-context";

export const useRecordContext = () => {
	const {startRecording} = useContext(RecordContext);
	const isRecording = selectIsRecording()

	return {
		isRecording,
		startRecording
	}
}


