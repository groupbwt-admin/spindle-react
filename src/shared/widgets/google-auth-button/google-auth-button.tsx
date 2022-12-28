import React, { useRef } from 'react';
import { GoogleButton } from 'shared/components/google-button/google-button';
import { useGoogleLogin } from 'shared/hooks/use-google-login';
import { GOOGLE_CLIENT_ID } from 'shared/config/variables';

interface GoogleAuthButtonWidgetProps {
	label: string;
}

export const GoogleAuthButtonWidget: React.FC<GoogleAuthButtonWidgetProps> = ({
	label,
}) => {
	const refBtn = useRef<HTMLButtonElement | null>(null);

	const { signIn, isLoading, isLoaded } = useGoogleLogin({
		clientId: GOOGLE_CLIENT_ID!,
	});

	const handleClick = () => {
		signIn();
	};

	return (
		<GoogleButton
			ref={refBtn}
			label={label}
			isLoading={isLoading}
			disabled={!isLoaded}
			onClick={handleClick}
		/>
	);
};
