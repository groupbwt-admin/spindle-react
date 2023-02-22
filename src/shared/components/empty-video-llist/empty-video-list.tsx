import * as React from 'react';
import styled from '@emotion/styled/macro';
import image from 'shared/assets/images/empty-state.svg';

import {Typography} from 'shared/components/typography/typography';

import {StartRecordButton} from "../../../modules/videos/components/start-record-button";
import {useRecordContext} from "../../../modules/videos/hooks/use-record-context";


const EmptyCard = styled.div`
	width: 364px;
	max-width: 100%;
	height: 350px;
	background: white;
	border-radius: 15px;
	padding: 24px;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: auto;
`;

const CardImage = styled.div`
	width: 100%;
	height: 192px;
	position: relative;

	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
`;

const CardText = styled(Typography)`
	color: ${({theme}) => theme.palette.text.secondary};
	padding: 16px 0;
`;

export const EmptyVideoList = () => {
	const {isRecording, startRecording, isOnline} = useRecordContext()

	return (
		<>
			<EmptyCard>
				<CardImage>
					<img src={image} alt="empty list"/>
				</CardImage>
				<CardText variant="body2">You don’t have any recordings yet.</CardText>
				<StartRecordButton isRecording={isRecording} onStartRecording={startRecording} isOnline={isOnline}/>
			</EmptyCard>
		</>
	);
};
