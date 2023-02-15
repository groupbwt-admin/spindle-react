import {useEffect, useRef} from "react";

import {selectIsRecording, selectStatus} from "../../../app/store/record-socket/selects";
import {RECORDING_STATUS} from "../../../shared/constants/record-statuses";
import {Countdown} from "../components/countdown";
import {RecordControlPanel} from "../components/record-controll-panel";
import {WrapperRecordController} from "../components/wrapper-record-controller";

import {useRecording} from "./use-recording";

export const useControlVideo = () => {
	const status = selectStatus()
	const isRecording = selectIsRecording()
	const {
		models: {
			isMicrophoneOn,
			streamChunks,
			counterBeforeStart
		},
		command: {
			startRecording,
			stopRecording,
			resumeRecording,
			pauseRecording,
			resetRecording,
			toggleMicrophone,
			prevCancelStream,
		}
	} = useRecording();
	const videoR: any = useRef(null);
	useEffect(() => {
		const blob = new Blob(streamChunks, {'type': 'video/mp4'});
		videoR.current.src = URL.createObjectURL(blob);
		videoR.current.load();
		videoR.current.onloadeddata = function () {
			videoR.current.play();
		}

	}, [streamChunks]);


	const recordControlPanel = isRecording && <WrapperRecordController>

		<RecordControlPanel stopRecording={stopRecording}
												resumeRecording={resumeRecording}
												pauseRecording={pauseRecording}
												resetRecording={resetRecording}
												toggleMicrophone={toggleMicrophone}
												isMuted={isMicrophoneOn}
												isPaused={status == RECORDING_STATUS.paused}/>
	</WrapperRecordController>
	const countDownView = (status === RECORDING_STATUS.idle) &&
		<Countdown onCancel={prevCancelStream} count={counterBeforeStart}/>

	const videoC = <video src="" ref={videoR} autoPlay muted playsInline style={{position: 'fixed', top: 0, right: 0}}/>
	const recordWidget = <>
		{videoC}
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
