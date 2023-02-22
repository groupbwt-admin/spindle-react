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


	return {
		models: {videoRef, isOpenCamera},
		command: {toggleCamera}
	}
}

