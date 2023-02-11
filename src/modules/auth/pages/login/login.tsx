import { useMutation } from 'react-query';

import { AxiosError } from 'axios/index';
import { AuthLink } from 'modules/auth/components/link';
import { LoginForm } from 'modules/auth/pages/login/components/login-form';

import { styled } from '@mui/material/styles';

import { AuthApi, LoginDataDto } from 'app/api/auth-api/auth-api';

import { authState } from 'app/store/auth/state';

import { Typography } from 'shared/components/typography/typography';
import { AUTH_ROUTES } from 'shared/config/routes';

const Title = styled(Typography)`
	margin-bottom: 36px;
	text-align: center;
`;

const Container = styled('div')`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin-top: 22px;
`;

const Footer = styled(Typography)`
	position: absolute;
	bottom: 19px;
`;

export const LoginPage = () => {
	const loginMutation = useMutation<
		{ accessToken: string },
		AxiosError<{ message: string }>,
		LoginDataDto
	>(AuthApi.login, {
		onSuccess: async (data) => {
			authState.setUser(data.accessToken);
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
				error={loginMutation.error?.response?.data?.message}
			/>
			<Footer variant="subtitle2">
				Don’t have an account?{' '}
				<AuthLink to={AUTH_ROUTES.REGISTER.path}>Sign up</AuthLink>
			</Footer>
		</Container>
	);
};
