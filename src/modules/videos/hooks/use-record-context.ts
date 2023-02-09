import React, {useContext} from 'react';
import {RecordContext} from "../context/recordContext";
import {selectIsShowController, selectStatus} from "../../../app/store/record-socket/selects";

export const useRecordContext = () => {
	const {startRecording} = useContext(RecordContext);
	const isShowController = selectIsShowController()

	return {
		isShowButton: !isShowController,
		startRecording
	}
}


