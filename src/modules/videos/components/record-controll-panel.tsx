import {ICON_COLLECTION} from "../../../shared/components/icon/icon-list";
import React from "react";
import {Icon} from "../../../shared/components/icon/icon";
import styled from "@emotion/styled/macro";
import {StopWatch} from "./stop-watch";

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



interface IRecordControlPanel {
	stopRecording: () => void,
	resumeRecording: () => void,
	pauseRecording: () => void,
	resetRecording: () => void,
	toggleMicrophone: () => void,
	isMuted: boolean,
	isPaused: boolean
}

const RecordControlPanelComponent: React.FC<IRecordControlPanel> = ({
																																			stopRecording,
																																			resumeRecording,
																																			pauseRecording,
																																			resetRecording,
																																			toggleMicrophone,
																																			isMuted,
																																			isPaused,
																																		}) => {
	return (
		<>
			<ControllerButton onClick={stopRecording}><Icon icon={ICON_COLLECTION.stop}/></ControllerButton>
			{
				isPaused ?
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
				{isMuted ?
					<Icon icon={ICON_COLLECTION.microphone}/> :
					<Icon icon={ICON_COLLECTION.microphone_off}/>
				}
			</ControllerButton>
			<StopWatch/>
		</>
	);
}
export const RecordControlPanel = React.memo(RecordControlPanelComponent)
