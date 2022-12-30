import { useMutation } from 'react-query';
import { styled } from '@mui/material/styles';
import { SetUpProfileForm } from 'modules/auth/pages/set-up-profile/components/set-up-profile-form';
import { UserApi } from 'app/api/user-api/user-api';
import { userState } from 'app/store/user/state';
import { useLogout } from 'shared/hooks/use-logout';
import {useNavigate} from "react-router-dom";
import {VIDEO_ROUTES} from "shared/config/routes";

const ProfileContainer = styled('div')`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

export const SetUpProfilePage = () => {
	const navigate = useNavigate();
	const logoutHook = useLogout();
	const setUpProfileMutation = useMutation(UserApi.updateProfile, {
		onSuccess: async (userData) => {
			userState.setProfile(userData);
			navigate(VIDEO_ROUTES.MY_VIDEOS.path)
		},
		onError: async (error) => {
			console.log(error);
		},
	});

	const handleSubmit = (data) => {
		setUpProfileMutation.mutate(data);
	};

	const handleSignOut = () => {
		logoutHook.logout();
	};

	return (
		<ProfileContainer>
			<SetUpProfileForm
				isLoading={setUpProfileMutation.isLoading}
				onSubmit={handleSubmit}
				onSignOut={handleSignOut}
			/>
		</ProfileContainer>
	);
};
