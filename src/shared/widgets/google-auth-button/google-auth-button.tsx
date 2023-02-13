import * as React from 'react';
import { useRef } from 'react';
import { useMutation } from 'react-query';

import { AuthApi } from 'app/api/auth-api/auth-api';

import { authState } from 'app/store/auth/state';

import { GOOGLE_CLIENT_ID } from 'shared/config/variables';
import { useGoogleLogin } from 'shared/hooks/use-google-login';

import { GoogleButton } from 'shared/components/google-button/google-button';

interface GoogleAuthButtonWidgetProps {
	label: string;
}

export const GoogleAuthButtonWidget: React.FC<GoogleAuthButtonWidgetProps> = ({
	label,
}) => {
	const refBtn = useRef<HTMLButtonElement | null>(null);

	const googleAuthMutation = useMutation(AuthApi.googleAuth, {
		onSuccess: (data) => {
			authState.setUser(data.accessToken);
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
			fullWidth
			onClick={handleClick}
		/>
	);
};
