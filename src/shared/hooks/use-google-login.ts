import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { loadScript, removeScript } from '../utils/script-helper';

type GoogleRequestResponse = {
	clientId: string;
	client_id: string;
	credential: string;
	select_by: string;
};

type DecodedGoogleUserToken = {
	iss: string;
	nbf: number;
	aud: string;
	sub: string;
	hd: string;
	email: string;
	email_verified: boolean;
	azp: string;
	name: string;
	picture: string;
	given_name: string;
	family_name: string;
	iat: number;
	exp: number;
	jti: string;
};

interface UseGoogleLoginParams {
	onSuccess?: (
		userData: DecodedGoogleUserToken,
		res: GoogleRequestResponse,
	) => void;
	onFailure?: (error: any) => void;
	onRequest?: () => void;
	onScriptLoadFailure?: () => void;
	clientId: string;
	autoLoad?: boolean;
	uxMode?: 'popup' | 'redirect';
	jsSrc?: string;
}

export const useGoogleLogin = ({
	onSuccess = () => {},
	onFailure = () => {},
	onScriptLoadFailure,
	clientId,
	autoLoad,
	uxMode = 'redirect',
	jsSrc = 'https://accounts.google.com/gsi/client',
}: UseGoogleLoginParams) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	function signIn(e?: React.MouseEvent) {
		if (e) {
			e.preventDefault(); // to prevent submit if used within form
		}
		if (isLoaded) {
			window.google.accounts.id.prompt();
		}
	}

	useEffect(() => {
		let unmounted = false;
		const onLoadFailure = onScriptLoadFailure || onFailure;
		setIsLoading(true);

		loadScript(
			document,
			'script',
			'google-login',
			jsSrc,
			() => {
				const params = {
					client_id: clientId,
					ux_mode: uxMode,
					callback: (res: GoogleRequestResponse) => {
						const userInfo: DecodedGoogleUserToken = jwtDecode(res.credential);

						onSuccess(userInfo, res);
					},
				};

				window.onGoogleLibraryLoad = () => {
					setIsLoaded(true);
					setIsLoading(false);
					window.google.accounts.id.initialize(params);
				};
			},
			(err) => {
				onLoadFailure(err);
				setIsLoaded(false);
				setIsLoading(false);
			},
		);

		return () => {
			unmounted = true;
			removeScript(document, 'google-login');
		};
	}, []);

	useEffect(() => {
		if (autoLoad && isLoaded) {
			signIn();
		}
	}, [isLoaded]);

	return { signIn, isLoaded, isLoading };
};
