import React, { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { selectIsLoggedIn } from 'app/store/auth/selects';
import { MainLayout } from 'shared/layout/main-layout';
import { userState } from 'app/store/user/state';
import { selectIsLoadingUserData } from 'app/store/user/selects';

const SpinnerContainer = styled('div')`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100vh;
`;

export const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
	const isUserAuth = selectIsLoggedIn();
	const isLoadingUserData = selectIsLoadingUserData();

	useEffect(() => {
		if (isUserAuth) {
			userState.getProfile();
		}
	}, [isUserAuth]);

	if (isLoadingUserData) {
		return (
			<SpinnerContainer>
				<CircularProgress />
			</SpinnerContainer>
		);
	}

	if (isUserAuth) {
		return <MainLayout>{children}</MainLayout>;
	}

	return <>{children}</>;
};
