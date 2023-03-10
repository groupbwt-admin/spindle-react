import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { DeleteCommentModalContent } from 'modules/videos/features/comments/delete-my-comment/delete-comment-modal-content';
import { useStateModalManager } from 'shared/context/modal-manager';

import { IComment } from 'shared/types/video';

import { CommentsApi } from 'app/api/comments-api/comments-api';

import { VIDEO_MODALS_NAMES } from 'shared/constants/modal-names';

import { Modal } from 'shared/components/modal';

interface DeleteCommentProps {
	onCommentDeleted: () => void;
}

export const DeleteCommentModal: React.FC<DeleteCommentProps> = ({
	onCommentDeleted,
}) => {
	const [commentId, setCommentId] = useState<IComment['id'] | null>(null);

	const deleteCommentsMutation = useMutation(async () => {
		if (!commentId) return;
		await CommentsApi.deleteComment({ id: commentId });
		await onCommentDeleted();

		modalState.close();
	});

	const modalState = useStateModalManager(VIDEO_MODALS_NAMES.delete_comment, {
		onBeforeOpen: (commentId: IComment['id']) => {
			setCommentId(commentId);
		},
	});

	const handleClose = () => modalState.close();

	const onDelete = async () => {
		await deleteCommentsMutation.mutateAsync();
		handleClose();
	};

	return (
		<Modal.Root
			open={modalState.open}
			onClose={handleClose}
			isClosable={!deleteCommentsMutation.isLoading}
		>
			<DeleteCommentModalContent
				onDelete={onDelete}
				isLoading={deleteCommentsMutation.isLoading}
			/>
		</Modal.Root>
	);
};
