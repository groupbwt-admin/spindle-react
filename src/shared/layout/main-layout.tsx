import React from "react";
import {styled} from "@mui/material/styles";
import {Container} from "@mui/material";
import {AppMenu} from "shared/layout/components/app-menu";

const MainLayoutContainer = styled(Container)`
	display: flex;
	height: 100vh;
`

const Main = styled('main')`
	flex-grow: 1;
	padding: 24px 32px;
`

export const MainLayout: React.FC<React.PropsWithChildren> = ({children}) => {
	return <MainLayoutContainer disableGutters maxWidth={false}>
		<AppMenu/>
		<Main>
			{children}
		</Main>
	</MainLayoutContainer>
}
