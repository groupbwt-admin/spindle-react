import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useStateModalManager } from 'shared/context/modal-manager';

import { IVideo } from 'shared/types/video';

import { VideoApi } from 'app/api/video-api/video-api';

import { VIDEO_MODALS_NAMES } from 'shared/constants/modal-names';

import { Modal } from 'shared/components/modal';
import { DeleteVideoModal } from 'shared/components/video/modals/delete-video-modal';

interface DeleteVideoProps {
	onVideosDeleted: () => Promise<void>;
}

export const DeleteVideo: React.FC<DeleteVideoProps> = ({
	onVideosDeleted,
}) => {
	const [videosToDelete, setVideosToDelete] = useState<IVideo[]>([]);
	const modalState = useStateModalManager(VIDEO_MODALS_NAMES.delete_video, {
		onBeforeOpen: (videos: IVideo[]) => {
			setVideosToDelete(videos);
		},
	});

	const deleteVideosMutation = useMutation(async () => {
		const actions = videosToDelete.map((video) =>
			VideoApi.deleteVideoById(video.id),
		);
		await Promise.all(actions);
		await onVideosDeleted();

		modalState.close();
	});

	const handleClose = () => modalState.close();

	const onDelete = async () => {
		await deleteVideosMutation.mutateAsync();
		handleClose();
	};

	return (
		<Modal.Root
			open={modalState.open}
			onClose={handleClose}
			isClosable={!deleteVideosMutation.isLoading}
		>
			<DeleteVideoModal
				videos={videosToDelete}
				onDelete={onDelete}
				isLoading={deleteVideosMutation.isLoading}
			/>
		</Modal.Root>
	);
};
