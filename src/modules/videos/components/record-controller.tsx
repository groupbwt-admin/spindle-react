import React from 'react';
import styled from "@emotion/styled/macro";
import {RECORDING_STATUS} from "../../../shared/constants/record-statuses";
import {StopWatch} from "./stop-watch";
import {socketState} from "app/store/record-socket/state";
import {Controller} from "./controller";

interface IRecordControllerCommand {
	toggleMicrophone: () => void
	pauseRecording: () => void
	resetRecording: () => void
	resumeRecording: () => void
	stopRecording: () => void
}

interface IRecordControllerModels {
	isMicrophoneOn: boolean
}

interface IRecordController {
	command: IRecordControllerCommand
	models: IRecordControllerModels
}


export const RecordController = () => {
	// const status = selectStatus()
	const ControllerWrapper = styled.div`
		position: fixed;
		top: 40%;
		left: 150px;
			//display: ${(socketState.recordStatus === RECORDING_STATUS.recording || socketState.recordStatus === RECORDING_STATUS.paused) ? "flex" : "none"};
		display: flex;
		flex-direction: column;
		padding: 24px 18px;
		background: #000000;
		border-radius: 50px;
		width: 78px;
	`;

	return (
		<ControllerWrapper>
			<Controller/>
			<StopWatch/>
		</ControllerWrapper>
	);
}

