import React from "react";
import {MainLayout} from "shared/layout/main-layout";
import {Typography} from "shared/components/typography/typography";
import styled from "@emotion/styled/macro";
import {Button} from "shared/components/button/button";
import {ReactComponent as IconRecord} from "shared/components/icon/collection/record.svg";
import {TabsList} from "shared/components/tabs/tabs-list";
import {Tab} from "shared/components/tabs/tab";
///recording
import VideoJSComponent from '../components/VideoJSComponent'


const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
`

const ContentContainer = styled.div`
`

const Title = styled(Typography)`
	flex-shrink: 0;
`

const RecordButton = styled(Button)`
	max-width: 190px;
	color: #FFFFFF;
`

export const HomePage = () => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};
	/////// recording example
	const playerRef = React.useRef(null);

	const videoJsOptions = {
		controls: true,
		bigPlayButton: false,
		width: 320,
		height: 240,
		fluid: false,
		plugins: {
			record: {
				screen: true,
				audio: true,
				maxLength: 10,
				debug: true,

			}
		}
	};

	const handlePlayerReady = (player: any) => {
		playerRef.current = player;

		player.on('deviceReady', () => {
			console.log('device is ready!');
		});

		player.on('startRecord', () => {
			console.log('started recording!');
		});

		player.on('finishRecord', () => {
			console.log('finished recording: ', player.recordedData);
		});

		player.on('error', (element, error) => {
			console.warn(error);
		});

		player.on('deviceError', () => {
			console.error('device error:', player.deviceErrorCode);
		});
	};

	return <MainLayout>
		<HeaderContainer>
			<Title variant="h1">
				My videos
			</Title>
			<RecordButton label="Start Recording" startIcon={<IconRecord/>}/>
		</HeaderContainer>
		<ContentContainer>
			<TabsList value={value} handleChange={handleChange}>
				<Tab label='My videos'/>
				<Tab label='Shared videos'/>
				<Tab label='All videos'/>
			</TabsList>
		</ContentContainer>
		<div>Rest of app here</div>
		<VideoJSComponent options={videoJsOptions} onReady={handlePlayerReady}/>
		<div>Rest of app here</div>
	</MainLayout>
}
