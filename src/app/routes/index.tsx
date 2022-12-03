import React from 'react';
import { useRoutes } from 'react-router-dom';
import { AUTH_ROUTES } from "shared/config/routes";
import { Login } from 'modules/auth/pages/login/login'

export const AppRoutes: React.FC = () => {
	const routes = useRoutes([
		{
			path: AUTH_ROUTES.LOGIN.path,
			element: <Login />
		},
		{
			path: '*',
			element: <p>Not Found</p>
		},
	])

	return routes
}
