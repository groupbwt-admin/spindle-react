import { useState } from 'react';
import { useMutation } from 'react-query';

import { IVideo } from 'shared/types/video';

import { VideoApi } from 'app/api/video-api/video-api';

import { Modal } from 'shared/components/modal';
import { AccessSettingsModal } from 'shared/components/video/modals/access-settings-modal';

export function useChangeAccessSettings({ onSettingsChanged }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [videosToDelete, setVideosToDelete] = useState<IVideo[]>([]);

	const deleteVideosMutation = useMutation(async () => {
		const actions = videosToDelete.map((video) =>
			VideoApi.deleteVideoById(video.id),
		);
		await Promise.all(actions);
		await onSettingsChanged();
	});

	const handleClose = () => setIsModalOpen(false);

	const startChangeSettings = (videos) => {
		setVideosToDelete(videos);
		setIsModalOpen(true);
	};

	const onDelete = async () => {
		await deleteVideosMutation.mutateAsync();
		handleClose();
	};

	const modal = (
		<Modal.Root
			open={isModalOpen}
			onClose={handleClose}
			isClosable={!deleteVideosMutation.isLoading}
		>
			<AccessSettingsModal
				videos={videosToDelete}
				onDelete={onDelete}
				isLoading={deleteVideosMutation.isLoading}
			/>
		</Modal.Root>
	);

	return { modal, startChangeSettings };
}
