import React, { useState, useEffect } from 'react';
import { loadScript, removeScript } from '../utils/script-helper';

interface UseGoogleLoginParams {
	onSuccess?: (res: {
		googleId: string;
		tokenObj: { access_token: string };
		tokenId: string;
		accessToken: string;
		profileObj: {
			googleId: string;
			imageUrl: string;
			email: string;
			name: string;
			givenName: string;
			familyName: string;
		};
	}) => void;
	onAutoLoadFinished?: (flag: boolean) => void;
	onFailure?: (error: any) => void;
	onRequest?: () => void;
	onScriptLoadFailure?: () => void;
	clientId: string;
	autoLoad?: boolean;
	isSignedIn?: boolean;
	fetchBasicProfile?: boolean;
	redirectUri?: string;
	uxMode?: boolean;
	jsSrc?: string;
	prompt?: boolean;
}

export const useGoogleLogin = ({
	onSuccess = () => {},
	onAutoLoadFinished = () => {},
	onFailure = () => {},
	onRequest = () => {},
	onScriptLoadFailure,
	clientId,
	autoLoad,
	isSignedIn,
	fetchBasicProfile,
	redirectUri,
	uxMode,
	jsSrc = 'https://apis.google.com/js/api.js',
	prompt,
}: UseGoogleLoginParams) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	function handleSigninSuccess(res) {
		/*
			offer renamed response keys to names that match use
		*/
		const basicProfile = res.getBasicProfile();
		const authResponse = res.getAuthResponse(true);
		res.googleId = basicProfile.getId();
		res.tokenObj = authResponse;
		res.tokenId = authResponse.id_token;
		res.accessToken = authResponse.access_token;
		res.profileObj = {
			googleId: basicProfile.getId(),
			imageUrl: basicProfile.getImageUrl(),
			email: basicProfile.getEmail(),
			name: basicProfile.getName(),
			givenName: basicProfile.getGivenName(),
			familyName: basicProfile.getFamilyName(),
		};
		onSuccess(res);
	}

	function signIn(e?: React.MouseEvent) {
		if (e) {
			e.preventDefault(); // to prevent submit if used within form
		}
		if (isLoaded) {
			const GoogleAuth = window.gapi.auth2.getAuthInstance();
			const options = {
				prompt,
			};
			onRequest();
			GoogleAuth.signIn(options).then(
				(res) => handleSigninSuccess(res),
				(err) => onFailure(err),
			);
		}
	}

	useEffect(() => {
		let unmounted = false;
		const onLoadFailure = onScriptLoadFailure || onFailure;
		setIsLoading(true)
		loadScript(
			document,
			'script',
			'google-login',
			jsSrc,
			() => {
				const params = {
					client_id: clientId,
					fetch_basic_profile: fetchBasicProfile,
					ux_mode: uxMode,
					redirect_uri: redirectUri,
				};

				window.gapi.load('auth2', () => {
					const GoogleAuth = window.gapi.auth2.getAuthInstance();
					if (!GoogleAuth) {
						window.gapi.auth2.init(params).then(
							(res) => {
								if (!unmounted) {
									setIsLoaded(true);
									setIsLoading(false)
									const signedIn = isSignedIn && res.isSignedIn.get();
									onAutoLoadFinished(signedIn);
									if (signedIn) {
										handleSigninSuccess(res.currentUser.get());
									}
								}
							},
							(err) => {
								console.log(err);
								setIsLoading(false);
								setIsLoaded(false);
								onAutoLoadFinished(false);
								onLoadFailure(err);
							},
						);
					} else {
						GoogleAuth.then(
							() => {
								if (unmounted) {
									return;
								}
								if (isSignedIn && GoogleAuth.isSignedIn.get()) {
									setIsLoaded(true);
									onAutoLoadFinished(true);
									handleSigninSuccess(GoogleAuth.currentUser.get());
								} else {
									setIsLoaded(true);
									onAutoLoadFinished(false);
								}
							},
							(err) => {
								onFailure(err);
							},
						);
					}
				});
			},
			(err) => {
				onLoadFailure(err);
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

	return { signIn, isLoaded, isLoading, isError };
};
