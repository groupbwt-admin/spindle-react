import React from 'react';
import { Box } from '@mui/material';
import { Typography } from 'shared/components/typography/typography';
import { styled } from '@mui/material/styles';
import {Button} from "shared/components/button/button";

const Title = styled(Typography)`
	margin-top: 20px;
	text-align: center;
`;

const Description = styled(Typography)`
	max-width: 424px;
	text-align: center;
	padding: 20px 0;
`;

interface ConfirmationMessageProps {
	title: string;
	description: string;
}
export const ConfirmationMessage: React.FC<
	React.PropsWithChildren<ConfirmationMessageProps>
> = ({ title, description }) => {
	return (
		<Box>
			<Title variant="h1">{title}</Title>
			<Description variant="body1">{description}</Description>
			<Description variant="body1">Didn&apos;t receive the email?</Description>
			<Button label="Resend Email" />
		</Box>
	);
};
