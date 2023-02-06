import React, {memo, useCallback, useEffect, useState} from 'react';
import styled from "@emotion/styled/macro";
import {Icon} from "shared/components/icon/icon";
import {ICON_COLLECTION} from "shared/components/icon/icon-list";
import {RECORDING_STATUS} from "shared/constants/record-statuses";
import {StopWatch} from "./stop-watch";
import {socketState} from "app/store/record-socket/state";
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
	const {
		models,
		command
	} = useRecording();
	const status = selectStatus()

	const startRecording = useCallback(
		() => {
			command.startRecording()
		},
		[],
	);
	useEffect(() => {
		EventBus.on(RECORDING_EVENTS.start, startRecording);
		return () => {
			EventBus.off(RECORDING_EVENTS.start, startRecording);
		};
	}, []);

	return (
		<>
			<ControllerButton onClick={command.stopRecording}><Icon icon={ICON_COLLECTION.stop}/></ControllerButton>
			{
				status == RECORDING_STATUS.paused ?
					<ControllerButton
						onClick={command.resumeRecording}>
						<Icon
							icon={ICON_COLLECTION.resume}/>
					</ControllerButton> :
					<ControllerButton
						onClick={command.pauseRecording}>
						<Icon
							icon={ICON_COLLECTION.pause}/>
					</ControllerButton>
			}
			<ControllerButton onClick={command.resetRecording}><Icon icon={ICON_COLLECTION.reset}/></ControllerButton>
			<ControllerButton onClick={command.toggleMicrophone}>
				{models.isMicrophoneOn ?
					<Icon icon={ICON_COLLECTION.microphone}/> :
					<Icon icon={ICON_COLLECTION.microphone_off}/>
				}
			</ControllerButton>
		</>
	);
};
export const Controller = memo(ControllerComponent)

