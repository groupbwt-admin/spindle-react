import React, {useCallback, useEffect, useState} from 'react';

const body = document.querySelector('#root')
export const useDragController = () => {
	const windowHeight = window.innerHeight
	const windowWidth = window.innerWidth
	const [x, setX] = useState((windowWidth / 2.5) + 'px')
	const [y, setY] = useState((30) + 'px')
	const [controllerPosition, setControllerPosition] = useState({x: (windowWidth / 2.5), y: 30})
	const [isDown, setIsDown] = useState(false)
	const [isTop, setIsTop] = useState(true)


	const update = useCallback(
		(e) => {
			if (isDown && (e.buttons > 0)) {
				setX((e.x - 50) + 'px')
				setY((e.y - 35) + 'px')
				setControllerPosition({x: e.x - 40, y: e.y - 45})
			}
		},
		[isDown],
	);

	const findPosition = () => {
		if (controllerPosition.y < (windowHeight / 2)) {
			setX((windowWidth / 2.5) + 'px')
			setY((30) + 'px')
			setIsTop(true)
		} else {
			setX((windowWidth / 2.5) + 'px')
			setY((windowHeight - 100) + 'px')
			setIsTop(false)
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

	const handelMouseDown = () => {
		setIsDown(true)
	}
	const handelMouseUp = () => {
		setIsDown(false)
	}
	return{
		models: {top: y, left: x, isTop, isDown},
		command: {handelMouseDown, handelMouseUp}
	}
};

