import React from 'react';
import { styled } from '@mui/material/styles';
import { SetUpProfileForm } from 'modules/auth/pages/set-up-profile/components/set-up-profile-form';
import { useMutation } from 'react-query';
import { setAuthUserData } from 'app/store/auth/actions';
import { UserApi } from 'app/api/user-api/user-api';
import { useNavigate } from 'react-router-dom';
import { VIDEO_ROUTES } from 'shared/config/routes';

const ProfileContainer = styled('div')`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

export const SetUpProfilePage = () => {
	const navigate = useNavigate();

	const setUpProfileMutation = useMutation(UserApi.updateProfile, {
		onSuccess: async (userData) => {
			setAuthUserData(userData);
			navigate(VIDEO_ROUTES.MY_VIDEOS.path);
		},
		onError: async (error) => {
			console.log(error);
		},
	});

	const handleSubmit = (data) => {
		setUpProfileMutation.mutate(data);
	};

	return (
		<ProfileContainer>
			<SetUpProfileForm
				onSubmit={handleSubmit}
				isLoading={setUpProfileMutation.isLoading}
			/>
		</ProfileContainer>
	);
};
