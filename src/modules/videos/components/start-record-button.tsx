import React, {memo} from 'react';

import {styled} from '@mui/material/styles';

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
	onStartRecording: () => void
}

const StartRecordButtonComponent: React.FC<IStartRecordButton> = ({isRecording, onStartRecording}) => {
	return (
		<RecordButton
			isRecording = {isRecording}
			label={isRecording ? "Recording" : "Start Recording"}
			startIcon={<IconRecord/>}
			onClick={isRecording ? undefined : onStartRecording}/>

	);
};
export const StartRecordButton = memo(StartRecordButtonComponent)
