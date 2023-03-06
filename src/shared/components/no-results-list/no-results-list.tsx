import * as React from 'react';
import styled from '@emotion/styled/macro';
import image from 'shared/assets/images/empty-state.svg';

import { Button } from 'shared/components/button/button';
import { Typography } from 'shared/components/typography/typography';

const EmptyCard = styled.div`
	width: 364px;
	max-width: 100%;
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

interface NoResultsListProps {
	text: string;
	onReset?: () => void;
}

export const NoResultsList: React.FC<NoResultsListProps> = ({
	text,
	onReset,
}) => {
	return (
		<>
			<EmptyCard>
				<CardImage>
					<img src={image} alt="empty list" />
				</CardImage>
				<CardText variant="body2">{text}</CardText>
				{onReset && <Button label="Reset" onClick={onReset} />}
			</EmptyCard>
		</>
	);
};
