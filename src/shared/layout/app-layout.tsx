import { useEffect } from 'react';
import * as React from 'react';
import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
	selectIsLoggedIn,
} from 'app/store/auth/selects';
import { MainLayout } from 'shared/layout/main-layout';
import { userState } from 'app/store/user/state';
import { selectUserData} from 'app/store/user/selects';
import { useLocation } from 'react-router-dom';
import { AUTH_ROUTES } from 'shared/config/routes';

const SpinnerContainer = styled('div')`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100vh;
`;

export const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
	const location = useLocation();
	const isUserAuth = selectIsLoggedIn();
	const user = selectUserData();
	const isAuthLayout = location.pathname.startsWith(AUTH_ROUTES.ROOT.path);

	useEffect(() => {
		if (isUserAuth) {
			userState.getProfile();
		}
	}, [isUserAuth]);

	if (!user) {
		return (
			<SpinnerContainer>
				<CircularProgress />
			</SpinnerContainer>
		);
	}

	if (!isAuthLayout) {
		return <MainLayout>{children}</MainLayout>;
	}

	return <>{children}</>;
};
