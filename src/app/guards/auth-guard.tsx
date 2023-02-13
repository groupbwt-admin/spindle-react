import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { withEmailVerification } from 'app/guards/with-email-verification';
import { withSetupProfile } from 'app/guards/with-setup-profile';

import { selectIsLoggedIn } from 'app/store/auth/selects';

import { AUTH_ROUTES, VIDEO_ROUTES } from 'shared/config/routes';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const AuthGuard: React.FC<React.PropsWithChildren> =
	withEmailVerification(
		withSetupProfile(({ children }) => {
			const isUserAuth = selectIsLoggedIn();
			const location = useLocation();
			const routerState = location.state as { from?: string };

			const isAuthPage =
				location.pathname.startsWith(AUTH_ROUTES.ROOT.path) &&
				!location.pathname.startsWith(AUTH_ROUTES.SET_UP_PROFILE.path) &&
				!location.pathname.startsWith(AUTH_ROUTES.EMAIL_ROOT.path);

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
		}),
	);
