import * as React from 'react';
import {styled} from '@mui/material/styles';
import {Container} from '@mui/material';
import {AppMenu} from 'shared/layout/components/app-menu';
import {Button} from "../components/button/button";
import {ReactComponent as IconRecord} from 'shared/components/icon/collection/record.svg';
import {RECORDING_STATUS} from "../constants/record-statuses";
import {Countdown} from "../../modules/videos/countdown";
import {useRecording} from "../../modules/videos/hooks/use-recording";
import {RecordController} from "../../modules/videos/components/record-controller";
import {useState} from "react";

const MainLayoutContainer = styled(Container)`
	display: flex;
	height: 100vh;
`;

const Main = styled('main')`
	flex-grow: 1;
	padding: 24px 32px;
`;

const RecordButton = styled(Button)`
	max-width: 190px;
	color: #ffffff;
	position: fixed;
	top: 24px;
	right: 32px;
`;
export const MainLayout: React.FC<React.PropsWithChildren> = ({children}) => {
	const {
		models,
		command
	} = useRecording();



	return (
		<MainLayoutContainer disableGutters maxWidth={false}>
			{(models.recordStatus === RECORDING_STATUS.permission_requested || models.recordStatus === RECORDING_STATUS.stopped) &&
				<RecordButton label="Start Recording" startIcon={<IconRecord/>} onClick={command.startRecording}/>}
			<RecordController models={models} command={command}/>
			{(models.recordStatus === RECORDING_STATUS.idle ) && <Countdown count={models.counterBeforeStart} resetRecording = {command.prevCancelStream}/>}
			<AppMenu/>
			<Main>{children}</Main>
		</MainLayoutContainer>
	);
};
