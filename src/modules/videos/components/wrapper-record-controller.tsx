import React, {useCallback, useEffect, useState} from 'react';
import styled from "@emotion/styled";

import {Icon} from "../../../shared/components/icon/icon";
import {ICON_COLLECTION} from "../../../shared/components/icon/icon-list";

interface IWrapperRecordController {
	children: JSX.Element | JSX.Element[];
}

interface IControllerWrapper {
	isHorizontal: boolean,
	isMouseUp: boolean
}

const ControllerWrapper = styled.div<IControllerWrapper>`
	position: fixed;
	top: 40%;
	left: 150px;
	display: flex;
	flex-direction: ${props => props.isHorizontal ? 'row' : 'column'};
	padding: ${props => props.isHorizontal ? '14px 30px 14px 24px' : '24px 18px'};
	background: #000000;
	border-radius: 50px;
	width: ${props => props.isHorizontal ? 'auto' : '70px'};
	align-items: center;
	${props => props.isMouseUp && 'transition: top 0.2s ease;	transition: left 0.2s ease;'}

	z-index: 100;

	button {
		padding: ${props => props.isHorizontal && '4px 14px'};
	}

	p {
		border: ${props => props.isHorizontal && 'none'};
	}
`;
const ControllerButton = styled.button`
	background: transparent;
	padding: 12px 4px;
	border: 1px solid transparent;
	cursor: pointer;
	transition: all 0.2s ease-out;
	position: relative;
	cursor: grab;

	&:active {
		cursor: grabbing;
	}
`;


const body = document.querySelector('#root')
const WrapperRecordControllerComponent: React.FC<IWrapperRecordController> = ({children}) => {
	const windowHeight = window.innerHeight
	const windowWidth = window.innerWidth
	const [x, setX] = useState('150px')
	const [y, setY] = useState((windowHeight / 3) + 'px')
	const [controllerPosition, setControllerPosition] = useState({x: 150, y: windowHeight / 3})
	const [isDown, setIsDown] = useState(false)
	const [isColumn, setIsColumn] = useState(true);

	const update = useCallback(
		(e) => {
			if (isDown && (e.buttons > 0)) {
				setX((e.x - 40) + 'px')
				setY((e.y - 45) + 'px')
				setControllerPosition({x: e.x - 40, y: e.y - 45})
			}
		},
		[isDown],
	);

	const findPosition = () => {
		if (controllerPosition.y < 300) {
			setX((windowWidth / 2.5) + 'px')
			setY((30) + 'px')
			setIsColumn(false)
		} else if (controllerPosition.y > (windowHeight - 400)) {
			setX((windowWidth / 2.5) + 'px')
			setY((windowHeight - 100) + 'px')
			setIsColumn(false)
		} else if (controllerPosition.x > (windowWidth / 2)) {
			setX((windowWidth - 150) + 'px')
			setY((windowHeight / 3) + 'px')
			setIsColumn(true)
		} else {
			setX('150px')
			setY((windowHeight / 3) + 'px')
			setIsColumn(true)
		}
	}

	useEffect(() => {
		window.addEventListener('mouseup', handelMouseUp)
		if (isDown) {
			window.addEventListener('mousemove', update)
			body?.addEventListener('mouseleave', handelMouseUp)
		} else {
			window.removeEventListener('mousemove', update)
		}
		return () => {
			window.removeEventListener('mousemove', update)
			window.removeEventListener('mouseup', handelMouseUp)
			body?.removeEventListener('mouseleave', handelMouseUp)
		};
	}, [isDown]);

	useEffect(() => {
		if (!isDown) {
			findPosition()
		}
	}, [isDown]);

	const handelMouseDown = (e) => {
		setIsDown(true)
	}
	const handelMouseUp = (e) => {
		setIsDown(false)
	}
	return (
		<ControllerWrapper
			style={{
				left: x,
				top: y,
			}}
			isHorizontal={!isColumn}
			isMouseUp={!isDown}
		>
			<ControllerButton
				onMouseDown={handelMouseDown}
				onMouseUp={handelMouseUp}
			><Icon
				icon={ICON_COLLECTION.drag_indicator}/></ControllerButton>
			{children}
		</ControllerWrapper>
	);
}


export const WrapperRecordController = React.memo(WrapperRecordControllerComponent)
