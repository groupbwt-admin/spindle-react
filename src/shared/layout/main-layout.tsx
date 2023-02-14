import * as React from 'react';
import {AppMenu} from 'shared/layout/components/app-menu';

import {Container} from '@mui/material';
import {styled} from '@mui/material/styles';

import {RecordContext} from "../../modules/videos/context/record-context";
import {useControlVideo} from "../../modules/videos/hooks/use-record-video";

const MainLayoutContainer = styled(Container)`
	display: flex;
	height: 100vh;
	overflow: hidden;
`;

const Main = styled('main')`
	flex-grow: 1;
	padding: 24px 32px;
	overflow-y: auto;
`;


export const MainLayout: React.FC<React.PropsWithChildren> = ({children}) => {
	const {models: {recordWidget}, commands: {startRecording}} = useControlVideo()

	return (
		<RecordContext.Provider value={{isShow: true, startRecording: startRecording}}>
			<MainLayoutContainer disableGutters maxWidth={false} id="drag-container">
				{recordWidget}
				<AppMenu/>
				<Main>
					{children}
				</Main>
			</MainLayoutContainer>
		</RecordContext.Provider>
	);
};
