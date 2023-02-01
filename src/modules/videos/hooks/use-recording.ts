import {useEffect, useMemo, useState} from 'react';
import {useStopWatch} from './use-stop-watch'
import {useNavigate} from "react-router-dom";
import {VIDEO_ROUTES} from "shared/config/routes";
import {RECORDING_STATUS, SOCKET_ACTIONS} from "shared/constants/record-statuses";
import {socketState} from 'app/store/record-socket/state';
import {SocketService} from "../../../shared/services/base-socket-service";

export const useRecording = () => {
	const {
		startTimer,
		pauseTimer,
		resetTimer,
		time
	} = useStopWatch()
	const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>();
	const [status, setStatus] = useState<string>(RECORDING_STATUS.permission_requested);
	const [isMicrophoneOn, setIsMicrophoneOn] = useState(true)
	const navigate = useNavigate()

	useEffect(() => {
		socketState.onConnectListener()
		socketState.onDisconnectedListener(() => stopRecording())
		socketState.connect()
		return () => {
			socketState.unfollowListener(SOCKET_ACTIONS.disconnect)
			socketState.unfollowListener(SOCKET_ACTIONS.connect)
			if (SocketService.socket) {
				SocketService.socket.close()
			}
		};
	}, []);
	const toggleMicrophone = (isMuted) => {
		setIsMicrophoneOn(isMuted)
		if (mediaRecorder) {
			mediaRecorder.stream.getAudioTracks()[0].enabled = isMuted
		}
	}

	const onNavigateToVideoPage = (video) => {
		if (video) {
			console.log(video)
			navigate(VIDEO_ROUTES.VIDEO.generate(video.id))
		}
	}
	const stopRecording = async () => {
		try {
			console.log('stopp')
			await mediaRecorder?.stop();
			pauseTimer()
			setStatus(RECORDING_STATUS.stopped);
			mediaRecorder?.stream.getTracks().map((track) => {
				track.stop();
			});
			setMediaRecorder(null);
			await socketState.save(SOCKET_ACTIONS.save, onNavigateToVideoPage)
		} catch (e) {
			console.log('Stop Recording: ' + e)
			setStatus(RECORDING_STATUS.error);
		}
	};
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

			stream.getVideoTracks()[0].onended = (e) => {
				stream.getTracks().map((track) => {
					track.stop();
				});
				stopRecording();
			}
			stream.getAudioTracks()[0].enabled = isMicrophoneOn

			const mediaRecorderLocal = new MediaRecorder(stream);
			mediaRecorderLocal.start(250);

			mediaRecorderLocal.ondataavailable = (event) => {
				// mediaRecorderLocal.stream.getAudioTracks()[0].enabled = false

				socketState.emit({type: SOCKET_ACTIONS.start, payload: {chunk: event.data}})
			};
			setMediaRecorder(mediaRecorderLocal);
			return mediaRecorderLocal;
		} catch (e) {
			console.log(e)
			setStatus(RECORDING_STATUS.error);
			pauseTimer()
			resetTimer()

		}
	};


	const startRecording = async () => {
		try {
			await requestMediaStream();
			await socketState.emit({type: SOCKET_ACTIONS.generate_video_path})
			setStatus(RECORDING_STATUS.recording);
			if (mediaRecorder) {
				await startTimer()
			}
		} catch (e) {
			console.log('Socket Connect:' + e)
			setStatus(RECORDING_STATUS.error);
		}
	};

	const pauseRecording = () => {
		mediaRecorder?.pause();
		setStatus(RECORDING_STATUS.paused);
		pauseTimer()
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
		socketState.emit({type: SOCKET_ACTIONS.reset})
		setMediaRecorder(null);
	};


	return {
		models: {timeRecording: time, recordStatus: status, isMicrophoneOn},
		command: {
			toggleMicrophone,
			pauseRecording,
			resetRecording,
			resumeRecording,
			startRecording, stopRecording
		},
	}
};


