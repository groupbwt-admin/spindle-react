import * as React from 'react';
import { useRoutes } from 'react-router-dom';

import { authRoutes } from 'app/routes/auth-routes';
import { videoRoutes } from 'app/routes/video-routes';

export const AppRoutes: React.FC = () => {
	const routes = useRoutes([
		...authRoutes,
		...videoRoutes,
		{
			path: '*',
			element: <p>Not Found</p>,
		},
	]);

	return routes;
};
