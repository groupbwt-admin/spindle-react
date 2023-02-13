import { useState } from 'react';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { BackButton } from 'modules/auth/components/back-button';
import { ForgotPasswordForm } from 'modules/auth/pages/forgot-password/components/forgot-password-form';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { AuthApi, ForgotPasswordDataDto } from 'app/api/auth-api/auth-api';

import { Button } from 'shared/components/button/button';
import { Typography } from 'shared/components/typography/typography';

const Container = styled('div')`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
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

const ResendButton = styled(Button)`
	margin-top: 12px;
`;

export const ForgotPasswordPage = () => {
	const [sentTo, setSentTo] = useState<null | string>(null);

	const forgotPasswordMutation = useMutation<
		string,
		AxiosError<{ message: string }>,
		ForgotPasswordDataDto
	>(AuthApi.forgotPassword, {
		onSuccess: (res, payload) => {
			setSentTo(payload.email);
		},
	});

	const handleSubmit = (data) => {
		forgotPasswordMutation.mutate(data);
	};

	const handleResendEmail = () => {
		forgotPasswordMutation.mutate({ email: sentTo! });
	};

	return (
		<>
			<Container>
				{sentTo ? (
					<>
						<Box>
							<Title variant="h1">Check your email</Title>
							<Description variant="body1">
								We&apos;ve sent a link to your email address to reset your
								password.
							</Description>
							<Description variant="body1">
								Didn&apos;t receive the email?
							</Description>
							<ResendButton
								label="Resend Email"
								isLoading={forgotPasswordMutation.isLoading}
								onClick={handleResendEmail}
								fullWidth
							/>
						</Box>
						<Footer variant="subtitle2">
							<BackButton />
						</Footer>
					</>
				) : (
					<>
						<Title variant="h1" component="h1">
							Forgot your password?
						</Title>
						<Description variant="body1">
							Enter your registered email address and we’ll send you a link to
							reset your password.
						</Description>
						<ForgotPasswordForm
							error={forgotPasswordMutation.error?.response?.data?.message}
							isLoading={forgotPasswordMutation.isLoading}
							onSubmit={handleSubmit}
						/>
						<Footer variant="subtitle2">
							<BackButton />
						</Footer>
					</>
				)}
			</Container>
		</>
	);
};
