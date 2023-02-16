import {selectIsRecording, selectStatus} from "../../../app/store/record-socket/selects";
import {RECORDING_STATUS} from "../../../shared/constants/record-statuses";
import {Countdown} from "../components/countdown";
import {RecordControlPanel} from "../components/record-controll-panel";
import {WrapperRecordController} from "../components/wrapper-record-controller";

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


	const recordControlPanel = isRecording && <WrapperRecordController>
		<RecordControlPanel onVideoSaved={onVideoSaved}
												resumeRecording={resumeRecording}
												pauseRecording={pauseRecording}
												resetRecording={resetRecording}
												toggleMicrophone={toggleMicrophone}
												isMuted={isMicrophoneOn}
												isPaused={status === RECORDING_STATUS.paused}/>
	</WrapperRecordController>
	const countDownView = (status === RECORDING_STATUS.idle) &&
		<Countdown onCancel={onCancelPreview} count={counterBeforeStart}/>

	const recordWidget = <>
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
