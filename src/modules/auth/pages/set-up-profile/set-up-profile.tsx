import React from 'react';
import { useMutation } from 'react-query';
import { styled } from '@mui/material/styles';
import { SetUpProfileForm } from 'modules/auth/pages/set-up-profile/components/set-up-profile-form';
import { UserApi } from 'app/api/user-api/user-api';
import { userState } from 'app/store/user/state';

const ProfileContainer = styled('div')`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

export const SetUpProfilePage = () => {
	const setUpProfileMutation = useMutation(UserApi.updateProfile, {
		onSuccess: async (userData) => {
			userState.setProfile(userData);
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
