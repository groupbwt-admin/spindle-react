import React from 'react';
import styled from "@emotion/styled";

import {DragWrapperContext} from "../context/drag-wrapper-context";
import {useDragController} from "../hooks/use-drag-controller";


interface IControllerWrapper {
	isMouseUp: boolean
	isTop: boolean
}

const ControllerWrapper = styled.div<IControllerWrapper>`
	position: fixed;
	top: 40%;
	left: 150px;
	display: flex;
	flex-direction: row;
	width: auto;
	align-items: center;
	${props => props.isMouseUp && 'transition: top 0.2s ease;	transition: left 0.2s ease;'}
	z-index: 100;

	video {
		position: absolute;
		bottom: ${props => props.isTop ? '-140px' : '0'};
		left: -250px
	}
`;


interface IWrapperRecordController {
	children: React.ReactNode;

}

const WrapperRecordControllerComponent: React.FC<IWrapperRecordController> = (
	{children,}) => {
	const {
		models: {top, left, isTop, isDown},
		command: {handelMouseDown, handelMouseUp}
	} = useDragController()

	return (
		<ControllerWrapper
			style={{
				left: left,
				top: top,
			}}
			isMouseUp={!isDown}
			isTop={isTop}
		>
			<DragWrapperContext.Provider value={{handelMouseDown, handelMouseUp}}>
				{children}
			</DragWrapperContext.Provider>
		</ControllerWrapper>
	);
}


export const DragWrapperRecordController = React.memo(WrapperRecordControllerComponent)
