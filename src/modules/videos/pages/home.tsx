import * as React from 'react';
import { Typography } from 'shared/components/typography/typography';
import styled from '@emotion/styled/macro';
import { Button } from 'shared/components/button/button';
import { ReactComponent as IconRecord } from 'shared/components/icon/collection/record.svg';
import { TabsList } from 'shared/components/tabs/tabs-list';
import { Tab } from 'shared/components/tabs/tab';
import {useRecording} from '../hooks/useRecording'

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
	const videoR: any = React.useRef(null);

	const {
		timeRecording,
		pauseRecording,
		resetRecording,
		resumeRecording,
		startRecording,
		status,
		chunks,
		stopRecording,
	} = useRecording({audio: false});

	const watchVideo = () => {
		const blob = new Blob(chunks, {'type': 'video/mp4'});
		videoR.current.src = URL.createObjectURL(blob);
		videoR.current.load();
		videoR.current.onloadeddata = function () {
			videoR.current.play();
		}
	}

	return (
		<>
			<HeaderContainer>
				<Title variant="h1">My videos</Title>
				<RecordButton label="Start Recording" startIcon={<IconRecord />} />
			</HeaderContainer>
			<ContentContainer>
				<TabsList value={value} handleChange={handleChange}>
					<Tab label="My videos" />
					<Tab label="Shared videos" />
					<Tab label="All videos" />
				</TabsList>
				<div>
					<p>Status: {status}</p>
					<p>Time: {timeRecording}</p>
					<button onClick={startRecording}>Start Recording</button>
					<button onClick={stopRecording}>Stop Recording</button>
					<button onClick={pauseRecording}>Pause Recording</button>
					<button onClick={resumeRecording}>Resume Recording</button>
					<button onClick={resetRecording}>Reset Recording</button>
					<button onClick={watchVideo}>watchVideo</button>
				</div>
				<video src="" ref={videoR}></video>
			</ContentContainer>
		</>
	);
};
