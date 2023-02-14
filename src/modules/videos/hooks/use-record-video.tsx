import {Countdown} from "../components/countdown";
import {RecordControlPanel} from "../components/record-controll-panel";
import {useRecording} from "./use-recording";
import {RECORDING_STATUS} from "../../../shared/constants/record-statuses";
import {selectStatus} from "../../../app/store/record-socket/selects";
import {WrapperRecordController} from "../components/wrapper-record-controller";

export const useControlVideo = () => {
	const status = selectStatus()
	const {
		models: {
			isMicrophoneOn,
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


	const recordControlPanel =
		<WrapperRecordController>
			<RecordControlPanel stopRecording={stopRecording}
													resumeRecording={resumeRecording}
													pauseRecording={pauseRecording}
													resetRecording={resetRecording}
													toggleMicrophone={toggleMicrophone}
													isMuted={isMicrophoneOn}
													isPaused={status == RECORDING_STATUS.paused}/>
		</WrapperRecordController>
	const countDownView = (status === RECORDING_STATUS.idle) ?
		<Countdown onCancel={prevCancelStream} count={counterBeforeStart}/> : null

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
