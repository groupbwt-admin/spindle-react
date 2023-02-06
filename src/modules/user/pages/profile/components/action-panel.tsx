import styled from "@emotion/styled";
import {ICON_COLLECTION} from "shared/components/icon/icon-list";
import React from "react";
import {Icon} from "shared/components/icon/icon";
import {Button} from "shared/components/button/button";
import {IconButton} from "shared/components/button/icon-button";
import {Typography} from "shared/components/typography/typography";

const ActionPanelContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: ${({theme}) => theme.palette.primary.main};
	color: ${({theme}) => theme.palette.common.white};
	border-radius: 10px;
	padding: 11px 32px;
	width: 483px;
`

const ActionsContainer = styled.div`
	display: flex;
	gap: 10px;

	svg {
		path {
			stroke: ${({theme}) => theme.palette.common.white};
		}
	}
`

const SelectedCount = styled(Typography)`
	font-weight: 600;
	white-space: nowrap;
`

const StyledButton = styled(Button)`
	font-size: 18px;
	font-weight: 400;
`

interface ActionPanelProps {
	className?: string;
	selectedCount: number;
	cancelSelection: () => void;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({className, selectedCount, cancelSelection}) => {
	return <ActionPanelContainer className={className}>
		<SelectedCount variant='h3'>
			{selectedCount} video selected
		</SelectedCount>
		<ActionsContainer>
			<IconButton>
				<Icon icon={ICON_COLLECTION.copy_link}/>
			</IconButton>
			<IconButton>
				<Icon icon={ICON_COLLECTION.download}/>
			</IconButton>
			<IconButton>
				<Icon icon={ICON_COLLECTION.delete}/>
			</IconButton>
		</ActionsContainer>
		<StyledButton label="Cancel" size='small' onClick={cancelSelection}/>
	</ActionPanelContainer>
}
