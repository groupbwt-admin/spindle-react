import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from 'shared/components/typography/typography';
import { AuthLink } from 'modules/auth/components/link';
import { AUTH_ROUTES } from 'shared/config/routes';
import { RegisterForm } from 'modules/auth/pages/register/components/register-form';
import { useMutation } from 'react-query';
import { AuthApi } from 'app/api/auth-api/auth-api';
import { IToken } from 'shared/types/token';
import jwtDecode from 'jwt-decode';
import { LocalStorageService } from 'shared/services/local-storage-service';
import { setAuthUserData } from 'app/store/auth/actions';
import { ConfirmationMessage } from 'modules/auth/components/confirmation-message';

const Title = styled(Typography)`
	margin-top: 20px;
	margin-bottom: 24px;
	text-align: center;
`;

const LoginContainer = styled('div')`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
`;

const LoginFootnote = styled(Typography)`
	position: absolute;
	bottom: 10px;
`;

export const RegisterPage = () => {
	const [userEmail, setUserEmail] = useState('');
	const [isFormSent, setIsFormSent] = useState(false);

	const registerMutation = useMutation(AuthApi.register, {
		onSuccess: async (token) => {
			const userData: IToken = jwtDecode(token);
			LocalStorageService.set('token', token);

			setAuthUserData(userData);
		},
		onSettled: () => {
			setIsFormSent(true);
		},
	});

	const handleSubmit = (data) => {
		registerMutation.mutate(data);
	};

	return (
		<LoginContainer>
			{isFormSent ? (
				<ConfirmationMessage
					title="Verify your email address"
					description={`Almost there! We’ve sent an email to ${userEmail} to verify your email address and activate your account. The link in the email will expire in 24 hours.`}
				/>
			) : (
				<>
					<Title variant="h1" component="h1">
						Sign up to Spindle
					</Title>
					<RegisterForm
						onSubmit={handleSubmit}
						isLoading={registerMutation.isLoading}
					/>
					<LoginFootnote variant="subtitle2">
						Already have an account?{' '}
						<AuthLink to={AUTH_ROUTES.LOGIN.path}>Sign in</AuthLink>
					</LoginFootnote>
				</>
			)}
		</LoginContainer>
	);
};
