import { useState, useEffect, useRef } from 'react';
import * as React from 'react';

import { loadScript, removeScript } from '../utils/script-helper';

type GoogleRequestResponse = {
	access_token: string;
	token_type: string;
	expires_in: number;
	scope: string;
	authuser: string;
	hd: string;
	prompt: string;
};

interface UseGoogleLoginParams {
	onSuccess?: (res: GoogleRequestResponse) => void;
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
	uxMode = 'popup',
	jsSrc = 'https://accounts.google.com/gsi/client',
}: UseGoogleLoginParams) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const tokenClient = useRef<{ requestAccessToken: () => void } | null>(null);

	function signIn(e?: React.MouseEvent) {
		if (e) {
			e.preventDefault(); // to prevent submit if used within form
		}
		if (isLoaded) {
			tokenClient.current?.requestAccessToken();
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
					scope:
						'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',

					callback: (res: GoogleRequestResponse) => {
						onSuccess(res);
					},
					error_callback: (error) => {
						console.log(error);
						onFailure(error);
					},
				};

				window.onGoogleLibraryLoad = () => {
					setIsLoaded(true);
					setIsLoading(false);
					tokenClient.current =
						window.google.accounts.oauth2.initTokenClient(params);
				};
			},
			(err) => {
				console.log(err);
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
