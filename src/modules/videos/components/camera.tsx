import {useRef} from 'react';
import styled from '@emotion/styled/macro';

import {useRecordCamera} from "../hooks/use-record-camera";

const VideoCamera = styled.video`
	position: fixed;
	top: 0;
	left: 0;
	//border-radius: 50%;
	//border-radius: 50%;
	height: 200px;
	width: 200px;
	object-fit: cover;
	:not([controls]):picture-in-picture {
		box-shadow: 0 0 0 5px red;
		border-radius: 50%;
	}
`

export const Camera = () => {
	const {mediaStream} = useRecordCamera()
	const videoRef = useRef<any>(null);
	if (mediaStream && videoRef.current && !videoRef.current?.srcObject) {
		videoRef.current.srcObject = mediaStream;
	}
	if (!mediaStream) {
		return null;
	}
	const onPip = () => {
		if (document.pictureInPictureElement) {
			document.exitPictureInPicture();
		} else if (document.pictureInPictureEnabled) {
			videoRef.current.requestPictureInPicture().then((pictureInPictureWindow) => {
				pictureInPictureWindow.onresize = printPipWindowDimensions;
			});
		}
	}

	function printPipWindowDimensions(evt) {
		const pipWindow = evt.target;
		console.log(`The floating window dimensions are: ${pipWindow.width}x${pipWindow.height}px`);
		// will print:
		// The floating window dimensions are: 640x360px
	}

	return (
		<>
			<VideoCamera
				ref={videoRef}
				autoPlay
				playsInline
				muted
			/>
			<button onClick={onPip}>onPip</button>
		</>

	);
};

