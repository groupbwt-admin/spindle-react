import React from 'react';
import { RouteObject } from 'react-router-dom';
import loadable from '@loadable/component';
import { AuthGuard } from 'app/guards/auth-guard';
import { ProfilePage } from 'modules/user/pages/profile/profile';

import { VIDEO_ROUTES } from 'shared/config/routes';

import { ErrorBoundary } from 'shared/components/error-boundary/error-boundary';

const VideoPage = loadable(
	() => import('modules/videos/pages/video/video-page'),
	{
		resolveComponent: (components) => components.VideoPage,
	},
);

const HomePage = loadable(() => import('modules/videos/pages/home'), {
	resolveComponent: (components) => components.HomePage,
});

export const videoRoutes: RouteObject[] = [
	{
		path: VIDEO_ROUTES.VIDEO.path,
		element: (
			<ErrorBoundary>
				<VideoPage />
			</ErrorBoundary>
		),
	},
	{
		path: VIDEO_ROUTES.MY_VIDEOS.path,
		element: (
			<AuthGuard>
				<HomePage />
			</AuthGuard>
		),
	},
	{
		path: VIDEO_ROUTES.PROFILE.path,
		element: (
			<AuthGuard>
				<ProfilePage />
			</AuthGuard>
		),
	},
];
