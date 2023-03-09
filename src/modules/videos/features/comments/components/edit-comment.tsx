import React, { useState } from 'react';
import styled from '@emotion/styled/macro';
import { formatDistanceToNow } from 'date-fns';
import CommentMenu from 'modules/videos/features/comments/components/comment-menu';

import TextareaAutosize from '@mui/base/TextareaAutosize';

import { IComment } from 'shared/types/video';

import {
	CreateCommentDto,
	EditCommentDto,
} from 'app/api/comments-api/comments-api';

import { getUserAvatarURL } from 'shared/utils/get-file-url';

import { Avatar } from 'shared/components/avatar/avatar';
import { Button } from 'shared/components/button/button';
import { Typography } from 'shared/components/typography/typography';

const StyledAvatar = styled(Avatar)`
	margin-right: 12px;
	width: 42px;
	height: 42px;
	border: none;
`;

const StyledParentComment = styled.div`
	display: flex;
	align-items: flex-start;
	margin-top: 16px;
`;

const InputLineWrapper = styled.div`
	display: flex;
	align-items: flex-start;
	width: 100%;
`;

const StyledInput = styled(TextareaAutosize)`
	position: relative;
	border-radius: 10px;
	transition: all 0.1s ease-out;
	width: 100%;
	font-family: ${({ theme }) => theme.typography.fontFamily};
	font-size: 16px;
	resize: none;
	border-color: ${({ theme }) => theme.palette.primary.main};
	background-color: ${({ theme }) => theme.palette.common.white};
	padding: 14px 30px 14px 12px;
	margin-top: 8px;

	&:focus {
		outline: none;
	}

	&:disabled {
		color: ${({ theme }) => theme.palette.text.primary};
		border-color: transparent;
		background-color: transparent;
		margin-top: 0px;
		padding: 0 30px 0 0;
	}
`;

const StyledButtonWrap = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 16px;

	button {
		margin-left: 12px;
	}
`;

const StyledButton = styled(Button)`
	border-radius: 10px;
`;

const StyleTextAreaWrapper = styled.div`
	width: 100%;
`;

const StyledTypography = styled(Typography)`
	font-weight: 600;
`;

const CommentHead = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
`;

const CommentBottom = styled.div`
	display: flex;
	align-items: flex-end;
`;

const StyledCaption = styled(Typography)`
	color: ${({ theme }) => theme.palette.text.secondary};
	font-size: ${({ theme }) => theme.typography.h4.fontSize};
	margin-right: 10px;
`;

const ReplyButton = styled.button`
	border: none;
	padding: 0 6px;
	background: transparent;
	color: ${({ theme }) => theme.palette.primary.dark};
	font-family: ${({ theme }) => theme.typography.fontFamily};
	font-size: ${({ theme }) => theme.typography.h4.fontSize};
	cursor: pointer;

	&:hover {
		opacity: 0.8;
	}
`;

interface EditCommentProps {
	id: string;
	body: string;
	user: IComment['user'];
	creationDate: string;
	subComments?: Array<IComment>;
	onAddReply: (payload: Partial<CreateCommentDto>) => void;
	onEditComment: (payload: EditCommentDto) => void;
	onDeleteComment: (id: IComment['id']) => void;
}

export const EditComment: React.FC<EditCommentProps> = ({
	id,
	body,
	creationDate,
	user,
	subComments,
	onAddReply,
	onEditComment,
	onDeleteComment,
}) => {
	const [isOpenComment, setIsOpenComment] = useState(false);
	const [isReplyOpen, setIsReplyOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [comment, setComment] = useState(body);
	const [reply, setReply] = useState('');
	const [isReplySaving, setIsReplySaving] = useState(false);
	const [isEditSaving, setIsEditSaving] = useState(false);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (event) => {
		event.stopPropagation();
		setAnchorEl(null);
	};

	const handleEdit = () => {
		setIsOpenComment(true);
		setAnchorEl(null);
	};

	const handleSaveEdits = async () => {
		setIsEditSaving(true);
		await onEditComment({ id: id, body: comment });
		setIsOpenComment(false);
		setIsEditSaving(false);
	};

	const handleSaveReply = (
		e: React.MouseEvent<HTMLButtonElement>,
		id: IComment['id'],
	) => {
		setIsReplySaving(true);
		e.stopPropagation();
		onAddReply({ parentCommentId: id, body: reply });
		setReply('');
		setIsReplyOpen(false);
		setIsReplySaving(false);
	};

	const handleDeleteComment = () => {
		onDeleteComment(id);
		setAnchorEl(null);
	};

	return (
		<StyledParentComment>
			<StyledAvatar src={getUserAvatarURL(user.avatar)} />
			<StyleTextAreaWrapper>
				<CommentHead>
					<StyledTypography variant="body1">
						{user.firstName + ' ' + user.lastName}
					</StyledTypography>
					{!isOpenComment && (
						<CommentMenu
							open={open}
							anchorEl={anchorEl}
							handleClick={handleClick}
							handleClose={handleClose}
							handleEdit={handleEdit}
							onDelete={handleDeleteComment}
						/>
					)}
				</CommentHead>

				<InputLineWrapper>
					<StyledInput
						placeholder={'Type your comment here'}
						disabled={!isOpenComment}
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
				</InputLineWrapper>
				{isOpenComment && (
					<StyledButtonWrap>
						<StyledButton
							label="Cancel"
							color="info"
							onClick={() => setIsOpenComment(false)}
						/>
						<StyledButton
							label="Save"
							onClick={handleSaveEdits}
							isLoading={isEditSaving}
						/>
					</StyledButtonWrap>
				)}
				{!isOpenComment && (
					<CommentBottom>
						<StyledCaption variant="subtitle2">
							{creationDate} ago
						</StyledCaption>
						{!isReplyOpen && (
							<ReplyButton onClick={() => setIsReplyOpen(true)}>
								Reply
							</ReplyButton>
						)}
					</CommentBottom>
				)}

				{isReplyOpen || reply.length ? (
					<StyledParentComment>
						<StyledAvatar src={getUserAvatarURL(user.avatar)} />

						<StyleTextAreaWrapper>
							<StyledInput
								placeholder={'Type your comment here'}
								disabled={!isReplyOpen}
								autoFocus
								value={reply}
								onChange={(e) => setReply(e.target.value)}
							/>
							{isReplyOpen && (
								<StyledButtonWrap>
									<StyledButton
										label="Cancel"
										color="info"
										onClick={() => setIsReplyOpen(false)}
									/>
									<StyledButton
										label="Save"
										onClick={(e) => handleSaveReply(e, id)}
										isLoading={isReplySaving}
									/>
								</StyledButtonWrap>
							)}
						</StyleTextAreaWrapper>
					</StyledParentComment>
				) : null}

				{subComments?.length
					? subComments.map((comment: any) => (
							<EditComment
								key={comment.id}
								subComments={comment.subComments}
								creationDate={formatDistanceToNow(new Date(comment.createdAt))}
								user={comment.user}
								body={comment.body}
								id={id}
								onAddReply={onAddReply}
								onEditComment={onEditComment}
								onDeleteComment={onDeleteComment}
							/>
					  ))
					: null}
			</StyleTextAreaWrapper>
		</StyledParentComment>
	);
};
