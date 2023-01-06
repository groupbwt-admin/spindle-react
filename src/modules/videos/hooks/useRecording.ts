import {useState} from 'react';
import {useStopWatch} from './useStopWatch'

export type Status =
	| 'recording'
	| 'idle'
	| 'error'
	| 'stopped'
	| 'paused'
	| 'permission-requested';

export const useRecording = ({options, audio = false,}: {
	options?: MediaRecorderOptions;
	audio?: boolean;
}) => {

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
	const [streams, setStreams] = useState<{
		audio?: MediaStreamTrack | null;
		screen?: MediaStreamTrack | null;
	}>({audio: null, screen: null});

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
			if (!audio) {
				stream.getAudioTracks()[0].enabled = false
			}
			const mediaRecorder = new MediaRecorder(stream, options);
			mediaRecorder.start(1000);

			mediaRecorder.ondataavailable = (event) => {
				setChunks(prev => [...prev, event.data])


			};

			setMediaRecorder(mediaRecorder);
			setStreams({
				audio:
					userMedia?.getTracks().find((track) => track.kind === 'audio') ||
					null,
				screen:
					displayMedia
						.getTracks()
						.find((track: MediaStreamTrack) => track.kind === 'video') || null,
			});

			return mediaRecorder;
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

		setStatus('stopped');
		stopTimer()

		mediaRecorder.stream.getTracks().map((track) => {
			track.stop();
		});
		setMediaRecorder(null);
	};

	const startRecording = async () => {
		let recorder = mediaRecorder;
		if (!mediaRecorder) {
			recorder = await requestMediaStream();
		}
		(recorder as MediaRecorder).start();
		setStatus('recording');
		startTimer()

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
		streams,
	};
};


