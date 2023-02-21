import React, { useContext } from 'react';
import styled from '@emotion/styled/macro';

import { IVideo } from 'shared/types/video';

import { VideoPermissionsEnum } from 'shared/hooks/use-change-access-settings';

import { Button } from 'shared/components/button/button';
import { Icon } from 'shared/components/icon/icon';
import { ICON_COLLECTION } from 'shared/components/icon/icon-list';
import { Modal, ModalContext } from 'shared/components/modal';
import { Select } from 'shared/components/select/select';
import { Switch } from 'shared/components/switch/switch';
import { Typography } from 'shared/components/typography/typography';

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

interface DeleteVideoModalProps {
	video: IVideo | null;
	accessOptions: { title: string; value: VideoPermissionsEnum }[];
	isLoading: boolean;
	isLinkCopied?: boolean;
	handleCopyLink?: () => void;
	handleChangePermissions: (VideoPermissionsEnum) => void;
}

export const AccessSettingsModal: React.FC<DeleteVideoModalProps> = ({
	video,
	isLinkCopied,
	accessOptions,
	isLoading,
	handleCopyLink,
	handleChangePermissions,
}) => {
	const modalContext = useContext(ModalContext);

	return (
		<>
			<Modal.Header onClose={modalContext.onClose}>
				<Typography variant="h3">Settings</Typography>
			</Modal.Header>
			<ModalContent>
				<Switch label="Allow comments" />
			</ModalContent>
			<Modal.Footer>
				<Select
					value={video?.viewAccess}
					options={accessOptions}
					onChange={handleChangePermissions}
				/>
				<Button
					label={isLinkCopied ? 'Copied' : 'Copy link'}
					color="secondary"
					variant="outlined"
					endIcon={<StyledButtonIcon icon={ICON_COLLECTION.copy_link} />}
					onClick={handleCopyLink}
				/>
			</Modal.Footer>
		</>
	);
};
