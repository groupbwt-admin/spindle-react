import React, {useCallback, useEffect, useState} from 'react';
import styled from "@emotion/styled/macro";

import {Icon} from "shared/components/icon/icon";
import {ICON_COLLECTION} from "shared/components/icon/icon-list";

interface ICameraWrapper {
	position: {
		top: number
		left: number
	}
}

interface IWrapperCamera {
	children: JSX.Element | JSX.Element[];
}

const WrapperCameraComp = styled.div<ICameraWrapper>`
	position: fixed;
	top: ${props => props.position.top + 'px'};
	left: ${props => props.position.left + 'px'};
	z-index: 100;
	height: 200px;
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;


	&:hover {
		cursor: grab;

		span {
			opacity: 1;
		}
	}

	&:active {
		cursor: grabbing;
	}
`
const StyledDragIcon = styled(Icon)`
	position: absolute;
	top: 86px;
	left: 83px;
	opacity: 0;
	z-index: 1010;
	transition: opacity 0.3s ease-out;
`
const body = document.querySelector('#root')
export const WrapperCamera: React.FC<IWrapperCamera> = ({children}) => {
	const [position, setPosition] = useState<{ top: number, left: number }>({top: 30, left: 30});
	const [isDown, setIsDown] = useState(false)


	const update = useCallback(
		(e) => {
			if (isDown && (e.buttons > 0)) {
				setPosition({top: e.y - 100, left: e.x - 100})
			}
		},
		[isDown],
	);

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

	const handelMouseDown = (e) => {
		setIsDown(true)
	}
	const handelMouseUp = (e) => {
		setIsDown(false)
	}
	return (
		<WrapperCameraComp position={position} onMouseDown={handelMouseDown} onMouseUp={handelMouseUp}>
			<StyledDragIcon
				icon={ICON_COLLECTION.drag_pan}/>
			{children}
		</WrapperCameraComp>
	);
};

