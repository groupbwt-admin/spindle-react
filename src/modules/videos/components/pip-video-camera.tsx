import React, {useRef, useState} from 'react';
import styled from "@emotion/styled/macro";

import {useRecordCamera} from "../hooks/use-record-camera";


const VideoCamera = styled.video`
	width: 0px;
	height: 0px;
	overflow: hidden;

`
export const PipVideoCamera = () => {
	const videoRef = useRef<any>(null);
	const [isOpenPip, setIsOpenPip] = useState(false);
	const {mediaStream, disabledVideoStream, enableVideoStream} = useRecordCamera()


	if (mediaStream && videoRef.current && !videoRef.current?.srcObject) {
		videoRef.current.srcObject = mediaStream;
	}
	const handelTogglePiP = async () => {
		try {
			if (document.pictureInPictureElement) {
				await document.exitPictureInPicture();
			} else if (document.pictureInPictureEnabled) {
				await videoRef.current.requestPictureInPicture()
			}
		} catch (e) {
			console.log(e)
		}
	}
	const wait = () => new Promise<null>((resolve) => {
		setTimeout(() => {
			resolve(null)
		}, 500);
	});
	const openPip = async () => {
		await enableVideoStream()
		await wait()
		if (document.pictureInPictureEnabled) {
			await videoRef.current.requestPictureInPicture()
		}
		setIsOpenPip(true)

	}
	const closePip = async () => {
		if (document.pictureInPictureElement) {
			await document.exitPictureInPicture();
		}
		await wait()
		await disabledVideoStream()
		await setIsOpenPip(false)
	}


	const video = <VideoCamera autoPlay
														 playsInline
														 muted
														 ref={videoRef}/>

	return {
		models: {
			isOpenPip,
			video,
		},
		commands: {
			openPip,
			closePip,
		}
	}
}


