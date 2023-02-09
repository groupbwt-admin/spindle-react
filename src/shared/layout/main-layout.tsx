import * as React from 'react';
import {styled} from '@mui/material/styles';
import {Container} from '@mui/material';
import {AppMenu} from 'shared/layout/components/app-menu';
import {useControlVideo} from "../../modules/videos/hooks/use-record-video";
import {RecordContext} from "../../modules/videos/context/recordContext";

const MainLayoutContainer = styled(Container)`
	display: flex;
	height: 100vh;
`;

const Main = styled('main')`
	flex-grow: 1;
	padding: 24px 32px;
`;


export const MainLayout: React.FC<React.PropsWithChildren> = ({children}) => {
	const {models: {recordWidget}, commands: {startRecording}} = useControlVideo()

	return (
		<RecordContext.Provider value={{isShow: true, startRecording: startRecording}}>
			<MainLayoutContainer disableGutters maxWidth={false}>
				{recordWidget}
				<AppMenu/>
				<Main>
					{children}
				</Main>
			</MainLayoutContainer>
		</RecordContext.Provider>
	);
};
