import React from 'react';
import styled from "@emotion/styled/macro";

interface IRecordControllerCommand {
	toggleMicrophone: () => void
	pauseRecording: () => void
	resetRecording: () => void
	resumeRecording: () => void
	stopRecording: () => void
}

interface IRecordControllerModels {
	timeRecording: string
	recordStatus: string
	isMicrophoneOn: boolean
}

interface IRecordController {
	command: IRecordControllerCommand
	models: IRecordControllerModels
}

const Controller = styled.div`
	position: fixed;
	top: 40%;
	left: 150px;
	display: flex;
	flex-direction: column;

`;

const ButtonController = styled.button`
	background: transparent;

`;

export const RecordController: React.FC<IRecordController> = ({command, models}) => {
	const {
		toggleMicrophone,
		pauseRecording,
		resetRecording,
		resumeRecording,
		stopRecording
	} = command
	const {
		timeRecording, recordStatus, isMicrophoneOn,

	} = models
	return (
		<Controller>
			<p>Status: {recordStatus}</p>
			<p>Time: {timeRecording}</p>
			<button onClick={stopRecording}>Stop Recording</button>
			<button onClick={pauseRecording}>Pause Recording</button>
			<button onClick={resumeRecording}>Resume Recording</button>
			<button onClick={resetRecording}>Reset Recording</button>
			<button onClick={toggleMicrophone}>toggleMicrophone
				+ {isMicrophoneOn ? 'true' : 'false'}</button>
		</Controller>
	);
}

