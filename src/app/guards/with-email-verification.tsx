import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AUTH_ROUTES, VIDEO_ROUTES } from 'shared/config/routes';
import { selectAuthUserData, selectIsLoggedIn } from 'app/store/auth/selects';

export const withEmailVerification = (Component) => {
	// eslint-disable-next-line react/display-name
	return (props: React.PropsWithChildren) => {
		Component.displayName = 'WrappedByWithEmailVerification';

		const location = useLocation();
		const isUserAuth = selectIsLoggedIn();
		const userData = selectAuthUserData();
		const isMustVerifyEmailPage =
			location.pathname === AUTH_ROUTES.MUST_VERIFY_EMAIL.path;
		const isEmailPage = location.pathname.startsWith(
			AUTH_ROUTES.EMAIL_ROOT.path,
		);

		if (isUserAuth && userData!.isEmailConfirmed && isEmailPage) {
			return <Navigate to={VIDEO_ROUTES.MY_VIDEOS.path} replace />;
		}

		if (isUserAuth && !userData!.isEmailConfirmed && !isEmailPage) {
			return (
				<Navigate
					to={
						location.state?.from?.pathname?.startsWith(
							AUTH_ROUTES.EMAIL_ROOT.path,
						)
							? location.state.from
							: AUTH_ROUTES.MUST_VERIFY_EMAIL.path
					}
					replace
				/>
			);
		}

		if (isUserAuth && !userData!.isEmailConfirmed && isMustVerifyEmailPage) {
			return props.children;
		}

		return <Component {...props} />;
	};
};
