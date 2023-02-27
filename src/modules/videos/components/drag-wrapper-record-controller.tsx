import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

import { useEvent } from '../../../shared/hooks/use-event';
import { useDragContext } from '../context/drag-select-provider';
import { DragWrapperContext } from '../context/drag-wrapper-context';

interface IControllerWrapper {
	isMouseUp?: boolean;
	isTop?: boolean;
}

interface IWrapperRecordController {
	children: React.ReactNode;
}

const ControllerWrapper = styled.div<IControllerWrapper>`
	position: absolute;
	top: 40%;
	left: 150px;
	display: flex;
	flex-direction: row;
	width: auto;
	align-items: center;
	z-index: 100;
`;

const CONDITION_RESIZE = {
	withCamera: { x: 700, y: 230 },
	withOutCamera: { x: 400, y: 70 },
};
const INDENT = 20;
const CONTROLLER_WIDTH = 700;
const CONTROLLER_HEIGHT = 500;

const body = document.body;
const WrapperRecordControllerComponent: React.FC<IWrapperRecordController> = ({
	children,
}) => {
	const [position, setPosition] = useState({ x: window.innerWidth / 3, y: 50 });
	const [isOpenCamera, setIsOpenCamera] = useState(false);
	const [conditionCamera, setСonditionCamera] = useState(
		CONDITION_RESIZE.withOutCamera,
	);
	const controllerRef = useRef<HTMLDivElement>(null);
	const { containerRef } = useDragContext();

	const controllerOffsetLeft = controllerRef.current?.offsetLeft;
	const controllerOffsetTop = controllerRef.current?.offsetTop;
	const controllerHeight = controllerRef.current?.clientHeight;
	const controllerWidth = controllerRef.current?.clientWidth;

	const containerWidth = containerRef && containerRef.current?.clientWidth;
	const containerHeight = containerRef && containerRef.current?.clientHeight;

	const baseNegativeCondition =
		!containerWidth ||
		!containerHeight ||
		!controllerOffsetLeft ||
		!controllerOffsetTop ||
		!controllerHeight ||
		!controllerWidth;

	useEffect(() => {
		if (baseNegativeCondition) return;
		isOpenCamera
			? setСonditionCamera(CONDITION_RESIZE.withCamera)
			: setСonditionCamera(CONDITION_RESIZE.withOutCamera);
		if (isOpenCamera) {
			controllerOffsetLeft + CONTROLLER_WIDTH >= containerWidth &&
				setPosition((prevState) => {
					return {
						...prevState,
						x: containerWidth - CONTROLLER_WIDTH,
					};
				});
			controllerOffsetTop + CONTROLLER_HEIGHT >= containerHeight &&
				setPosition((prevState) => {
					return {
						...prevState,
						y: containerHeight - CONDITION_RESIZE.withCamera.y,
					};
				});
		}
	}, [isOpenCamera]);

	const examinationPosition = useEvent(() => {
		if (baseNegativeCondition) return;
		controllerOffsetLeft <= INDENT &&
			setPosition((prevState) => {
				return { ...prevState, x: INDENT };
			});
		controllerOffsetTop <= INDENT &&
			setPosition((prevState) => {
				return { ...prevState, y: INDENT };
			});
		controllerOffsetLeft + conditionCamera.x >= containerWidth &&
			setPosition((prevState) => {
				return {
					...prevState,
					x: containerWidth - (controllerWidth + INDENT),
				};
			});
		controllerOffsetTop + conditionCamera.y >= containerHeight &&
			setPosition((prevState) => {
				return {
					...prevState,
					y: containerHeight - (controllerHeight + INDENT),
				};
			});
	});

	const handleMouseDown = (event: React.MouseEvent) => {
		const startX = event.pageX;
		const startY = event.pageY;
		const handleMouseMove = (event: MouseEvent) => {
			if (body) {
				body.classList.add('scrollYLocked');
			}
			const offsetX = event.pageX - startX;
			const offsetY = event.pageY - startY;
			const newPosition = {
				x: position.x + offsetX,
				y: position.y + offsetY,
			};
			if (containerRef && containerRef.current && controllerRef.current) {
				setPosition(newPosition);
			}
		};
		const handleMouseUp = () => {
			examinationPosition();
			if (body) {
				body.classList.remove('scrollYLocked');
			}
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};

	return (
		<ControllerWrapper
			style={{
				top: position.y,
				left: position.x,
			}}
			ref={controllerRef}
		>
			<DragWrapperContext.Provider
				value={{ handelMouseDown: handleMouseDown, setIsOpenCamera }}
			>
				{children}
			</DragWrapperContext.Provider>
		</ControllerWrapper>
	);
};

export const DragWrapperRecordController = React.memo(
	WrapperRecordControllerComponent,
);
