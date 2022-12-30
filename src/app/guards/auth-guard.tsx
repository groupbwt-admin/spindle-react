import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AUTH_ROUTES, VIDEO_ROUTES } from 'shared/config/routes';
import { selectIsLoggedIn } from 'app/store/auth/selects';
import { withEmailVerification } from 'app/guards/with-email-verification';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const AuthGuard: React.FC<React.PropsWithChildren> =
	withEmailVerification(({ children }) => {
		const isUserAuth = selectIsLoggedIn();
		const location = useLocation();
		const routerState = location.state as { from?: string };

		const exceptionPages = [AUTH_ROUTES.VERIFY_EMAIL.path];
		const isAuthPage = location.pathname.startsWith(AUTH_ROUTES.ROOT.path);

		if (exceptionPages.includes(location.pathname)) {
			return children;
		}

		if (!isUserAuth && !isAuthPage) {
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
				<Navigate
					to={routerState?.from || VIDEO_ROUTES.MY_VIDEOS.path}
					replace
				/>
			);
		}

		return children || null;
	});
