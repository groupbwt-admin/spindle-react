import React, {useCallback, useEffect,} from 'react';
import styled from "@emotion/styled/macro";
import {Icon} from "shared/components/icon/icon";
import {ICON_COLLECTION} from "shared/components/icon/icon-list";
import {RECORDING_STATUS} from "shared/constants/record-statuses";
import {selectStatus} from "../../../app/store/record-socket/selects";
import {useRecording} from "../hooks/use-recording";
import {EventBus, RECORDING_EVENTS} from "../../../shared/utils/event-bus";


const ControllerButton = styled.button`
	background: transparent;
	padding: 12px 4px;
	border: 1px solid transparent;
	cursor: pointer;
	transition: all 0.1s ease-out;

	&:hover {
		border: 1px solid #fff;
	}
`;
const ControllerComponent = () => {
	const status = selectStatus()
	const {
		models,
		command: {
			startRecording,
			stopRecording,
			resumeRecording,
			pauseRecording,
			resetRecording,
			toggleMicrophone,
		}
	} = useRecording();

	const onStartRecording = useCallback(
		() => {
			startRecording()
		},
		[],
	);
	useEffect(() => {
		EventBus.on(RECORDING_EVENTS.start, onStartRecording);
		return () => {
			EventBus.off(RECORDING_EVENTS.start, onStartRecording);
		};
	}, []);
	return (
		<>
			<ControllerButton onClick={stopRecording}><Icon icon={ICON_COLLECTION.stop}/></ControllerButton>
			{
				status == RECORDING_STATUS.paused ?
					<ControllerButton
						onClick={resumeRecording}>
						<Icon
							icon={ICON_COLLECTION.resume}/>
					</ControllerButton> :
					<ControllerButton
						onClick={pauseRecording}>
						<Icon
							icon={ICON_COLLECTION.pause}/>
					</ControllerButton>
			}
			<ControllerButton onClick={resetRecording}><Icon icon={ICON_COLLECTION.reset}/></ControllerButton>
			<ControllerButton onClick={toggleMicrophone}>
				{models.isMicrophoneOn ?
					<Icon icon={ICON_COLLECTION.microphone}/> :
					<Icon icon={ICON_COLLECTION.microphone_off}/>
				}
			</ControllerButton>
		</>
	);
}

export const Controller = React.memo(ControllerComponent)

