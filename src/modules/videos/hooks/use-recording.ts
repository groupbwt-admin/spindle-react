import {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {VIDEO_ROUTES} from "shared/config/routes";
import {RECORDING_STATUS, SOCKET_ACTIONS} from "shared/constants/record-statuses";
import {socketState} from 'app/store/record-socket/state';
import {SocketService} from "../../../shared/services/base-socket-service";
import {selectStatus} from "../../../app/store/record-socket/selects";
import {EventBus, RECORDING_EVENTS} from "../../../shared/utils/event-bus";

export const useRecording = () => {
	const [isMicrophoneOn, setIsMicrophoneOn] = useState(false)
	const [counterBeforeStart, setCounterBeforeStart] = useState(3)

	const mediaRecorder = useRef<MediaRecorder | null>(null);
	const isCancel = useRef(false);
	const status = selectStatus()
	const navigate = useNavigate()
	useEffect(() => {
		socketState.onConnectListener()
		socketState.onDisconnectedListener(() => console.log('log'))
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

			mediaRecorderLocal.onstart = () => {
				socketState.emit({type: SOCKET_ACTIONS.generate_video_path})
			}

			mediaRecorderLocal.ondataavailable = (event) => {
				console.log(event.data)
				socketState.emit({type: SOCKET_ACTIONS.start, payload: {chunk: event.data}})
			};

			return wait().then(() => {
				if (!isCancel.current) {
					mediaRecorderLocal.start(250);
					mediaRecorder.current = mediaRecorderLocal
					socketState.setStatus(RECORDING_STATUS.recording);
					socketState.setIsShowController(true)
					return mediaRecorderLocal;
				} else {
					mediaRecorderLocal.stream.getTracks().map((track) => {
						track.stop();
					});
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
				setCounterBeforeStart(3)
				await requestMediaStream()
			} catch (e) {
				console.log('Socket Connect:' + e)
				socketState.setStatus(RECORDING_STATUS.error);
			}
		},
		[],
	);


	const toggleMicrophone = useCallback(
		() => {
			setIsMicrophoneOn((prevValue) => {
				const newValue = !prevValue;
				if (mediaRecorder.current) {
					mediaRecorder.current.stream.getAudioTracks()[0].enabled = newValue
				}
				return newValue
			})
		},
		[],
	);

	const wait = () => new Promise<void>((resolve) => {
		const myInterval = setInterval(() => setCounterBeforeStart(counterBeforeStart - 1), 1000)
		setTimeout(() => {
			resolve(clearInterval(myInterval));
		}, 3000);
	});

	function prevCancelStream() {
		isCancel.current = true
		socketState.setStatus(RECORDING_STATUS.permission_requested);
	}


	const onNavigateToVideoPage = (video) => {
		if (video) {
			navigate(VIDEO_ROUTES.VIDEO.generate(video.id))
		}
	}
	const stopRecording = useCallback(
		async () => {
			try {
				mediaRecorder.current?.stop();
				mediaRecorder.current?.stream.getTracks().map((track) => {
					track.stop();
				});
				socketState.setStatus(RECORDING_STATUS.stopped);
				socketState.save(SOCKET_ACTIONS.save, onNavigateToVideoPage)
				socketState.setIsShowController(false)
				mediaRecorder.current = null
			} catch (e) {
				console.log('Stop Recording: ' + e)
				socketState.setStatus(RECORDING_STATUS.error);
			}
		},
		[],
	);


	const pauseRecording = useCallback(
		() => {
			socketState.setStatus(RECORDING_STATUS.paused);
			mediaRecorder.current?.pause();
		},
		[],
	);


	const resumeRecording = useCallback(
		() => {
			socketState.setStatus(RECORDING_STATUS.recording);
			mediaRecorder.current?.resume();
		},
		[],
	);


	const resetRecording = useCallback(
		() => {
			mediaRecorder.current?.stop();
			mediaRecorder.current?.stream.getTracks().map((track) => {
				track.stop();
			});
			socketState.setStatus(RECORDING_STATUS.permission_requested)
			socketState.setIsShowController(false)
			mediaRecorder.current = null
			socketState.emit({type: SOCKET_ACTIONS.reset})
		},
		[],
	);


	return {
		models: {isMicrophoneOn, isCancel, counterBeforeStart},
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


