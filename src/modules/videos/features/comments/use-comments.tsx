import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useModalManager } from 'shared/context/modal-manager';

import {
	CommentsApi,
	CommentsListParamsDto,
	CommentsListResponseDto,
	CreateCommentDto,
	EditCommentDto,
} from 'app/api/comments-api/comments-api';

import { selectUserData } from 'app/store/user/selects';

import { VIDEO_MODALS_NAMES } from 'shared/constants/modal-names';
import { useFilterRequest } from 'shared/hooks/use-filter-request';
import { getUserAvatarURL } from 'shared/utils/get-file-url';

export function useComments(video) {
	const createCommentMutation = useMutation(CommentsApi.createComment);
	const editCommentMutation = useMutation(CommentsApi.editComment);

	const {
		data: comments,
		fetchData,
		refetchData,
		updateState,
		isInitialLoading,
		isRefetching: isChangesSaving,
	} = useFilterRequest<
		CommentsListResponseDto,
		Partial<CommentsListParamsDto>,
		CommentsListParamsDto
	>({
		manualTriggering: true,
		request: (params) => {
			return CommentsApi.getComments({ videoId: video.id, ...params });
		},
	});

	const user = selectUserData();

	const modalManager = useModalManager();

	useEffect(() => {
		fetchData().then((data) => {
			updateState(data);
		});
	}, [video]);

	const handleCreateComment = async (payload: Partial<CreateCommentDto>) => {
		if (!video) return;
		await createCommentMutation.mutateAsync({
			videoId: video.id,
			parentCommentId: null,
			...payload,
		});
		refetchData().then((data) => {
			updateState(data);
		});
	};

	const handleEditComment = async (payload: EditCommentDto) => {
		await editCommentMutation.mutateAsync(payload);
		refetchData().then((data) => {
			updateState(data);
		});
	};

	const handleCommentDeletedSuccess = () => {
		refetchData().then((data) => {
			updateState(data);
		});
	};

	const handleStartDeleteComment = (commentId) => {
		modalManager.open(VIDEO_MODALS_NAMES.delete_comment, commentId);
	};

	return {
		models: {
			comments,
			isChangesSaving,
			currentUserAvatar: user?.avatar && getUserAvatarURL(user.avatar),
		},
		commands: {
			handleCreateComment,
			handleEditComment,
			handleCommentDeletedSuccess,
			handleStartDeleteComment,
		},
	};
}
