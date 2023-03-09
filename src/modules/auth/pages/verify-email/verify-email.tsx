import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';

import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

import { AuthApi, VerifyEmailDataDto } from 'app/api/auth-api/auth-api';

import { useAuthState } from 'app/store/auth/state';

import { VIDEO_ROUTES } from 'shared/config/routes';

import { Button } from 'shared/components/button/button';
import { Typography } from 'shared/components/typography/typography';

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
	const { setUser } = useAuthState();
	const verifyEmailMutation = useMutation<
		{ accessToken: string },
		AxiosError<{ message: string }>,
		VerifyEmailDataDto
	>(AuthApi.verifyEmail, {
		onSuccess: async (res) => {
			setUser(res.accessToken);
		},
	});

	useEffect(() => {
		const token = searchParams.get('token');
		if (token) {
			verifyEmailMutation.mutate({ token: token });
		} else {
			navigate(VIDEO_ROUTES.MY_VIDEOS.path);
		}
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
				<Button
					component={Link}
					to={VIDEO_ROUTES.MY_VIDEOS.path}
					label="Go to Dashboard"
				/>
			</>
		);
	}

	return null;
};
