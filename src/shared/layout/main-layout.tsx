import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import { AppMenu } from 'shared/layout/components/app-menu';
import { useQuery } from 'react-query';
import { UserApi } from 'app/api/user-api/user-api';
import { setAuthUserData } from 'app/store/auth/actions';

const MainLayoutContainer = styled(Container)`
	display: flex;
	height: 100vh;
`;

const Main = styled('main')`
	flex-grow: 1;
	padding: 24px 32px;
`;

export const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
	const userQuery = useQuery('userData', UserApi.getProfile);

	useEffect(() => {
		if (userQuery.isSuccess) setAuthUserData(userQuery.data);
	}, [userQuery.isSuccess]);

	return (
		<MainLayoutContainer disableGutters maxWidth={false}>
			<AppMenu />
			<Main>{children}</Main>
		</MainLayoutContainer>
	);
};
