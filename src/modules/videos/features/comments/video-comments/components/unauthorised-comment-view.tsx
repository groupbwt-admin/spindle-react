import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled/macro';
import image from 'shared/assets/images/unauthorised-comments.svg';

import { AUTH_ROUTES } from 'shared/config/routes';

import { Button } from 'shared/components/button/button';
import { ReactComponent as SignInIcon } from 'shared/components/icon/collection/sign-in.svg';
import { Typography } from 'shared/components/typography/typography';

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

export const UnauthorisedCommentView = () => {
	return (
		<EmptyCard>
			<CardImage>
				<img src={image} alt="empty list" />
			</CardImage>
			<CardText variant="body1">Sign up to see and write comments</CardText>
			<Button
				component={Link}
				label="Sign in"
				to={AUTH_ROUTES.LOGIN.path}
				startIcon={<SignInIcon />}
			/>
		</EmptyCard>
	);
};
