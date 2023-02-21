import { useState } from 'react';
import { useMutation } from 'react-query';

import { IVideo } from 'shared/types/video';

import { VideoApi } from 'app/api/video-api/video-api';

import { Modal } from 'shared/components/modal';
import { AccessSettingsModal } from 'shared/components/video/modals/access-settings-modal';

export enum VideoPermissionsEnum {
	ONLY_ME = 'ONLY ME',
	AUTHENTICATE_USER = 'AUTHENTICATE USER',
	ANYONE_WITH_LINK = 'ANYONE WITH LINK',
}

const VIDEO_PERMISSIONS_OPTIONS = [
	{ title: 'Only you can view', value: VideoPermissionsEnum.ONLY_ME },
	{
		title: 'All authenticated users can view',
		value: VideoPermissionsEnum.AUTHENTICATE_USER,
	},
	{
		title: 'Anyone with the link can view',
		value: VideoPermissionsEnum.ANYONE_WITH_LINK,
	},
];

export function useChangeAccessSettings({ onSettingsChanged }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [video, setVideo] = useState<IVideo | null>(null);

	const changePermissionsMutation = useMutation(async (viewAccess) => {
		const res = await VideoApi.changeVideoPermissions({
			id: video?.id,
			viewAccess,
		});
		await onSettingsChanged();
		return res;
	});

	const handleClose = () => setIsModalOpen(false);

	const startChangeSettings = (video) => {
		setVideo(video);
		setIsModalOpen(true);
	};

	const handleChangePermissions = async (viewAccess) => {
		const res = await changePermissionsMutation.mutateAsync(viewAccess);
		setVideo(res);
		return;
	};

	const modal = (
		<Modal.Root
			open={isModalOpen}
			onClose={handleClose}
			isClosable={!changePermissionsMutation.isLoading}
		>
			<AccessSettingsModal
				accessOptions={VIDEO_PERMISSIONS_OPTIONS}
				video={video}
				isLoading={changePermissionsMutation.isLoading}
				handleChangePermissions={handleChangePermissions}
			/>
		</Modal.Root>
	);

	return { modal, startChangeSettings };
}
