import {useEffect, useRef, useState} from 'react';

import {selectIsRecording} from "app/store/record-socket/selects";

import {useRecordCamera} from "./use-record-camera";


export const useCameraControl = () => {
	const [isOpenCamera, setIsOpenCamera] = useState(false);
	const isRecording = selectIsRecording()
	const {mediaStream, disabledVideoStream, enableVideoStream} = useRecordCamera()
	const videoRef = useRef<any>(null);
	if (mediaStream && videoRef.current && !videoRef.current?.srcObject) {
		videoRef.current.srcObject = mediaStream;
	}
	useEffect(() => {
		isOpenCamera ? enableVideoStream() : disabledVideoStream()
	}, [isOpenCamera]);
	useEffect(() => {
		if (!isRecording) {
			setIsOpenCamera(false)
			disabledVideoStream()
		}
	}, [isRecording]);

	const toggleCamera = () => {
		setIsOpenCamera(prevState => !prevState)
	}
	const handelTogglePiP = () => {
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
	}


	return {
		models: {videoRef, isOpenCamera},
		command: {toggleCamera, handelTogglePiP}
	}
}

