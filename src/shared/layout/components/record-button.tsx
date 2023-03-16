import React, { memo } from 'react';
import clsx from 'clsx';

import { styled } from '@mui/material/styles';

import { Button } from 'shared/components/button/button';
import { ReactComponent as IconOffline } from 'shared/components/icon/collection/offline.svg';
import { ReactComponent as IconRecord } from 'shared/components/icon/collection/record.svg';
import { ReactComponent as IconStartRecord } from 'shared/components/icon/collection/start-record.svg';

interface IRecordButton {
	isRecording: boolean;
}

const StyledRecordButton = styled(Button)<IRecordButton>`
	max-width: 100%;
	display: flex;
	justify-content: flex-start;
	padding: 0 0 0 14px;
	align-items: center;
	background-color: ${(props) => props.theme.palette.common.white};
	color: ${(props) => props.theme.palette.primary.main};
	min-width: unset;
	width: 51px;
	height: 51px;
	transition: all 0.3s ${({ theme }) => theme.transitions.easing.easeIn};

	.ButtonLabel {
		white-space: nowrap;
		opacity: 0;
		transform: translateX(-10px);
		transition: opacity 0.3s ${({ theme }) => theme.transitions.easing.easeIn},
			transform 0.3s ${({ theme }) => theme.transitions.easing.easeIn};
	}

	&.isOpen {
		width: 100%;

		.ButtonLabel {
			transform: translateX(0);
			opacity: 1;
		}

		.MuiButton-startIcon {
			margin-right: 12px;
		}
	}

	.MuiButton-startIcon {
		margin-right: 0;
		position: relative;
		flex-shrink: 0;
		transition: margin-right 0.3s
			${({ theme }) => theme.transitions.easing.easeIn};
	}

	span svg circle {
		stroke: ${(props) =>
			props.isRecording ? '#FF5656' : props.theme.palette.primary.main};
	}
`;

const StyledStartRecordIcon = styled(IconStartRecord)`
	width: 30px;
	height: 30px;
	fill: ${(props) => props.theme.palette.primary.main};
	margin-left: -2.5px;
`;

interface IStartRecordButton {
	isOpen: boolean;
	className?: string;
	isRecording: boolean;
	isConnected: boolean;
	onStartRecording: () => void;
}

const RecordButtonComponent: React.FC<IStartRecordButton> = ({
	isOpen,
	isRecording,
	className,
	onStartRecording,
	isConnected,
}) => {
	return (
		<StyledRecordButton
			className={clsx(className, isOpen && 'isOpen')}
			isRecording={isRecording}
			label={isRecording ? 'Recording' : 'Start Recording'}
			startIcon={
				!isConnected ? (
					<IconOffline />
				) : isRecording ? (
					<IconRecord />
				) : (
					<StyledStartRecordIcon />
				)
			}
			disabled={!isConnected}
			onClick={!isRecording ? onStartRecording : undefined}
			color="secondary"
		/>
	);
};

export const RecordButton = memo(RecordButtonComponent);
