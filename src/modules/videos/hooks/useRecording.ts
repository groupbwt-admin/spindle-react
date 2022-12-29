import React from 'react';


export const useRecording = (props: any) => {
	const playerRef = React.useRef(null);

	const videoJsOptions = {
		controls: true,
		bigPlayButton: false,
		width: 320,
		height: 240,
		fluid: false,
		plugins: {
			record: {
				screen: true,
				audio: true,
				maxLength: 10,
				debug: true,

			}
		}
	};
	const startRecording = (player: any) => {
		player.on('startRecord', () => {
			console.log('started recording!');
		});
	}
	const handlePlayerReady = (player: any) => {
		playerRef.current = player;

		player.on('deviceReady', () => {
			console.log('device is ready!');
		});

		player.on('startRecord', () => {
			console.log('started recording!');
		});

		player.on('finishRecord', () => {

			console.log('finished recording: ', player.recordedData);
		});

		player.on('error', (element, error) => {
			console.warn(error);
		});

		player.on('deviceError', () => {
			console.error('device error:', player.deviceErrorCode);
		});
	};


}

