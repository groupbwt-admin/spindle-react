import * as React from 'react';
import {Typography} from 'shared/components/typography/typography';
import styled from '@emotion/styled/macro';
import {Button} from 'shared/components/button/button';
import {ReactComponent as IconRecord} from 'shared/components/icon/collection/record.svg';
import {TabsList} from 'shared/components/tabs/tabs-list';
import {Tab} from 'shared/components/tabs/tab';
import {useRecording} from '../hooks/use-recording'

const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const ContentContainer = styled.div``;

const Title = styled(Typography)`
	flex-shrink: 0;
`;

const RecordButton = styled(Button)`
	max-width: 190px;
	color: #ffffff;
`;

export const HomePage = () => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const {
		models: {timeRecording, recordStatus, isMicrophoneOn},
		command: {
			toggleMicrophone,
			pauseRecording,
			resetRecording,
			resumeRecording,
			startRecording, stopRecording
		},
	} = useRecording();

	return (
		<>
			<HeaderContainer>
				<Title variant="h1">My videos</Title>
				<RecordButton label="Start Recording" startIcon={<IconRecord/>}/>
			</HeaderContainer>
			<ContentContainer>
				<TabsList value={value} handleChange={handleChange}>
					<Tab label="My videos"/>
					<Tab label="Shared videos"/>
					<Tab label="All videos"/>
				</TabsList>
				<div>
					<p>Status: {recordStatus}</p>
					<p>Time: {timeRecording}</p>
					<button onClick={startRecording}>Start Recording</button>
					<button onClick={stopRecording}>Stop Recording</button>
					<button onClick={pauseRecording}>Pause Recording</button>
					<button onClick={resumeRecording}>Resume Recording</button>
					<button onClick={resetRecording}>Reset Recording</button>
					<button onClick={() => toggleMicrophone(!isMicrophoneOn)}>toggleMicrophone
						+ {isMicrophoneOn ? 'true' : 'false'}</button>
				</div>
			</ContentContainer>
		</>
	);
};
