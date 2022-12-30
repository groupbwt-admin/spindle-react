import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AUTH_ROUTES } from 'shared/config/routes';
import { selectUserData } from 'app/store/user/selects';
import { selectIsLoggedIn } from 'app/store/auth/selects';

export const withSetupProfile = (Component) => {
	// eslint-disable-next-line react/display-name
	return (props: React.PropsWithChildren) => {
		Component.displayName = 'WrappedByWithSetupProfile';

		const location = useLocation();
		const isLoggedIn = selectIsLoggedIn();
		const userData = selectUserData();
		const isSetupProfilePage =
			location.pathname === AUTH_ROUTES.SET_UP_PROFILE.path;

		if (
			isLoggedIn &&
			userData &&
			!userData.firstName &&
			!userData.lastName &&
			!isSetupProfilePage
		) {
			return <Navigate to={AUTH_ROUTES.SET_UP_PROFILE.path} replace />;
		}

		return <Component {...props} />;
	};
};
