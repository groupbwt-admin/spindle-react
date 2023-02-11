import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { selectIsLoggedIn } from 'app/store/auth/selects';
import { selectUserData } from 'app/store/user/selects';

import { AUTH_ROUTES, VIDEO_ROUTES } from 'shared/config/routes';

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

		if (
			isLoggedIn &&
			userData &&
			isSetupProfilePage &&
			(userData.firstName || userData.lastName)
		) {
			return (
				<Navigate
					to={
						location.state?.from
							? location.state.from
							: VIDEO_ROUTES.MY_VIDEOS.path
					}
					replace
				/>
			);
		}

		return <Component {...props} />;
	};
};
