import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { styled } from '@mui/material/styles';
import { Typography } from 'shared/components/typography/typography';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from 'shared/components/button/button';
import { AuthApi, VerifyEmailDataDto } from 'app/api/auth-api/auth-api';
import { CircularProgress } from '@mui/material';
import { AUTH_ROUTES } from 'shared/config/routes';
import { AxiosError } from 'axios';
import { authState } from 'app/store/auth/state';

const Title = styled(Typography)`
	margin-top: 20px;
	text-align: center;
`;

const Description = styled(Typography)`
	max-width: 424px;
	text-align: center;
	padding: 20px 0;
`;

export const VerifyEmailPage = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const verifyEmailMutation = useMutation<
		string,
		AxiosError<{ message: string }>,
		VerifyEmailDataDto
	>(AuthApi.verifyEmail, {
		onSuccess: async (token) => {
			authState.setUser(token);
		},
	});

	useEffect(() => {
		const token = searchParams.get('token');
		if (token) {
			verifyEmailMutation.mutate({ token: token });
		} else {
			navigate(AUTH_ROUTES.LOGIN.path);
		}
		return;
	}, []);

	if (verifyEmailMutation.isLoading) {
		return <CircularProgress />;
	}

	if (verifyEmailMutation.isError) {
		return (
			<>
				<Title variant="h1">Something went wrong</Title>
				<Description variant="body1">
					{verifyEmailMutation.error?.response?.data?.message}
				</Description>
				<Button component={Link} to={AUTH_ROUTES.LOGIN.path} label="Sign in" />
			</>
		);
	}

	return (
		<>
			<Title variant="h1">Your email address has been verified</Title>
			<Description variant="body1">
				Now you can sign in with your email and password
			</Description>
			<Button
				component={Link}
				to={AUTH_ROUTES.LOGIN.path}
				label="Sign in"
				fullWidth
			/>
		</>
	);
};
