import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from 'shared/components/typography/typography';
import { ForgotPasswordForm } from 'modules/auth/pages/forgot-password/components/forgot-password-form';
import { BackButton } from 'modules/auth/components/back-button';
import {useMutation} from "react-query";
import {AuthApi} from "app/api/auth-api/auth-api";
import {ConfirmationMessage} from "modules/auth/components/confirmation-message";

const Container = styled('div')`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Footer = styled(Typography)`
	position: absolute;
	bottom: 0;
`;

const Title = styled(Typography)`
	margin-top: 20px;
	margin-bottom: 24px;
	text-align: center;
`;

const Description = styled(Typography)`
	max-width: 424px;
	text-align: center;
`;

export const ForgotPasswordPage = () => {
	const [isFormSent, setIsFormSent] = useState(false);

	const forgotPasswordMutation = useMutation(AuthApi.forgotPassword,{
		onSuccess: () => {
		setIsFormSent(true);
	},
	})

	const handleSubmit = (data) => {
		forgotPasswordMutation.mutate(data)
	}

	return (
		<>
			<Container>
				{isFormSent ? (
					<ConfirmationMessage
						title="Check your email"
						description="We've sent a link to your email address to reset your password."
					/>
				) : (<>
					<Title variant="h1" component="h1">
						Forgot your password?
					</Title>
					<Description variant="body1">Enter your registered email address and we’ll send you a link to reset your password.</Description>
					<ForgotPasswordForm onSubmit={handleSubmit} isLoading={forgotPasswordMutation.isLoading}/>
					<Footer variant="subtitle2">
						<BackButton />
					</Footer>
				</>)}
			</Container>
		</>
	);
};
