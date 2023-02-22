import {useCallback, useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";

import {selectAuthUserData} from "app/store/auth/selects";
import {selectStatus} from "app/store/record-socket/selects";
import {socketState} from 'app/store/record-socket/state';

import {VIDEO_ROUTES} from "shared/config/routes";
import {RECORDING_STATUS, SOCKET_ACTIONS} from "shared/constants/record-statuses";
import {SocketService} from "shared/services/base-socket-service";

import {useEvent} from "../../../shared/hooks/use-event";

const DEFAULT_COUNTER = 3
const RECORDING_INTERVAL = 1000
const INTERVAL_COUNT_START = 1000
const COUNTDOWN_TIME = 3500
const PAGE_TITLES = {
	[VIDEO_ROUTES.MY_VIDEOS.path]: {
		title: [VIDEO_ROUTES.MY_VIDEOS.title],
	},
	[VIDEO_ROUTES.PROFILE.path]: {
		title: [VIDEO_ROUTES.MY_VIDEOS.title],
	},
};
export const useRecording = () => {
	const [isMicrophoneOn, setIsMicrophoneOn] = useState(true)
	const [counterBeforeStart, setCounterBeforeStart] = useState<number>(3)
	const mediaRecorder = useRef<MediaRecorder | null>(null);
	const isCancel = useRef(false);
	const status = selectStatus()
	const navigate = useNavigate()
	const user = selectAuthUserData()
	const location = useLocation();
	useEffect(() => {
		if (!user) return
		socketState.onConnectListener()
		socketState.onDisconnectedListener(() => {
				if (mediaRecorder.current) {
					onStopMediaRecording()
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
	useEffect(() => {
		window.addEventListener('storage', (event) => {
			if (event.key === 'token') {
				onStopMediaRecording()
			}
		})
	}, []);

	useEffect(() => {
		window.addEventListener('offline', (e) => {
			socketState.setIsOnline(false)
		});
		window.addEventListener('online', (e) => {
			socketState.setIsOnline(true)
		});

	}, []);


	const wait = () => new Promise<void>((resolve) => {
		const myInterval = setInterval(() => setCounterBeforeStart((prevState) => prevState - 1), INTERVAL_COUNT_START)
		setTimeout(() => {
			resolve(clearInterval(myInterval))
		}, COUNTDOWN_TIME);
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
				stream.getTracks().forEach((track) => {
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
					mediaRecorderLocal.start(RECORDING_INTERVAL);
					mediaRecorder.current = mediaRecorderLocal
					socketState.setStatus(RECORDING_STATUS.recording);
					socketState.setIsRecording(true)
					return mediaRecorderLocal;
				} else {
					mediaRecorderLocal.stream.getTracks().forEach((track) => {
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
				setCounterBeforeStart(DEFAULT_COUNTER)
				await requestMediaStream()
			} catch (e) {
				console.log('Socket Connect:' + e)
				socketState.setStatus(RECORDING_STATUS.error);
			}
		},
		[status],
	);

	const toggleMicrophone = useEvent(() => {
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


	const onNavigateToVideoPage = (video: { id: string }) => {
		navigate(VIDEO_ROUTES.VIDEO.generate(video?.id), {
			state: PAGE_TITLES[location.pathname]
				? {
					from: location.pathname + location.search,
					title: PAGE_TITLES[location.pathname].title,
				}
				: undefined,
		})
	}

	const onStopMediaRecording = () => {
		try {
			mediaRecorder.current?.stop();
			mediaRecorder.current?.stream.getTracks().forEach((track) => {
				track.stop();
			});
			mediaRecorder.current = null
			socketState.setStatus(RECORDING_STATUS.stopped);
			socketState.setIsRecording(false)
		} catch (e) {
			console.error('Stop Media Recording error' + e)
		}
	}
	const onVideoSaved = useEvent(
		async () => {
			try {
				onStopMediaRecording()
				socketState.save(SOCKET_ACTIONS.save, onNavigateToVideoPage)
			} catch (e) {
				console.log('Stop Recording: ' + e)
				socketState.setStatus(RECORDING_STATUS.error);
			}
		});

	const resetRecording = () => {
		mediaRecorder.current?.stop();
		mediaRecorder.current?.stream.getTracks().forEach((track) => {
			track.stop();
		});
		socketState.emit({type: SOCKET_ACTIONS.reset})

		socketState.setStatus(RECORDING_STATUS.reset)
		socketState.setIsRecording(false)

	}
	const pauseRecording = useEvent(
		() => {
			socketState.setStatus(RECORDING_STATUS.paused);
			mediaRecorder.current?.pause();
		});


	const resumeRecording = useEvent(
		() => {
			socketState.setStatus(RECORDING_STATUS.recording);
			mediaRecorder.current?.resume();
		});


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


