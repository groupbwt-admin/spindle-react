import React from 'react';
import { useRoutes } from 'react-router-dom';
import { AUTH_ROUTES, VIDEO_ROUTES } from 'shared/config/routes';
import { AuthGuard } from 'app/auth-guard';
import { LoginPage } from 'modules/auth/pages/login/login';
import { RegisterPage } from 'modules/auth/pages/register/register';
import { ForgotPasswordPage } from 'modules/auth/pages/forgot-password/forgot-password';
import { AuthPage } from 'modules/auth/pages/auth';
import { NewPasswordPage } from 'modules/auth/pages/new-password/new-password';
import { SetUpProfilePage } from 'modules/auth/pages/set-up-profile/set-up-profile';
import { VerifyEmailPage } from 'modules/auth/pages/verify-email/verify-email';
import { HomePage } from 'modules/videos/pages/home';
import { MustVerifyEmailPage } from 'modules/auth/pages/must-verify-email/must-verify-email';

export const AppRoutes: React.FC = () => {
	const routes = useRoutes([
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
