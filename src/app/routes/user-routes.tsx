import React from 'react';
import { RouteObject } from 'react-router-dom';
import loadable from '@loadable/component';
import { AuthGuard } from 'app/guards/auth-guard';

import { USER_ROUTES } from 'shared/config/routes';

const UserPage = loadable(
	() => import('modules/user/pages/user-profile/user-profile'),
	{
		resolveComponent: (components) => components.UserProfilePage,
	},
);

const MyProfile = loadable(
	() => import('modules/user/pages/my-profile/my-profile'),
	{
		resolveComponent: (components) => components.HomePage,
	},
);

export const userRoutes: RouteObject[] = [
	{
		path: USER_ROUTES.USER.path,
		element: (
			<AuthGuard>
				<UserPage />
			</AuthGuard>
		),
	},
	{
		path: USER_ROUTES.MY_PROFILE.path,
		element: (
			<AuthGuard>
				<MyProfile />
			</AuthGuard>
		),
	},
];
