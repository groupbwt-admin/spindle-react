import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styled from "@emotion/styled";
import {selectIsShowController,} from "../../../app/store/record-socket/selects";
import {Icon} from "../../../shared/components/icon/icon";
import {ICON_COLLECTION} from "../../../shared/components/icon/icon-list";

interface IWrapperRecordController {
	children: JSX.Element | JSX.Element[];
}

interface IControllerWrapper {
	isShow: boolean,
	isHorizontal: boolean,
	isMouseUp: boolean
}

const ControllerWrapper = styled.div<IControllerWrapper>`
	position: fixed;
	top: 40%;
	left: 150px;
	display: ${props => props.isShow ? 'flex' : 'none'};
	flex-direction: ${props => props.isHorizontal ? 'row' : 'column'};
	padding: ${props => props.isHorizontal ? '14px 30px 14px 24px' : '24px 18px'};
	background: #000000;
	border-radius: 50px;
	width: ${props => props.isHorizontal ? '360px' : '70px'};
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
	const isShowController = selectIsShowController()

	const [x, setX] = useState('150px')
	const [y, setY] = useState((window.innerHeight / 3) + 'px')
	const [controllerPosition, setControllerPosition] = useState({x: 150, y: window.innerHeight / 3})
	const [isDown, setIsDown] = useState(false)
	const [isColumn, setIsColumn] = useState(true);

	function getFlag(e) {
		return e
	}

	const flag = useMemo(() => getFlag(isDown), [isDown]);
	const update = useCallback(
		(e) => {
			if (isDown && (e.buttons > 0)) {
				setX((e.x - 40) + 'px')
				setY((e.y - 45) + 'px')
				setControllerPosition({x: e.x - 40, y: e.y - 45})
			}
		},
		[flag],
	);

	useEffect(() => {
		window.addEventListener('mouseup', handelMouseUp)
		if (isDown) {
			window.addEventListener('mousemove', update)
			body?.addEventListener('mouseleave', handelMouseUp)
		} else {
			window.removeEventListener('mousemove', update)
			if (controllerPosition.y < 300) {
				setX((window.innerWidth / 2.5) + 'px')
				setY((30) + 'px')
				setIsColumn(false)
			} else if (controllerPosition.y > (window.innerHeight - 400)) {
				setX((window.innerWidth / 2.5) + 'px')
				setY((window.innerHeight - 100) + 'px')
				setIsColumn(false)
			} else if (controllerPosition.x > (window.innerWidth / 2)) {
				setX((window.innerWidth - 150) + 'px')
				setY((window.innerHeight / 3) + 'px')
				setIsColumn(true)
			} else {
				setX('150px')
				setY((window.innerHeight / 3) + 'px')
				setIsColumn(true)
			}
		}
		return () => {
			window.removeEventListener('mousemove', update)
			window.removeEventListener('mouseup', handelMouseUp)
			body?.removeEventListener('mouseleave', handelMouseUp)

		};
	}, [flag]);

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
			isShow={!isShowController}
			isHorizontal={!isColumn}
			isMouseUp={!isDown}
		>
			<ControllerButton
				onMouseDown={handelMouseDown}
				onMouseUp={handelMouseUp}
			><Icon
				icon={ICON_COLLECTION.reset}/></ControllerButton>
			{children}
		</ControllerWrapper>
	);
}


export const WrapperRecordController = React.memo(WrapperRecordControllerComponent)
