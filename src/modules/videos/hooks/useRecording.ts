import {useState} from 'react';
import {useStopWatch} from './useStopWatch'
import {useSocketStream} from './useSocketStream'

export type Status =
	| 'recording'
	| 'idle'
	| 'error'
	| 'stopped'
	| 'paused'
	| 'permission-requested';

export const useRecording = ({options, audio = true,}: {
	options?: MediaRecorderOptions;
	audio?: boolean;
}) => {
	const {
		socketConnect,
		socketStart,
		socketSave,
		socketReset
	} = useSocketStream()

	const {
		startTimer,
		stopTimer,
		resetTimer,
		time
	} = useStopWatch()
	const [chunks, setChunks] = useState<Blob[]>([]);
	const [error, setError] = useState<any>();
	const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>();
	const [status, setStatus] = useState<Status>('permission-requested');

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
			if (tracks) {
				setStatus('idle')
				startTimer()
			}
			const stream: MediaStream = new MediaStream(tracks);
			///  microphone setting
			if (!audio) {
				stream.getAudioTracks()[0].enabled = false
			}

			const mediaRecorderLocal = new MediaRecorder(stream, options);
			mediaRecorderLocal.start(250);
			mediaRecorderLocal.ondataavailable = (event) => {
				setChunks(prev => [...prev, event.data])
				////append
				socketStart(event.data)
			};

			setMediaRecorder(mediaRecorderLocal);

			return mediaRecorderLocal;
		} catch (e) {
			setError(e);
			setStatus('error');
			stopTimer()
		}
		return;
	};

	const stopRecording = () => {
		if (!mediaRecorder) throw Error('No media stream!');
		mediaRecorder?.stop();
		stopTimer()
		socketSave()
		setStatus('stopped');
		//TODO: read0
		mediaRecorder.stream.getTracks().map((track) => {
			track.stop();
		});
		setMediaRecorder(null);
	};

	const startRecording = async () => {
	try {
		await	socketConnect()
		const	recorder = await requestMediaStream();
		await recorder?.start();
		setStatus('recording');
		startTimer()
	} catch (e) {
		console.error(e)
	}
};

	const pauseRecording = () => {
		if (!mediaRecorder) throw Error('No media stream!');
		mediaRecorder?.pause();

		setStatus('paused');
		stopTimer()
	};

	const resumeRecording = () => {
		if (!mediaRecorder) throw Error('No media stream!');
		mediaRecorder?.resume();

		setStatus('recording');
		startTimer()
	};

	const resetRecording = () => {
		setError(null);
		setMediaRecorder(null);
		setStatus('idle');
		setChunks([])
		resetTimer()
		socketReset()
	};


	return {
		timeRecording: time,
		error,
		pauseRecording,
		resetRecording,
		resumeRecording,
		startRecording,
		status,
		chunks,
		stopRecording,
	};
};


