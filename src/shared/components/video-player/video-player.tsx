import React, { useEffect, useState } from 'react';
import { Player } from '@clappr/core';
import HlsjsPlayback from '@clappr/hlsjs-playback';
import {
	ClickToPause,
	ClosedCaptions,
	EndVideo,
	ErrorScreen,
	MediaControl,
	Poster,
	SeekTime,
	SpinnerThreeBounce,
	Stats,
} from '@clappr/plugins';
import styled from '@emotion/styled/macro';
import PlaybackRatePlugin from 'clappr-playback-rate-plugin';

import { IVideoSign } from 'shared/types/video';

import { MIME_TYPES } from 'shared/constants/media';

import { SpinnerOverlay } from 'shared/components/spinner-overlay/spinner-overlay';

import { PipPlugin } from './plugins/pip/pip';
import { PipButton } from './plugins/pip/pip-button';

const StyledVideoPlayerContainer = styled.div`
	position: relative;

	.MuiBackdrop-root {
		z-index: 5;
		position: absolute;
	}

	.play-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;

		&::before {
			content: '';
			display: block;
			background: ${({ theme }) => theme.palette.common.white};
			width: 100px;
			height: 100px;
			left: calc(50% - 50px);
			top: calc(50% - 50px);
			position: absolute;
			border-radius: 50%;
		}
	}

	.poster-icon {
		position: relative;
		width: 36px;
		height: 36px;

		path {
			fill: #231d2c !important;
		}
	}
`;

const StyledVideoPlayer = styled.div`
	height: 56.25vw;
	max-height: calc(100vh - 300px);
	min-height: 480px;
`;

interface VideoPlayerProps {
	src?: string | IVideoSign;
	mimeType?: MIME_TYPES | null;
	className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
	src,
	mimeType,
	className,
}) => {
	const [isPlayerLoading, setIsPlayerLoading] = useState(true);

	const containerRef = React.useRef(null);
	const playerRef = React.useRef<Player | null>(null);
	const player = playerRef.current;

	useEffect(() => {
		if ((!containerRef.current || player) && !src) return;

		initPlayer();

		return () => {
			playerRef.current?.destroy();
			playerRef.current = null;
		};
	}, [containerRef.current, player, src]);

	const initPlayer = async () => {
		return new Promise((resolve) => {
			playerRef.current = new Player({
				parent: containerRef.current,
				width: '100%',
				height: '100%',
				source: src,
				mimeType: mimeType,
				plugins: [
					MediaControl,
					ClosedCaptions,
					EndVideo,
					SpinnerThreeBounce,
					Stats,
					ClickToPause,
					ErrorScreen,
					Poster,
					SeekTime,
					Stats,
					HlsjsPlayback,
					PlaybackRatePlugin,
					PipPlugin,
					PipButton,
				],
				playbackRateConfig: {
					defaultValue: 1,
					options: [
						{ value: 0.5, label: '0.5x' },
						{ value: 1, label: '1x' },
						{ value: 1.5, label: '1.5x' },
						{ value: 2, label: '2x' },
					],
				},
				events: {
					onReady: (e: Player) => {
						console.log('ready', e);
						setIsPlayerLoading(false);
					},
				},
			});
			resolve('Player created!');
		});
	};

	return (
		<StyledVideoPlayerContainer className={className}>
			<SpinnerOverlay open={isPlayerLoading} />
			<StyledVideoPlayer ref={containerRef}></StyledVideoPlayer>
		</StyledVideoPlayerContainer>
	);
};
