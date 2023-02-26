import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

import { useDragSelect } from '../context/drag-select-provider';
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
	// eslint-disable-next-line
	// @ts-ignore
	const { containerRef } = useDragSelect();

	useEffect(() => {
		isOpenCamera
			? setСonditionCamera(CONDITION_RESIZE.withCamera)
			: setСonditionCamera(CONDITION_RESIZE.withOutCamera);
		if (controllerRef.current && isOpenCamera) {
			controllerRef.current.offsetLeft + 700 >=
				containerRef.current.clientWidth &&
				setPosition((prevState) => {
					return { ...prevState, x: containerRef.current.clientWidth - 700 };
				});
			controllerRef.current.offsetTop + 500 >=
				containerRef.current.clientHeight &&
				setPosition((prevState) => {
					return {
						...prevState,
						y:
							containerRef.current.clientHeight -
							controllerRef.current!.clientHeight,
					};
				});
		}
	}, [isOpenCamera]);

	const handleMouseDown = (event: React.MouseEvent) => {
		const startX = event.pageX;
		const startY = event.pageY;
		const handleMouseMove = (event: MouseEvent) => {
			if (body) {
				body.style.overflowY = 'hidden';
			}
			const offsetX = event.pageX - startX;
			const offsetY = event.pageY - startY;
			const newPosition = {
				x: position.x + offsetX,
				y: position.y + offsetY,
			};
			if (
				containerRef.current &&
				controllerRef.current &&
				controllerRef.current.offsetLeft >= 0 &&
				controllerRef.current.offsetTop >= 0
			) {
				setPosition(newPosition);
			}
		};
		const handleMouseUp = () => {
			if (controllerRef.current) {
				controllerRef.current.offsetLeft <= 0 &&
					setPosition((prevState) => {
						return { ...prevState, x: 10 };
					});
				controllerRef.current.offsetTop <= 0 &&
					setPosition((prevState) => {
						return { ...prevState, y: 10 };
					});
				controllerRef.current.offsetLeft + conditionCamera.x >=
					containerRef.current.clientWidth &&
					setPosition((prevState) => {
						return {
							...prevState,
							x:
								containerRef.current.clientWidth -
								(controllerRef.current!.clientWidth + 20),
						};
					});
				controllerRef.current.offsetTop + conditionCamera.y >=
					containerRef.current.clientHeight &&
					setPosition((prevState) => {
						return {
							...prevState,
							y:
								containerRef.current.clientHeight -
								(controllerRef.current!.clientHeight + 20),
						};
					});
			}
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
			if (body) {
				body.style.overflowY = 'auto';
			}
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
