import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AUTH_ROUTES, VIDEO_ROUTES } from 'shared/config/routes';
import { selectAuthUserData, selectIsLoggedIn } from 'app/store/auth/selects';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const AuthGuard: React.FC<React.PropsWithChildren> = ({ children }) => {
	const isUserAuth = selectIsLoggedIn();
	const userData = selectAuthUserData();
	const location = useLocation();
	const routerState = location.state as { from?: string };

	const isMustVerifyEmailPage =
		location.pathname === AUTH_ROUTES.MUST_VERIFY_EMAIL.path;

	const isAuthPage = location.pathname.startsWith(AUTH_ROUTES.ROOT.path);

	if (!isUserAuth && !isAuthPage) {
		return (
			<Navigate
				to={AUTH_ROUTES.LOGIN.path}
				state={{ from: location }}
				replace
			/>
		);
	}

	if (isUserAuth && !userData!.isEmailConfirmed && !isMustVerifyEmailPage) {
		return (
			<Navigate
				to={AUTH_ROUTES.MUST_VERIFY_EMAIL.path}
				state={{ from: location }}
				replace
			/>
		);
	}

	if (isUserAuth && !userData!.isEmailConfirmed && isMustVerifyEmailPage) {
		return children;
	}

	if (!isUserAuth && isMustVerifyEmailPage) {
		return (
			<Navigate
				to={AUTH_ROUTES.LOGIN.path}
				state={{ from: location }}
				replace
			/>
		);
	}

	if (isUserAuth && isAuthPage) {
		return (
			<Navigate to={routerState?.from || VIDEO_ROUTES.MY_VIDEOS.path} replace />
		);
	}

	return children || null;
};
