import React from 'react';
import styled from '@emotion/styled/macro';
import { formatDistanceToNow } from 'date-fns';
import { BaseCommentInput } from 'modules/videos/features/comments/components/base-comment-input';
import { EditComment } from 'modules/videos/features/comments/components/edit-comment';
import { DeleteCommentModal } from 'modules/videos/features/comments/delete-comment-modal';
import { useComments } from 'modules/videos/features/comments/use-comments';

import { IComment, IVideo } from 'shared/types/video';

const StyledCommentsComponent = styled.div`
	display: block;
	width: 100%;
	margin-bottom: 60px;
`;

interface CommentsProps {
	video: IVideo;
}

export const Comments: React.FC<CommentsProps> = ({ video }) => {
	const { models, commands } = useComments(video);

	return (
		<StyledCommentsComponent>
			<BaseCommentInput
				onCreateComment={commands.handleCreateComment}
				avatar={models.currentUserAvatar}
				isLoading={models.isChangesSaving}
			/>
			{!!models.comments?.data.length &&
				models.comments.data.map((comment: IComment) => (
					<EditComment
						key={comment.id}
						subComments={comment.subComments}
						id={comment.id}
						body={comment.body}
						user={comment.user}
						creationDate={formatDistanceToNow(new Date(comment.createdAt))}
						onAddReply={commands.handleCreateComment}
						onEditComment={commands.handleEditComment}
						onDeleteComment={commands.handleStartDeleteComment}
					/>
				))}
			<DeleteCommentModal
				onCommentDeleted={commands.handleCommentDeletedSuccess}
			/>
		</StyledCommentsComponent>
	);
};
