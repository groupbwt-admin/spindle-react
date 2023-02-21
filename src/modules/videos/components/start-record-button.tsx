import React, {memo} from 'react';
import {isDisabled} from "@testing-library/user-event/utils/misc/isDisabled";

import {styled} from '@mui/material/styles';

import {ReactComponent as IconOffline} from 'shared/components/icon/collection/offline.svg';
import {ReactComponent as IconRecord} from 'shared/components/icon/collection/record.svg';

import {Button} from "../../../shared/components/button/button";

interface IRecordButton {
	isRecording: boolean
}

const RecordButton = styled(Button)<IRecordButton>`
	max-width: 190px;
	color: #ffffff;

	span svg circle {
		stroke: ${props => props.isRecording && 'red'};
	}
`;

interface IStartRecordButton {
	isRecording: boolean,
	isOnline: boolean,
	onStartRecording: () => void
}

const StartRecordButtonComponent: React.FC<IStartRecordButton> = ({isRecording, onStartRecording, isOnline}) => {
	return (
		<RecordButton
			isRecording={isRecording}
			label={isRecording ? "Recording" : "Start Recording"}
			startIcon={isOnline ? <IconRecord/> : <IconOffline/>}
			onClick={!isRecording ? onStartRecording : undefined}
			disabled={!isOnline}
		/>

	)
		;
};
export const StartRecordButton = memo(StartRecordButtonComponent)
