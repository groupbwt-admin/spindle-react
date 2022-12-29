import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

import 'webrtc-adapter';
import RecordRTC from 'recordrtc';


import 'videojs-record/dist/css/videojs.record.css';
import 'videojs-record/dist/videojs.record.js';

export const VideoJSComponent = (props: any) => {
	const videoRef:any = React.useRef(null);
	const playerRef:any = React.useRef(null);
	const {options, onReady} = props;

	React.useEffect(() => {

		// Make sure Video.js player is only initialized once
		if (!playerRef.current) {
			// The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
			const videoElement = document.createElement('video-js');

			videoElement.className = 'video-js vjs-default-skin';
			videoRef.current.appendChild(videoElement);

			const player = playerRef.current = videojs(videoElement, options, () => {
				// print version information at startup
				const version_info = 'Using video.js ' + videojs.VERSION +
					' with videojs-record ' + videojs.getPluginVersion('record') +
					', recordrtc ' + RecordRTC.version + ' and React ' + React.version;
				videojs.log(version_info);

				onReady && onReady(player);
			});

		} else {
			// const player = playerRef.current;
			// player.record().getDevice();
		}
	}, [options, videoRef]);

	React.useEffect(() => {
		const player = playerRef.current;

		return () => {
			if (player && !player.isDisposed()) {
				player.dispose();
				playerRef.current = null;
			}
		};
	}, [playerRef]);

	return (
		<div data-vjs-player>
			<div ref={videoRef} />
		</div>
	);
};

export default VideoJSComponent;
