import React from 'react';
import styled from '@emotion/styled/macro';
import {Button} from "../../shared/components/button/button";

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
	//opacity: 0.5;
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

interface ICountdownProps {
	count: number
	resetRecording: () => void
}

export const Countdown: React.FC<ICountdownProps> = ({count, resetRecording}) => {
	return (
		<CountWrapper>
			<CountValue>{count}</CountValue>
			<CancelButton label="Cancel Recording" onClick={resetRecording}/>
		</CountWrapper>
	);
}

