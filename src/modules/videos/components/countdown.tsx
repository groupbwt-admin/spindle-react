import React from 'react';
import styled from '@emotion/styled/macro';
import {Button} from "shared/components/button/button";
import {selectCounterBeforeStart, selectStatus} from "../../../app/store/record-socket/selects";
import {RECORDING_STATUS} from "../../../shared/constants/record-statuses";
import {EventBus, RECORDING_EVENTS} from "../../../shared/utils/event-bus";

const CountWrapper = styled.div`
	position: fixed;
	z-index: 100;
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, 0.52);
`;
const CountValue = styled.p`
	color: #fff;
	font-family: 'Catamaran';
	font-style: normal;
	font-weight: 600;
	font-size: 180px;
	line-height: 200px;
	margin: 0;
`;
const CancelButton = styled(Button)`
	max-width: 190px;
	color: #ffffff;
`;
const prev_stop = () => {
	EventBus.emit(RECORDING_EVENTS.prev_stop)
}
export const Countdown = () => {
	const status = selectStatus()
	const count = selectCounterBeforeStart()
	if (status !== RECORDING_STATUS.idle) return null
	return (
		<CountWrapper>
			<CountValue>{count}</CountValue>
			<CancelButton label="Cancel Recording" onClick={prev_stop}/>
		</CountWrapper>
	);
}

