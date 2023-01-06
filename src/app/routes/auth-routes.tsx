import * as React from 'react';
import loadable from '@loadable/component';
import { AUTH_ROUTES } from 'shared/config/routes';
import { AuthGuard } from 'app/guards/auth-guard';

const AuthPage = loadable(() => import('modules/auth/pages/auth'), {
	resolveComponent: (components) => components.AuthPage,
});

const LoginPage = loadable(() => import('modules/auth/pages/login/login'), {
	resolveComponent: (components) => components.LoginPage,
});

const RegisterPage = loadable(
	() => import('modules/auth/pages/register/register'),
	{
		resolveComponent: (components) => components.RegisterPage,
	},
);

const ForgotPasswordPage = loadable(
	() => import('modules/auth/pages/forgot-password/forgot-password'),
	{
		resolveComponent: (components) => components.ForgotPasswordPage,
	},
);

const NewPasswordPage = loadable(
	() => import('modules/auth/pages/new-password/new-password'),
	{
		resolveComponent: (components) => components.NewPasswordPage,
	},
);

const SetUpProfilePage = loadable(
	() => import('modules/auth/pages/set-up-profile/set-up-profile'),
	{
		resolveComponent: (components) => components.SetUpProfilePage,
	},
);

const VerifyEmailPage = loadable(
	() => import('modules/auth/pages/verify-email/verify-email'),
	{
		resolveComponent: (components) => components.VerifyEmailPage,
	},
);

const MustVerifyEmailPage = loadable(
	() => import('modules/auth/pages/must-verify-email/must-verify-email'),
	{
		resolveComponent: (components) => components.MustVerifyEmailPage,
	},
);

export const authRoutes = [
	{
		path: AUTH_ROUTES.ROOT.path,
		element: (
			<AuthGuard>
				<AuthPage />
			</AuthGuard>
		),
		children: [
			{
				path: AUTH_ROUTES.LOGIN.path,
				element: <LoginPage />,
			},
			{
				path: AUTH_ROUTES.REGISTER.path,
				element: <RegisterPage />,
			},
			{
				path: AUTH_ROUTES.FORGOT_PASSWORD.path,
				element: <ForgotPasswordPage />,
			},
			{
				path: AUTH_ROUTES.NEW_PASSWORD.path,
				element: <NewPasswordPage />,
			},
			{
				path: AUTH_ROUTES.SET_UP_PROFILE.path,
				element: <SetUpProfilePage />,
			},
			{
				path: AUTH_ROUTES.VERIFY_EMAIL.path,
				element: <VerifyEmailPage />,
			},
			{
				path: AUTH_ROUTES.MUST_VERIFY_EMAIL.path,
				element: <MustVerifyEmailPage />,
			},
		],
	},
];
