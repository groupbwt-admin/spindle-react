import {useEffect, useMemo, useRef, useState} from 'react';
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
	const [counterBeforeStart, setCounterBeforeStart] = useState(3);

	const isCancel = useRef(false);

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
	const toggleMicrophone = () => {
		setIsMicrophoneOn((prevValue) => {
			const newValue = !prevValue;
			if (mediaRecorder) {
				mediaRecorder.stream.getAudioTracks()[0].enabled = newValue
			}
			return newValue
		})
	}
	const wait = () => new Promise<void>((resolve) => {
		const myInterval = setInterval(() => setCounterBeforeStart(prev => prev - 1), 1000)
		setTimeout(() => {
			resolve(clearInterval(myInterval));
		}, 3000);
	});


	const onNavigateToVideoPage = (video) => {
		if (video) {
			navigate(VIDEO_ROUTES.VIDEO.generate(video.id))
		}
	}
	const stopRecording = async () => {
		try {
			await mediaRecorder?.stop();
		} catch (e) {
			console.log('Stop Recording: ' + e)
			setStatus(RECORDING_STATUS.error);
		}
	};
	const requestMediaStream = async () => {
		try {
			const mediaDevices = navigator.mediaDevices;
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

			mediaRecorderLocal.onstart = () => {
				socketState.emit({type: SOCKET_ACTIONS.generate_video_path})
				setStatus(RECORDING_STATUS.recording);
				startTimer()
			}
			mediaRecorderLocal.onstop = () => {
				resetTimer()
				setStatus(RECORDING_STATUS.stopped);
				mediaRecorder?.stream.getTracks().map((track) => {
					track.stop();
				});
				setMediaRecorder(null);
				socketState.save(SOCKET_ACTIONS.save, onNavigateToVideoPage)
			}
			mediaRecorderLocal.ondataavailable = (event) => {
				socketState.emit({type: SOCKET_ACTIONS.start, payload: {chunk: event.data}})
			};
			return wait().then(() => {
				if (!isCancel.current) {
					mediaRecorderLocal.start(250);
					setMediaRecorder(mediaRecorderLocal);
					return mediaRecorderLocal;
				}
			})
		} catch (e) {
			console.log(e)
			setStatus(RECORDING_STATUS.error);
			pauseTimer()
			resetTimer()
		}
	};


	const startRecording = async () => {
		try {
			isCancel.current = false
			setCounterBeforeStart(3)
			await requestMediaStream();
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
		setStatus(RECORDING_STATUS.recording);
		mediaRecorder?.resume();
		startTimer()
	};

	const resetRecording = async () => {
		resetTimer()
		mediaRecorder?.stop();
		mediaRecorder?.stream.getTracks().map((track) => {
			track.stop();
		});
		socketState.emit({type: SOCKET_ACTIONS.reset})
		setStatus(RECORDING_STATUS.permission_requested);
		setMediaRecorder(null);
	};

	const prevCancelStream = () => {
		isCancel.current = true
		setStatus(RECORDING_STATUS.permission_requested);
	}

	return {
		models: {timeRecording: time, recordStatus: status, isMicrophoneOn, counterBeforeStart, isCancel},
		command: {
			prevCancelStream,
			toggleMicrophone,
			pauseRecording,
			resetRecording,
			resumeRecording,
			startRecording, stopRecording
		},
	}
};


