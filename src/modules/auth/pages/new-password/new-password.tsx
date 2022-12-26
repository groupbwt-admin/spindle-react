import React from 'react';
import {styled} from "@mui/material/styles";
import {NewPasswordForm} from "modules/auth/pages/new-password/components/new-password-form";
import {useMutation} from "react-query";
import {AuthApi} from "app/api/auth-api/auth-api";
import {IToken} from "shared/types/token";
import jwtDecode from "jwt-decode";
import {LocalStorageService} from "shared/services/local-storage-service";
import {setAuthUserData} from "app/store/auth/actions";
import {Typography} from "shared/components/typography/typography";
import {useSearchParams} from "react-router-dom";

const LoginContainer = styled('div')`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
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
	const [searchParams, setSearchParams] = useSearchParams();

	const updatePasswordMutation = useMutation(AuthApi.setNewPassword, {
		onSuccess: async (token) => {
			const userData: IToken = jwtDecode(token);
			LocalStorageService.set('token', token);

			setAuthUserData(userData)
		},
	});

	const handleSubmit = (data) => {
		const token = searchParams.get("token");
		if(token) {
			updatePasswordMutation.mutate({token: token, password: data.password})
		}
	}

	return <LoginContainer>
		<Title variant="h1" component="h1">
			Create new password
		</Title>
		<Description variant="body1">Your new password must be different from previously used passwords.</Description>
		<NewPasswordForm onSubmit={handleSubmit} isLoading={updatePasswordMutation.isLoading}/>
	</LoginContainer>
}
