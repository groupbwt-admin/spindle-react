import React, { ReactNode } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from '@emotion/styled/macro';
import { formatDistanceToNow } from 'date-fns';
import { BaseCommentInput } from 'modules/videos/features/comments/components/base-comment-input';
import { EditComment } from 'modules/videos/features/comments/components/edit-comment';
import { DeleteCommentModal } from 'modules/videos/features/comments/delete-comment-modal';
import { useComments } from 'modules/videos/features/comments/use-comments';

import { IComment, IVideo } from 'shared/types/video';

import { Button } from 'shared/components/button/button';

const CommentsContainer = styled(InfiniteScroll)`
	overflow: unset !important;
`;

const StyledCommentsComponent = styled.div`
	display: block;
	width: 100%;
	margin-bottom: 60px;
`;

const EndMessage = styled.div`
	text-align: center;
	grid-column: 1 / -1;
	color: ${({ theme }) => theme.palette.text.secondary};
	padding-top: 50px;
`;

const LoadingMessage = styled.div`
	text-align: center;
	grid-column: 1 / -1;
	color: ${({ theme }) => theme.palette.text.secondary};
`;

const LoadMoreBtn = styled(Button)`
	margin: 15px auto;
`;

const BtnContainer = styled.div`
	display: flex;
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
			{!!models.comments?.data.length && (
				<CommentsContainer
					dataLength={models.comments.data.length}
					next={commands.loadNextPage || (() => {})}
					hasMore={models.comments.meta.hasNextPage || false}
					loader={<LoadingMessage>Loading...</LoadingMessage>}
					scrollableTarget={document.querySelector(' main') as ReactNode}
					endMessage={
						<EndMessage>
							<span>Yay! You have seen it all</span>
						</EndMessage>
					}
				>
					{models?.comments?.data.map((comment: IComment) => (
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
				</CommentsContainer>
			)}

			{models.comments?.meta.hasNextPage && !models.isChangesSaving && (
				<BtnContainer>
					<LoadMoreBtn
						label="Load more"
						color="secondary"
						onClick={commands.loadNextPage}
					/>
				</BtnContainer>
			)}

			<DeleteCommentModal
				onCommentDeleted={commands.handleCommentDeletedSuccess}
			/>
		</StyledCommentsComponent>
	);
};
