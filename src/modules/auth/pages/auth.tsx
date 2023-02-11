import * as React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { AuthLayout } from 'modules/auth/components/layout';

import { AUTH_ROUTES } from 'shared/config/routes';

const layoutProps = {
	[AUTH_ROUTES.LOGIN.path]: {
		title: 'Sign in to Spindle',
	},
	[AUTH_ROUTES.REGISTER.path]: {
		title: 'Sign up to Spindle',
	},
	[AUTH_ROUTES.FORGOT_PASSWORD.path]: {
		title: 'Forgot your password?',
		description:
			'Enter your registered email address and we’ll send you a link to reset your password.',
	},
	[AUTH_ROUTES.NEW_PASSWORD.path]: {
		title: 'Create new password',
		description:
			'Your new password must be different from previously used passwords.',
	},
	[AUTH_ROUTES.SET_UP_PROFILE.path]: {
		title: 'Set up your profile',
	},
};

export const AuthPage: React.FC = () => {
	const location = useLocation();

	return (
		<AuthLayout {...layoutProps[location.pathname]}>
			<Outlet />
		</AuthLayout>
	);
};
