import React, { useContext } from 'react';
import styled from '@emotion/styled/macro';

import { IVideo } from 'shared/types/video';

import { VideoPermissionsEnum } from 'shared/constants/modal-names';

import { Button } from 'shared/components/button/button';
import { Icon } from 'shared/components/icon/icon';
import { ICON_COLLECTION } from 'shared/components/icon/icon-list';
import { Modal, ModalContext } from 'shared/components/modal';
import { Select } from 'shared/components/select/select';
import { SpinnerOverlay } from 'shared/components/spinner-overlay/spinner-overlay';
import { Switch } from 'shared/components/switch/switch';
import { Typography } from 'shared/components/typography/typography';

const ModalContainer = styled.div`
	min-height: 236px;
	display: flex;
	flex-direction: column;

	.MuiBackdrop-root {
		z-index: 1000;
		border-radius: 0 0 10px 10px;
		background-color: ${({ theme }) => theme.palette.common.white};
		opacity: 0.6 !important;
		color: ${({ theme }) => theme.palette.primary.main};
		position: absolute;
	}
`;

const ContentContainer = styled.div`
	position: relative;
	flex-grow: 1;
`;

const ModalContent = styled.div`
	padding: 24px;
	text-align: center;
	font-size: 18px;
	line-height: 30px;
	max-height: 400px;
	overflow: auto;
`;

const StyledButtonIcon = styled(Icon)`
	width: 24px;
	height: 24px;
	margin-left: 4px;
`;

const StyledCopyLinkButton = styled(Button)`
	border-radius: 10px;
`;

interface AccessModalProps {
	video?: IVideo;
	accessOptions: { title: string; value: VideoPermissionsEnum }[];
	isVideoDataLoading: boolean;
	isPermissionsLoading: boolean;
	isCommentsPermissionsLoading: boolean;
	isLinkCopied?: boolean;
	handleCopyLink?: (e) => void;
	handleChangePermissions: (VideoPermissionsEnum) => void;
	handleChangeCommentsPermission: (isComments: boolean) => void;
}

export const AccessSettingsModal: React.FC<AccessModalProps> = ({
	video,
	isLinkCopied,
	accessOptions,
	isVideoDataLoading,
	isPermissionsLoading,
	isCommentsPermissionsLoading,
	handleCopyLink,
	handleChangePermissions,
	handleChangeCommentsPermission,
}) => {
	const modalContext = useContext(ModalContext);

	return (
		<ModalContainer>
			<Modal.Header onClose={modalContext.onClose}>
				<Typography variant="h3">Settings</Typography>
			</Modal.Header>
			<ContentContainer>
				<SpinnerOverlay
					open={
						isVideoDataLoading ||
						isPermissionsLoading ||
						isCommentsPermissionsLoading
					}
				/>
				<ModalContent>
					{!isVideoDataLoading && (
						<Switch
							label="Allow comments"
							value={video?.isComments}
							onChange={handleChangeCommentsPermission}
						/>
					)}
				</ModalContent>
				<Modal.Footer>
					{!isVideoDataLoading && (
						<>
							<Select
								value={video?.viewAccess}
								options={accessOptions}
								onChange={handleChangePermissions}
							/>
							<StyledCopyLinkButton
								label={isLinkCopied ? 'Copied' : 'Copy link'}
								color="secondary"
								variant="outlined"
								endIcon={<StyledButtonIcon icon={ICON_COLLECTION.copy_link} />}
								onClick={handleCopyLink}
							/>
						</>
					)}
				</Modal.Footer>
			</ContentContainer>
		</ModalContainer>
	);
};
