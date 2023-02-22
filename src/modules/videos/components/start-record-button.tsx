import React, { memo } from 'react';

import { styled } from '@mui/material/styles';

import { Button } from 'shared/components/button/button';
import { ReactComponent as IconOffline } from 'shared/components/icon/collection/offline.svg';
import { ReactComponent as IconRecord } from 'shared/components/icon/collection/record.svg';

interface IRecordButton {
	isRecording: boolean;
}

const RecordButton = styled(Button)<IRecordButton>`
	max-width: 190px;
	color: #fff;

	span svg circle {
		stroke: ${(props) => props.isRecording && '#FF5656'};
	}
`;

interface IStartRecordButton {
	isRecording: boolean;
	isOnline: boolean;
	onStartRecording: () => void;
}

const StartRecordButtonComponent: React.FC<IStartRecordButton> = ({
	isRecording,
	onStartRecording,
	isOnline,
}) => {
	return (
		<RecordButton
			isRecording={isRecording}
			label={isRecording ? 'Recording' : 'Start Recording'}
			startIcon={isOnline ? <IconRecord /> : <IconOffline />}
			onClick={!isRecording ? onStartRecording : undefined}
			disabled={!isOnline}
		/>
	);
};
export const StartRecordButton = memo(StartRecordButtonComponent);
