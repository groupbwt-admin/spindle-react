import React, {memo, useEffect} from 'react';
import styled from "@emotion/styled/macro";

import {selectStatus} from "../../../app/store/record-socket/selects";
import {RECORDING_STATUS} from "../../../shared/constants/record-statuses";
import {useStopWatch} from "../hooks/use-stop-watch";

const ControllerStopWatch = styled.p`
	font-family: 'Catamaran';
	font-weight: 600;
	font-size: 16px;
	color: #FFFFFF;
	padding: 12px 0;
	margin: 0;
	border-top: 1px solid #FFFFFF;
`;
export const StopWatchComponent = () => {
	const {
		startTimer,
		pauseTimer,
		resetTimer,
		time
	} = useStopWatch()
	const status = selectStatus()

	const statusFn = {
		[RECORDING_STATUS.recording]: () => startTimer(),
		[RECORDING_STATUS.stopped]: () => pauseTimer(),
		[RECORDING_STATUS.paused]: () => pauseTimer(),
		[RECORDING_STATUS.error]: () => resetTimer(),
		[RECORDING_STATUS.permission_requested]: () => resetTimer(),
		[RECORDING_STATUS.idle]: () => resetTimer(),
	}

	useEffect(() => {
		statusFn[status]()
	}, [status]);


	return (
		<ControllerStopWatch>{time}</ControllerStopWatch>
	);
};
export const StopWatch = memo(StopWatchComponent)

