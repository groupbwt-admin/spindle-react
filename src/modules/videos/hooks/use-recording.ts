import {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";

import {useEventCallback} from "@mui/material";

import {selectAuthUserData} from "app/store/auth/selects";
import {selectStatus} from "app/store/record-socket/selects";
import {socketState} from 'app/store/record-socket/state';

import {VIDEO_ROUTES} from "shared/config/routes";
import {RECORDING_STATUS, SOCKET_ACTIONS} from "shared/constants/record-statuses";
import {SocketService} from "shared/services/base-socket-service";

export const useRecording = () => {
	const [isMicrophoneOn, setIsMicrophoneOn] = useState(true)
	const [counterBeforeStart, setCounterBeforeStart] = useState<number>(3)
	const mediaRecorder = useRef<MediaRecorder | null>(null);
	const isCancel = useRef(false);
	const status = selectStatus()
	const navigate = useNavigate()
	const user = selectAuthUserData()

	useEffect(() => {
		if (!user) return
		socketState.onConnectListener()
		socketState.onDisconnectedListener(() => {
				if (mediaRecorder.current) {
					onVideoSaved()
				}
			}
		)
		socketState.connect()
		return () => {
			socketState.unfollowListener(SOCKET_ACTIONS.disconnect)
			socketState.unfollowListener(SOCKET_ACTIONS.connect)
			if (SocketService.socket) {
				SocketService.socket.close()
			}
		};
	}, []);

	const wait = () => new Promise<void>((resolve) => {
		const myInterval = setInterval(() => setCounterBeforeStart((prevState) => prevState - 1), 1000)
		setTimeout(() => {
			resolve(clearInterval(myInterval))
		}, 3500);
	});

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

			stream.getVideoTracks()[0].onended = () => {
				stream.getTracks().map((track) => {
					track.stop();
				});
				isCancel.current ? onCancelPreview() : onVideoSaved()
			}
			stream.getAudioTracks()[0].enabled = true
			setIsMicrophoneOn(true)
			const mediaRecorderLocal = new MediaRecorder(stream);

			mediaRecorderLocal.onstart = () => {
				socketState.emit({type: SOCKET_ACTIONS.generate_video_path})
			}

			mediaRecorderLocal.ondataavailable = (event) => {
				socketState.emit({type: SOCKET_ACTIONS.start, payload: {chunk: event.data}})
			};

			return wait().then(() => {
				if (!isCancel.current) {
					mediaRecorderLocal.start(1000);
					mediaRecorder.current = mediaRecorderLocal
					socketState.setStatus(RECORDING_STATUS.recording);
					socketState.setIsRecording(true)
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
	}


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
		[status],
	);

	const toggleMicrophone = useEventCallback(() => {
		setIsMicrophoneOn((prevValue) => {
			const newValue = !prevValue;
			if (mediaRecorder.current) {
				mediaRecorder.current.stream.getAudioTracks()[0].enabled = newValue
			}
			return newValue
		})
	});

	function onCancelPreview() {
		isCancel.current = true
		socketState.setStatus(RECORDING_STATUS.permission_requested);
	}


	const onNavigateToVideoPage = (video) => {
		if (video) {
			navigate(VIDEO_ROUTES.VIDEO.generate(video.id))
		}
	}

	const onVideoSaved = useCallback(
		async () => {
			try {
				mediaRecorder.current?.stop();
				mediaRecorder.current?.stream.getTracks().map((track) => {
					track.stop();
				});
				socketState.setStatus(RECORDING_STATUS.stopped);
				socketState.save(SOCKET_ACTIONS.save, onNavigateToVideoPage)
				socketState.setIsRecording(false)
				mediaRecorder.current = null
			} catch (e) {
				console.log('Stop Recording: ' + e)
				socketState.setStatus(RECORDING_STATUS.error);
			}
		},
		[status],
	);

	const resetRecording = () => {
		mediaRecorder.current?.stop();
		mediaRecorder.current?.stream.getTracks().map((track) => {
			track.stop();
		});
		socketState.emit({type: SOCKET_ACTIONS.reset})

		socketState.setStatus(RECORDING_STATUS.reset)
		socketState.setIsRecording(false)

	}
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


	return {
		models: {isMicrophoneOn, isCancel, counterBeforeStart},
		command: {
			onCancelPreview,
			toggleMicrophone,
			pauseRecording,
			resetRecording,
			resumeRecording,
			startRecording, onVideoSaved
		},
	}
};


