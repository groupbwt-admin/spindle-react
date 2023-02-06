import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {VIDEO_ROUTES} from "shared/config/routes";
import {RECORDING_STATUS, SOCKET_ACTIONS} from "shared/constants/record-statuses";
import {socketState} from 'app/store/record-socket/state';
import {SocketService} from "../../../shared/services/base-socket-service";
import {selectStatus} from "../../../app/store/record-socket/selects";
import {EventBus, RECORDING_EVENTS} from "../../../shared/utils/event-bus";

export const useRecording = () => {
	const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>();
	const [isMicrophoneOn, setIsMicrophoneOn] = useState(false)
	const status = selectStatus()
	const navigate = useNavigate()
	const isCancel = useRef(false);

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
	useEffect(() => {
		EventBus.on(RECORDING_EVENTS.prev_stop, () => prevCancelStream());
		return () => {
			EventBus.off(RECORDING_EVENTS.prev_stop, () => prevCancelStream());
		};
	}, [status]);


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
				socketState.setStatus(RECORDING_STATUS.idle)
			}

			const stream: MediaStream = new MediaStream(tracks);
			stream.getVideoTracks()[0].onended = (e) => {
				stream.getTracks().map((track) => {
					track.stop();
				});
				isCancel ? prevCancelStream() : stopRecording();
			}
			stream.getAudioTracks()[0].enabled = isMicrophoneOn
			const mediaRecorderLocal = new MediaRecorder(stream);

			mediaRecorderLocal.onstop = () => {
				// console.log('stop')
				// socketState.setStatus(RECORDING_STATUS.stopped);
				// socketState.save(SOCKET_ACTIONS.save, onNavigateToVideoPage)
				// setMediaRecorder(null);

			}

			mediaRecorderLocal.onstart = () => {
				socketState.emit({type: SOCKET_ACTIONS.generate_video_path})
			}

			mediaRecorderLocal.ondataavailable = (event) => {
				socketState.emit({type: SOCKET_ACTIONS.start, payload: {chunk: event.data}})
				console.log(event)
			};


			return wait().then(async () => {
				if (!isCancel.current) {
					mediaRecorderLocal.start(250);
					console.log(mediaRecorderLocal)
					await setMediaRecorder(mediaRecorderLocal);
					socketState.setStatus(RECORDING_STATUS.recording);

					return mediaRecorderLocal;
				}
			})
		} catch (e) {
			console.log(e)
			socketState.setStatus(RECORDING_STATUS.error);
		}
	};


	const startRecording = useCallback(
		async () => {
			try {
				isCancel.current = false

				socketState.setCounterBeforeStart(3)
				await requestMediaStream()
			} catch (e) {
				console.log('Socket Connect:' + e)
				socketState.setStatus(RECORDING_STATUS.error);
			}
		},
		[],
	);


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
		const myInterval = setInterval(() => socketState.setCounterBeforeStart(socketState.counterBeforeStart - 1), 1000)
		setTimeout(() => {
			resolve(clearInterval(myInterval));
		}, 3000);
	});

	function prevCancelStream() {
		isCancel.current = true
		socketState.setStatus(RECORDING_STATUS.permission_requested);
	}


	const onNavigateToVideoPage = (video) => {
		console.log('awd')
		if (video) {
			navigate(VIDEO_ROUTES.VIDEO.generate(video.id))
		}
	}
	const stopRecording = async () => {
		try {
			mediaRecorder?.stop();
			mediaRecorder?.stream.getTracks().map((track) => {
				track.stop();
			});
			console.log('stop')
			socketState.setStatus(RECORDING_STATUS.stopped);
			socketState.save(SOCKET_ACTIONS.save, onNavigateToVideoPage)
			setMediaRecorder(null);
		} catch (e) {
			console.log('Stop Recording: ' + e)
			socketState.setStatus(RECORDING_STATUS.error);
		}
	}


	const pauseRecording = () => {
		socketState.setStatus(RECORDING_STATUS.paused);
		mediaRecorder?.pause();
	};

	const resumeRecording = () => {
		socketState.setStatus(RECORDING_STATUS.recording);
		mediaRecorder?.resume();
	}


	const resetRecording = () => {
		socketState.emit({type: SOCKET_ACTIONS.reset})
		setMediaRecorder(null);
		socketState.setStatus(RECORDING_STATUS.permission_requested)
	}


	return {
		models: {isMicrophoneOn, isCancel},
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


