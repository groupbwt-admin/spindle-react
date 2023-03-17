import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { AuthLink } from 'modules/auth/components/link';
import {
	RegisterForm,
	RegisterFormData,
} from 'modules/auth/pages/register/components/register-form';

import { styled } from '@mui/material/styles';

import { AuthApi, RegisterDataDto } from 'app/api/auth-api/auth-api';

import { useAuthState } from 'app/store/auth/state';

import { AUTH_ROUTES } from 'shared/config/routes';

import { Typography } from 'shared/components/typography/typography';

const Title = styled(Typography)`
	margin-bottom: 40px;
	text-align: center;
`;

const LoginContainer = styled('div')`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100%;
	overflow-y: auto;
`;

const LoginFootnote = styled(Typography)`
	position: absolute;
	bottom: 24px;
`;

export const RegisterPage = () => {
	const { setUser } = useAuthState();
	const registerMutation = useMutation<
		{ accessToken: string },
		AxiosError<{ message: string }>,
		RegisterDataDto
	>(AuthApi.register, {
		onSuccess: (data) => {
			setUser(data.accessToken);
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
				isLoading={registerMutation.isLoading}
				error={registerMutation.error?.response?.data?.message}
				onSubmit={handleSubmit}
			/>
			<LoginFootnote variant="subtitle2">
				Already have an account?{' '}
				<AuthLink to={AUTH_ROUTES.LOGIN.path}>Sign in</AuthLink>
			</LoginFootnote>
		</LoginContainer>
	);
};
