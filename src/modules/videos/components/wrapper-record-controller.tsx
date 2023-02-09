import React, {ReactNode, useCallback, useEffect, useState} from 'react';
import styled from "@emotion/styled";
import {selectIsShowController, } from "../../../app/store/record-socket/selects";
import {Icon} from "../../../shared/components/icon/icon";
import {ICON_COLLECTION} from "../../../shared/components/icon/icon-list";

interface IWrapperRecordController {
	children: JSX.Element | JSX.Element[];
}

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
	transition: all 0.1s ease-out;
	z-index: 100;
`;
const ControllerButton = styled.button`
	background: transparent;
	padding: 12px 4px;
	border: 1px solid transparent;
	cursor: pointer;
	transition: all 0.1s ease-out;
	position: relative;
	cursor: grab;

	&:active {
		cursor: grabbing;
	}
`;

const WrapperRecordControllerComponent: React.FC<IWrapperRecordController> = ({children}) => {
	const isShowController = selectIsShowController()
	//
	// const [x, setX] = useState('100px')
	// const [y, setY] = useState('100px')
	// const [isDown, setIsDown] = useState(false)
	//
	//
	// const update = useCallback(
	// 	(e) => {
	// 		if (isDown) {
	// 			setX((e.x - 40) + 'px')
	// 			setY((e.y - 40) + 'px')
	// 		}
	// 	},
	// 	[isDown],
	// );
	//
	//
	// const handelMouseDown = (e) => {
	// 	setIsDown(true)
	// 	window.addEventListener('mousemove', update)
	// }
	// const handelMouseUp = (e) => {
	// 	setIsDown(false)
	// 	window.removeEventListener('mousemove', update)
	//
	// }
	return (
		<ControllerWrapper style={{display: !isShowController ? 'none' : 'flex'}}>
			<ControllerButton
				// onMouseDown={handelMouseDown}
				// onMouseUp={handelMouseUp}
			><Icon
				icon={ICON_COLLECTION.reset}/></ControllerButton>
			{children}
		</ControllerWrapper>
	);
}


export const WrapperRecordController = React.memo(WrapperRecordControllerComponent)

