import React from 'react';
import { RouteObject } from 'react-router-dom';
import { VIDEO_ROUTES } from 'shared/config/routes';
import loadable from '@loadable/component';
import { AuthGuard } from 'app/guards/auth-guard';
import { ProfilePage } from 'modules/user/pages/profile/profile';

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
		element: <VideoPage />,
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
