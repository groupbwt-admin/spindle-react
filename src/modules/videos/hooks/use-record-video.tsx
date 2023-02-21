import React, {useEffect} from "react";

import {selectIsRecording, selectStatus} from "../../../app/store/record-socket/selects";
import {socketState} from "../../../app/store/record-socket/state";
import {RECORDING_STATUS} from "../../../shared/constants/record-statuses";
import {Camera} from "../components/camera";
import {Countdown} from "../components/countdown";
import {PipVideoCamera} from "../components/pip-video-camera";
import {RecordControlPanel} from "../components/record-controll-panel";
import {StopWatch} from "../components/stop-watch";
import {WrapperRecordController} from "../components/wrapper-record-controller";

import {useCameraControl} from "./use-camera-controll";
import {useRecording} from "./use-recording";

export const useRecordVideo = () => {
	const status = selectStatus()
	const isRecording = selectIsRecording()
	const {
		models: {
			isMicrophoneOn,
			counterBeforeStart
		},
		command: {
			startRecording,
			onVideoSaved,
			resumeRecording,
			pauseRecording,
			resetRecording,
			toggleMicrophone,
			onCancelPreview,
		}
	} = useRecording();

	const {
		models: {videoRef, isOpenCamera},
		command: {toggleCamera, handelTogglePiP}
	} = useCameraControl()

	useEffect(() => {
		window.addEventListener('offline', (e) => {
			socketState.setIsOnline(false)
		});
		window.addEventListener('online', (e) => {
			socketState.setIsOnline(true)
		});

	}, []);


	const recordControlPanel = isRecording && <WrapperRecordController>
		<RecordControlPanel onVideoSaved={onVideoSaved}
												resumeRecording={resumeRecording}
												pauseRecording={pauseRecording}
												resetRecording={resetRecording}
												toggleMicrophone={toggleMicrophone}
												toggleCamera={toggleCamera}
												isShowCamera={isOpenCamera}
												isMuted={isMicrophoneOn}
												isPaused={status === RECORDING_STATUS.paused}/>
		<StopWatch/>
	</WrapperRecordController>
	const countDownView = (status === RECORDING_STATUS.idle && counterBeforeStart > 0) &&
		<Countdown onCancel={onCancelPreview} count={counterBeforeStart}/>

	const videCamera = isRecording && <Camera videoRef={videoRef}
																						isShowCamera={isOpenCamera}/>
	const recordWidget = <>
		{videCamera}
		{recordControlPanel}
		{countDownView}
	</>

	return {
		models: {
			recordWidget
		},
		commands: {
			startRecording,
		}
	}
}
