import React, {memo} from 'react';

import {styled} from '@mui/material/styles';

import {ReactComponent as IconRecord} from 'shared/components/icon/collection/record.svg';

import {Button} from "../../../shared/components/button/button";


const RecordButton = styled(Button)`
	max-width: 190px;
	color: #ffffff;
	position: fixed;
	top: 24px;
	right: 32px;
`;

interface IStartRecordButton {
	isShow: boolean,
	onStartRecording: () => void
}

const StartRecordButtonComponent: React.FC<IStartRecordButton> = ({isShow, onStartRecording}) => {
	if (!isShow) return null
	return (
		<RecordButton
			label="Start Recording"
			startIcon={<IconRecord/>}
			onClick={onStartRecording}/>

	);
};
export const StartRecordButton = memo(StartRecordButtonComponent)
