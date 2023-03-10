import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled/macro';
import { yupResolver } from '@hookform/resolvers/yup';
import { formatDistanceToNow } from 'date-fns';
import CommentMenu from 'modules/videos/features/comments/components/comment-menu';
import { CommentReply } from 'modules/videos/features/comments/components/comment-reply';
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
		margin-top: 0;
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
		body: yup
			.string()
			.trim()
			.max(7680, 'Must be at most 7680 characters')
			.required('Type your comment'),
	})
	.defined();

type CommentFormData = yup.InferType<typeof schema>;

interface EditCommentProps {
	id: string;
	currentUserAvatar: string;
	body: string;
	user: IComment['user'];
	creationDate: string;
	subComments?: Array<IComment>;
	onAddReply: (payload: Partial<CreateCommentDto>) => void;
	onEditComment: (payload: EditCommentDto) => void;
	onDeleteComment: (id: IComment['id']) => void;
}

export const CommentItem: React.FC<EditCommentProps> = ({
	id,
	currentUserAvatar,
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
	const [isEditSaving, setIsEditSaving] = useState(false);

	const {
		register: registerEdit,
		handleSubmit: handleEditSubmit,
		formState: { errors: editErrors },
		reset: resetEdit,
	} = useForm<CommentFormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			body: body,
		},
	});

	const handleEdit = () => {
		setIsOpenComment(true);
	};

	const handleSaveEdits = async (data: CommentFormData) => {
		setIsEditSaving(true);
		await onEditComment({ id: id, ...data });
		setIsOpenComment(false);
		setIsEditSaving(false);
	};

	const handleDeleteComment = () => {
		onDeleteComment(id);
	};

	const handleCancelEdit = () => {
		setIsOpenComment(false);
		resetEdit({ body: body });
	};

	const handleSaveReply = async (data) => {
		await onAddReply({ parentCommentId: id, ...data });
	};

	const handleOpenReply = () => setIsReplyOpen(true);

	const handleCloseReply = () => setIsReplyOpen(false);

	return (
		<StyledParentComment>
			<StyledAvatar src={getUserAvatarURL(user.avatar)} />
			<StyleTextAreaWrapper>
				<CommentHead>
					<StyledTypography variant="body1">
						{`${user.firstName} ${user.lastName}`}
					</StyledTypography>
					{!isOpenComment && (
						<CommentMenu
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
						error={!!editErrors.body}
						errorText={editErrors.body?.message}
						{...registerEdit('body')}
					/>
				</InputLineWrapper>
				{isOpenComment && (
					<StyledButtonWrap>
						<StyledButton
							label="Cancel"
							disabled={isEditSaving}
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
							<ReplyButton onClick={handleOpenReply}>Reply</ReplyButton>
						)}
					</CommentBottom>
				)}

				{isReplyOpen && (
					<CommentReply
						userAvatar={currentUserAvatar}
						onAddReply={handleSaveReply}
						handleCloseReply={handleCloseReply}
					/>
				)}

				{!!subComments?.length &&
					subComments.map((comment: IComment) => (
						<CommentItem
							key={comment.id}
							subComments={comment.subComments}
							creationDate={formatDistanceToNow(new Date(comment.createdAt))}
							user={comment.user}
							body={comment.body}
							id={id}
							currentUserAvatar={currentUserAvatar}
							onAddReply={onAddReply}
							onEditComment={onEditComment}
							onDeleteComment={onDeleteComment}
						/>
					))}
			</StyleTextAreaWrapper>
		</StyledParentComment>
	);
};
