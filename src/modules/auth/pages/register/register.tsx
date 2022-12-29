import React from 'react';
import { styled } from '@mui/material/styles';
import { useMutation } from 'react-query';
import { Typography } from 'shared/components/typography/typography';
import { AuthLink } from 'modules/auth/components/link';
import { AUTH_ROUTES } from 'shared/config/routes';
import {
	RegisterForm,
	RegisterFormData,
} from 'modules/auth/pages/register/components/register-form';
import { AuthApi } from 'app/api/auth-api/auth-api';
import { authState } from 'app/store/auth/state';

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
	width: 100%;
	height: 100%;
`;

const LoginFootnote = styled(Typography)`
	position: absolute;
	bottom: 10px;
`;

export const RegisterPage = () => {
	const registerMutation = useMutation(AuthApi.register, {
		onSuccess: (data) => {
			authState.setUser(data.accessToken);
		},
	});

	const handleSubmit = (data: RegisterFormData) => {
		registerMutation.mutate({ ...data });
	};

	return (
		<LoginContainer>
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
		</LoginContainer>
	);
};
