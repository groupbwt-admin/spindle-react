import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from 'shared/components/typography/typography';
import { LoginForm } from 'modules/auth/pages/login/components/login-form';
import { AuthLink } from 'modules/auth/components/link';
import { AUTH_ROUTES } from 'shared/config/routes';
import { useMutation } from 'react-query';
import { AuthApi } from 'app/api/auth-api/auth-api';
import { LocalStorageService } from 'shared/services/local-storage-service';
import { setAuthUserData } from 'app/store/auth/actions';
import { IToken } from 'shared/types/token';
import jwtDecode from 'jwt-decode';

const Title = styled(Typography)`
	margin-top: 20px;
	margin-bottom: 24px;
	text-align: center;
`;

const Container = styled('div')`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 22px;
`;

const Footer = styled(Typography)`
	position: absolute;
	bottom: 10px;
`;

export const LoginPage = () => {

	const loginMutation = useMutation(AuthApi.login, {
		onSuccess: async (data) => {
			const userData: IToken = jwtDecode(data.accessToken);
			LocalStorageService.set('token', data.accessToken);

			setAuthUserData(userData);
		},
	});

	const handleSubmit = (data) => {
		loginMutation.mutate(data);
	};

	return (
		<Container>
			<Title variant="h1" component="h1">
				Sign in to Spindle
			</Title>
					<LoginForm
						onSubmit={handleSubmit}
						isLoading={loginMutation.isLoading}
					/>
					<Footer variant="subtitle2">
						Don’t have an account?{' '}
						<AuthLink to={AUTH_ROUTES.REGISTER.path}>Sign up</AuthLink>
					</Footer>
		</Container>
	);
};
