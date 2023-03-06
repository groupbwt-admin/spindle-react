import { generatePath } from 'react-router-dom';

export const AUTH_ROUTES = {
	ROOT: {
		path: '/auth',
	},
	EMAIL_ROOT: {
		path: '/auth/email',
	},
	LOGIN: {
		path: '/auth/login',
	},
	REGISTER: {
		path: '/auth/registration',
	},
	FORGOT_PASSWORD: {
		path: '/auth/reset-password',
	},
	NEW_PASSWORD: {
		path: '/auth/change-password',
	},
	SET_UP_PROFILE: {
		path: '/auth/fill-account',
	},
	MUST_VERIFY_EMAIL: {
		path: '/auth/email/must-verify',
	},
	VERIFY_EMAIL: {
		path: '/auth/email/verify',
	},
};

export const VIDEO_ROUTES = {
	MY_VIDEOS: {
		title: 'My videos',
		path: '/',
	},
	VIDEO: {
		path: '/videos/:id',
		generate: (id: string) => generatePath('/videos/:id', { id }),
		generateExternalPath: (id: string) =>
			window.location.origin + generatePath('/videos/:id', { id }),
	},
	SEARCH: {
		title: 'Search',
		path: '/search',
	},
};

export const USER_ROUTES = {
	MY_PROFILE: {
		title: 'My profile',
		path: '/profile',
	},
	USER: {
		title: 'Back to user',
		path: '/users/:id',
		generate: (id: string) => generatePath('/users/:id', { id }),
		generateExternalPath: (id: string) =>
			window.location.origin + generatePath('/users/:id', { id }),
	},
};
