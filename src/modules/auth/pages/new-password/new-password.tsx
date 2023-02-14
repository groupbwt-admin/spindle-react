import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { BackButton } from 'modules/auth/components/back-button';
import { NewPasswordForm } from 'modules/auth/pages/new-password/components/new-password-form';

import { styled } from '@mui/material/styles';

import { AuthApi, ResetPasswordDto } from 'app/api/auth-api/auth-api';

import { authState } from 'app/store/auth/state';

import { AUTH_ROUTES } from 'shared/config/routes';

import { Typography } from 'shared/components/typography/typography';

const Container = styled('div')`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
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

const Footer = styled(Typography)`
	position: absolute;
	bottom: 0;
`;

export const NewPasswordPage = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const resetPasswordMutation = useMutation<
		{ accessToken: string },
		AxiosError<{ message: string }>,
		ResetPasswordDto
	>(AuthApi.resetPassword, {
		onSuccess: (res) => {
			authState.setUser(res.accessToken);
		},
	});

	useEffect(() => {
		const token = searchParams.get('token');
		if (!token) {
			navigate(AUTH_ROUTES.LOGIN.path);
		}
	}, []);

	const handleSubmit = (data) => {
		const token = searchParams.get('token');
		resetPasswordMutation.mutate({ token: token!, password: data.password });
	};

	return (
		<Container>
			<Title variant="h1" component="h1">
				Create new password
			</Title>
			<Description variant="body1">
				Your new password must be different from previously used passwords.
			</Description>
			<NewPasswordForm
				error={resetPasswordMutation.error?.response?.data?.message}
				isLoading={resetPasswordMutation.isLoading}
				onSubmit={handleSubmit}
			/>
			<Footer variant="subtitle2">
				<BackButton />
			</Footer>
		</Container>
	);
};
