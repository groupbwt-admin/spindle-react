import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled/macro';
import { yupResolver } from '@hookform/resolvers/yup';
import { formatDistanceToNow } from 'date-fns';
import CommentMenu from 'modules/videos/features/comments/components/comment-menu';
import * as yup from 'yup';

import { IComment } from 'shared/types/video';

import {
	CreateCommentDto,
	EditCommentDto,
} from 'app/api/comments-api/comments-api';

import { getUserAvatarURL } from 'shared/utils/get-file-url';

import { Avatar } from 'shared/components/avatar/avatar';
import { Button } from 'shared/components/button/button';
import { Input } from 'shared/components/input/input';
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

const StyledInput = styled(Input)`
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

	&.hasError {
		border: 1px solid ${({ theme }) => theme.palette.error.main};
	}

	&:focus {
		outline: none;
	}

	.errorText {
		padding-left: 0;
	}

	&.isDisabled {
		color: ${({ theme }) => theme.palette.text.primary};
		border-color: transparent;
		background-color: transparent;
		margin-top: 0px;
		padding: 0 30px 0 0;

		.Mui-disabled {
			color: ${({ theme }) => theme.palette.text.primary};
			-webkit-text-fill-color: ${({ theme }) => theme.palette.text.primary};
		}
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

const schema = yup
	.object({
		comment: yup.string().trim().max(7680).required(),
	})
	.defined();

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
	const [isReplySaving, setIsReplySaving] = useState(false);
	const [isEditSaving, setIsEditSaving] = useState(false);
	const open = Boolean(anchorEl);

	const {
		register: registerEdit,
		handleSubmit: handleEditSubmit,
		formState: { errors: editErrors },
		reset: resetEdit,
	} = useForm<{ comment: string }>({
		resolver: yupResolver(schema),
		defaultValues: {
			comment: body,
		},
	});

	const {
		register: registerReply,
		handleSubmit: handleReplySubmit,
		formState: { errors: replyErrors },
		getValues: getReplyValues,
		reset: resetReply,
	} = useForm<{ comment: string }>({
		resolver: yupResolver(schema),
		defaultValues: {
			comment: '',
		},
	});

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setAnchorEl(event.currentTarget);
	};

	const handleCloseCommentMenu = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
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

	const handleSaveReply = (data) => {
		setIsReplySaving(true);
		onAddReply({ parentCommentId: id, body: data.comment });
		resetReply({ comment: '' });
		setIsReplyOpen(false);
		setIsReplySaving(false);
	};

	const handleDeleteComment = () => {
		onDeleteComment(id);
		setAnchorEl(null);
	};

	const handleCancelEdit = () => {
		setIsOpenComment(false);
		resetEdit({ comment: body });
	};

	const handleCancelReply = () => {
		setIsReplyOpen(false);
		resetReply({ comment: '' });
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
							handleClose={handleCloseCommentMenu}
							handleEdit={handleEdit}
							onDelete={handleDeleteComment}
						/>
					)}
				</CommentHead>

				<InputLineWrapper>
					<StyledInput
						multiline
						placeholder={'Type your comment here'}
						disabled={!isOpenComment}
						error={!!editErrors.comment}
						errorText={editErrors.comment?.message}
						{...registerEdit('comment')}
					/>
				</InputLineWrapper>
				{isOpenComment && (
					<StyledButtonWrap>
						<StyledButton
							label="Cancel"
							color="info"
							onClick={handleCancelEdit}
						/>
						<StyledButton
							label="Save"
							onClick={handleEditSubmit(handleSaveEdits)}
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

				{isReplyOpen || getReplyValues().comment.length ? (
					<StyledParentComment>
						<StyledAvatar src={getUserAvatarURL(user.avatar)} />

						<StyleTextAreaWrapper>
							<StyledInput
								multiline
								placeholder={'Type your comment here'}
								autoFocus
								error={!!replyErrors.comment}
								errorText={replyErrors.comment?.message}
								{...registerReply('comment')}
							/>
							{isReplyOpen && (
								<StyledButtonWrap>
									<StyledButton
										label="Cancel"
										color="info"
										onClick={handleCancelReply}
									/>
									<StyledButton
										label="Save"
										isLoading={isReplySaving}
										onClick={handleReplySubmit(handleSaveReply)}
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
