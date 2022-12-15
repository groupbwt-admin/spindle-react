import React from "react";
import {styled} from "@mui/material/styles";
import {SetUpProfileForm} from "modules/auth/pages/set-up-profile/components/set-up-profile-form";
import {useMutation} from "react-query";
import {AuthApi} from "app/api/auth-api/auth-api";
import {IToken} from "shared/types/token";
import jwtDecode from "jwt-decode";
import {LocalStorageService} from "shared/services/local-storage-service";
import {setAuthUserData} from "app/store/auth/actions";

const ProfileContainer = styled('div')`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

export const SetUpProfilePage = () => {
	const setUpProfileMutation = useMutation(AuthApi.login, {
		onSuccess: async (token) => {
			const userData: IToken = jwtDecode(token);
			LocalStorageService.set('token', token);

			setAuthUserData(userData)
		},
	});

	const handleSubmit = (data) => {
		setUpProfileMutation.mutate(data)
	}

	return <ProfileContainer>
		<SetUpProfileForm onSubmit={handleSubmit} isLoading={setUpProfileMutation.isLoading}/>
	</ProfileContainer>
}
