import * as React from 'react';
import { useRoutes } from 'react-router-dom';
import { VIDEO_ROUTES } from 'shared/config/routes';
import { AuthGuard } from 'app/guards/auth-guard';
import { HomePage } from 'modules/videos/pages/home';
import { authRoutes } from 'app/routes/auth-routes';

export const AppRoutes: React.FC = () => {
	const routes = useRoutes([
		...authRoutes,

		{
			path: VIDEO_ROUTES.MY_VIDEOS.path,
			element: (
				<AuthGuard>
					<HomePage />
				</AuthGuard>
			),
		},

		{
			path: '*',
			element: <p>Not Found</p>,
		},
	]);

	return routes;
};
