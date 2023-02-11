import React, { useEffect } from 'react';

import { Player } from '@clappr/core';
import HlsjsPlayback from '@clappr/hlsjs-playback';
import {
	ClickToPause,
	ClosedCaptions,
	DVRControls,
	EndVideo,
	ErrorScreen,
	MediaControl,
	Poster,
	SeekTime,
	SpinnerThreeBounce,
	Stats,
} from '@clappr/plugins';

export const VideoPlayer = () => {
	const containerRef = React.useRef(null);
	const playerRef = React.useRef<Player | null>(null);
	const player = playerRef.current;

	useEffect(() => {
		if (!containerRef.current || player) return;
		initPlayer();

		return () => {
			playerRef.current?.destroy();
			playerRef.current = null;
		};
	}, [containerRef.current, player]);

	const initPlayer = () => {
		return new Promise((resolve, reject) => {
			playerRef.current = new Player({
				parent: containerRef.current,
				autoPlay: true,
				source:
					'http://spindle-api.groupbwt.com/api/videos/streaming?videoId=1ac41b94-098b-48fd-9c81-3aa53356d975&expirationDate=2023-01-13T19%3A18%3A03.697Z&signed=cf62305d6145c586a5ad18729af8ea0517ed42c29a1e12e2562fe2582989d645',
				plugins: [
					MediaControl,
					ClosedCaptions,
					EndVideo,
					SpinnerThreeBounce,
					Stats,
					ClickToPause,
					DVRControls,
					ErrorScreen,
					Poster,
					SeekTime,
					Stats,
					// HlsjsPlayback,
				],
				events: {
					onReady: (e: Player) => {
						console.log('ready', e);
					},
					onResize: (e: { width: number; height: number }) => {
						console.log('resize', e);
					},
					onPlay: () => {
						console.log('play', true);
					},
					onPause: () => {
						console.log('pause', true);
					},
					onStop: (e: boolean) => {
						console.log('stop', e);
					},
					onEnded: () => {
						console.log('ended', true);
					},
					onSeek: (e: number) => {
						console.log('seek', e);
					},
					onError: (e: Error) => {
						console.log('error', e);
					},
					onTimeUpdate: (e: { current: number; total: number }) => {
						console.log('time-updated', e);
					},
					onVolumeUpdate: (e: number) => {
						console.log('volume-updated', e);
					},
					onSubtitleAvailable: (e: boolean) => {
						console.log('subtitle-available', e);
					},
				},
			});
			resolve('Player created!');
		});
	};

	return (
		<div>
			<div ref={containerRef}></div>
		</div>
	);
};
