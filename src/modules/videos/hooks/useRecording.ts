import {useState} from 'react';
import {useStopWatch} from './useStopWatch'
import {useSocketStream} from './useSocketStream'


const RECORDING_STATUS = {
	recording: 'recording',
	idle: 'idle',
	error: 'error',
	stopped: 'stopped',
	paused: 'paused',
	permissionRequested: 'permission-requested'
}
export const useRecording = ({options, audio = true,}: {
	options?: MediaRecorderOptions;
	audio?: boolean;
}) => {
	const {
		socketEmit,
	} = useSocketStream()

	const {
		startTimer,
		stopTimer,
		resetTimer,
		time
	} = useStopWatch()
	const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>();
	const [status, setStatus] = useState<string>(RECORDING_STATUS.permissionRequested);

	const requestMediaStream = async () => {
		try {
			const mediaDevices = navigator.mediaDevices as any;
			const displayMedia = await mediaDevices.getDisplayMedia();

			const userMedia = await mediaDevices.getUserMedia({
				audio: {
					echoCancellation: true,
					noiseSuppression: true,
					sampleRate: 44100,
				},
			});
			const tracks = [...displayMedia.getTracks(), ...userMedia.getTracks()];
			if (tracks.length) {
				setStatus(RECORDING_STATUS.idle)
				startTimer()
			}
			const stream: MediaStream = new MediaStream(tracks);
			if (!audio) {
				stream.getAudioTracks()[0].enabled = false
			}
			const mediaRecorderLocal = new MediaRecorder(stream);
			mediaRecorderLocal.start(250);

			mediaRecorderLocal.ondataavailable = (event) => {
				console.log(event)
				socketEmit.start(event.data)
			};
			setMediaRecorder(mediaRecorderLocal);
			return mediaRecorderLocal;
		} catch (e) {
			console.log(e)
			setStatus(RECORDING_STATUS.error);
			stopTimer()
			resetTimer()
		}
	};

	const stopRecording = async () => {
		try {
			await mediaRecorder?.stop();
			stopTimer()
			setStatus(RECORDING_STATUS.stopped);
			mediaRecorder?.stream.getTracks().map((track) => {
				track.stop();
			});
			setMediaRecorder(null);
			await socketEmit.save()
		} catch (e) {
			console.log('Stop Recording: ' + e)
			setStatus(RECORDING_STATUS.error);
		}
	};

	const startRecording = async () => {
		try {
			await requestMediaStream();
			await socketEmit.generateVideoPath()
			setStatus(RECORDING_STATUS.recording);
			startTimer()
		} catch (e) {
			console.log('Socket Connect:' + e)
			setStatus(RECORDING_STATUS.error);
		}
	};

	const pauseRecording = () => {
		mediaRecorder?.pause();
		setStatus(RECORDING_STATUS.paused);
		stopTimer()
	};

	const resumeRecording = () => {
		mediaRecorder?.resume();
		setStatus('recording');
		startTimer()
	};

	const resetRecording = async () => {
		setStatus(RECORDING_STATUS.idle);
		resetTimer()
		mediaRecorder?.stop();
		mediaRecorder?.stream.getTracks().map((track) => {
			track.stop();
		});
		socketEmit.reset()
		setMediaRecorder(null);
	};


	return {
		timeRecording: time,
		pauseRecording,
		resetRecording,
		resumeRecording,
		startRecording,
		status,
		stopRecording,
	};
};


