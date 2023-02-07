import React, {memo, useCallback} from 'react';
import {Button} from "../../../shared/components/button/button";
import {selectStatus} from "../../../app/store/record-socket/selects";
import {socketState} from "../../../app/store/record-socket/state";
import {styled} from '@mui/material/styles';
import {ReactComponent as IconRecord} from 'shared/components/icon/collection/record.svg';
import {RECORDING_STATUS} from "../../../shared/constants/record-statuses";
import {EventBus, RECORDING_EVENTS} from "../../../shared/utils/event-bus";


const RecordButton = styled(Button)`
	max-width: 190px;
	color: #ffffff;
	position: fixed;
	top: 24px;
	right: 32px;
`;
const StartRecordButtonComponent = () => {
	const status = selectStatus()

	const onStartRecording = () => {
		EventBus.emit(RECORDING_EVENTS.start)
	}


	return (
		<>{
			status === RECORDING_STATUS.permission_requested || status === RECORDING_STATUS.stopped ?
				<RecordButton
					label="Start Recording"
					startIcon={<IconRecord/>}
					onClick={onStartRecording}/>
				: null
		}</>

	);
};

export const StartRecordButton = memo(StartRecordButtonComponent)
