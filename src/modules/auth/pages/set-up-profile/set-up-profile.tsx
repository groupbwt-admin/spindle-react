import React, {useEffect} from 'react';
import { styled } from '@mui/material/styles';
import { SetUpProfileForm } from 'modules/auth/pages/set-up-profile/components/set-up-profile-form';
import { useMutation } from 'react-query';
import { AuthApi } from 'app/api/auth-api/auth-api';
import { IToken } from 'shared/types/token';
import jwtDecode from 'jwt-decode';
import { LocalStorageService } from 'shared/services/local-storage-service';
import { setAuthUserData } from 'app/store/auth/actions';
import {useNavigate, useSearchParams} from "react-router-dom";

const ProfileContainer = styled('div')`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const SetUpProfilePage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	const setUpProfileMutation = useMutation(AuthApi.verifyEmail, {
		onSuccess: async (token) => {
			// const userData: IToken = jwtDecode(token);
			// LocalStorageService.set('token', token);
			//
			// setAuthUserData(userData);
		},
	});

	const verifyEmailMutation = useMutation(AuthApi.verifyEmail, {
		onSuccess: async (token) => {
			const userData: IToken = jwtDecode(token);
			LocalStorageService.set('token', token);

			setAuthUserData(userData);
		},
	});

	useEffect(() => {
		const token = searchParams.get("token");
		if(token) {
			verifyEmailMutation.mutate({token: token})
		}
		else {
			navigate('/auth/login')
		}
		return
	}, [])


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
