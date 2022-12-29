import React from 'react';
import { styled } from '@mui/material/styles';
import { NewPasswordForm } from 'modules/auth/pages/new-password/components/new-password-form';
import { useMutation } from 'react-query';
import { AuthApi } from 'app/api/auth-api/auth-api';
import { Typography } from 'shared/components/typography/typography';
import { useSearchParams } from 'react-router-dom';
import { authState } from 'app/store/auth/state';

const LoginContainer = styled('div')`
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

export const NewPasswordPage = () => {
	const [searchParams] = useSearchParams();

	const resetPasswordMutation = useMutation(AuthApi.resetPassword, {
		onSuccess: async (token) => {
			authState.setUser(token);
		},
	});

	const handleSubmit = (data) => {
		const token = searchParams.get('token');
		if (token) {
			resetPasswordMutation.mutate({ token: token, password: data.password });
		}
	};

	return (
		<LoginContainer>
			<Title variant="h1" component="h1">
				Create new password
			</Title>
			<Description variant="body1">
				Your new password must be different from previously used passwords.
			</Description>
			<NewPasswordForm
				onSubmit={handleSubmit}
				isLoading={resetPasswordMutation.isLoading}
			/>
		</LoginContainer>
	);
};
