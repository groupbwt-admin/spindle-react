import * as React from 'react';
import styled from '@emotion/styled/macro';
import { Typography } from 'shared/components/typography/typography';
import { Button } from 'shared/components/button/button';
import { ReactComponent as IconRecord } from 'shared/components/icon/collection/record.svg';
import image from 'shared/assets/images/empty-state.svg';

const RecordButton = styled(Button)`
	max-width: 190px;
	color: #ffffff;
`;

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
	color: ${({ theme }) => theme.palette.text.secondary};
	padding: 16px 0;
`;

export const EmptyVideoList = () => {
	return (
		<>
			<EmptyCard>
				<CardImage>
					<img src={image} alt="empty list" />
				</CardImage>
				<CardText variant="body2">You don’t have any recordings yet.</CardText>
				<RecordButton label="Start Recording" startIcon={<IconRecord />} />
			</EmptyCard>
		</>
	);
};
