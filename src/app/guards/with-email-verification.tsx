import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AUTH_ROUTES } from 'shared/config/routes';
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
		const exceptionPages = [AUTH_ROUTES.VERIFY_EMAIL.path];

		if (exceptionPages.includes(location.pathname)) {
			return <Component {...props} />;
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
			return props.children;
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

		return <Component {...props} />;
	};
};
