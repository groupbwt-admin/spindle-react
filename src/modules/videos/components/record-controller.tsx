import React, {useMemo} from 'react';
import styled from "@emotion/styled";
import {StopWatch} from "./stop-watch";
import {Controller} from "./controller";
import {selectIsShowController, selectStatus} from "../../../app/store/record-socket/selects";
import {RECORDING_STATUS} from "../../../shared/constants/record-statuses";

const ControllerWrapper = styled.div`
	position: fixed;
	top: 40%;
	left: 150px;
	display: flex;
	flex-direction: column;
	padding: 24px 18px;
	background: #000000;
	border-radius: 50px;
	width: 78px;
`;

const RecordControllerComponent = () => {
	const isShowController = selectIsShowController()

	return (
		<ControllerWrapper style={{display: !isShowController ? 'none' : 'flex'}}>
			<Controller/>
			<StopWatch/>
		</ControllerWrapper>
	);
}


export const RecordController = React.memo(RecordControllerComponent)

