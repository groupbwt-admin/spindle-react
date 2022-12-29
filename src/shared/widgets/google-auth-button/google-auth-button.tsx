import React, { useRef } from 'react';
import { useMutation } from 'react-query';
import jwtDecode from 'jwt-decode';
import { GoogleButton } from 'shared/components/google-button/google-button';
import { useGoogleLogin } from 'shared/hooks/use-google-login';
import { GOOGLE_CLIENT_ID } from 'shared/config/variables';
import { AuthApi } from 'app/api/auth-api/auth-api';
import { LocalStorageService } from 'shared/services/local-storage-service';
import { setAuthUserData } from 'app/store/auth/actions';
import { IToken } from 'shared/types/token';

interface GoogleAuthButtonWidgetProps {
	label: string;
}

export const GoogleAuthButtonWidget: React.FC<GoogleAuthButtonWidgetProps> = ({
	label,
}) => {
	const refBtn = useRef<HTMLButtonElement | null>(null);

	const googleAuthMutation = useMutation(AuthApi.googleAuth, {
		onSuccess: (data) => {
			const userPrimaryData: IToken = jwtDecode(data.accessToken);
			LocalStorageService.set('token', data.accessToken);

			setAuthUserData(userPrimaryData);
		},
	});

	const { signIn, isLoading, isLoaded } = useGoogleLogin({
		clientId: GOOGLE_CLIENT_ID!,
		onSuccess: (res) => {
			googleAuthMutation.mutate({ token: res.access_token });
		},
	});

	const handleClick = () => {
		signIn();
	};

	return (
		<GoogleButton
			ref={refBtn}
			label={label}
			isLoading={isLoading || googleAuthMutation.isLoading}
			disabled={!isLoaded}
			onClick={handleClick}
		/>
	);
};
