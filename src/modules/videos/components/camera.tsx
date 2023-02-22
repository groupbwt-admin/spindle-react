import React from 'react';
import styled from '@emotion/styled/macro';

import {WrapperCamera} from "./wrappper-camera";


const VideoCamera = styled.video`
	border-radius: 50%;
	object-fit: cover;
	height: 200px;
	width: 200px;
	background-color: #000;
	box-shadow: 1px 1px 27px -2px rgba(0, 0, 0, 0.74);
	transition: filter 0.3s ease-out;
	-webkit-transform: scaleX(-1);
	transform: scaleX(-1);
	border-radius: 50%;
	margin-left: 20px;

	&:hover {
		filter: brightness(60%);
	}
`

interface ICamera {
	isShowCamera: boolean,
	videoRef: any,
}

export const Camera: React.FC<ICamera> = ({isShowCamera, videoRef}) => {
	if (!isShowCamera) return null
	return (
		// <WrapperCamera>
			<VideoCamera
				ref={videoRef}
				autoPlay
				playsInline
				muted
			/>
		// </WrapperCamera>


	);
};

