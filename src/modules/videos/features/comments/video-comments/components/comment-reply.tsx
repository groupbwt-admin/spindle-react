import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled/macro';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { CreateCommentDto } from 'app/api/comments-api/comments-api';

import { Avatar } from 'shared/components/avatar/avatar';
import { Button } from 'shared/components/button/button';
import { Input } from 'shared/components/input/input';

const StyledParentComment = styled.div`
	display: flex;
	align-items: flex-start;
	margin-top: 16px;
`;

const StyleTextAreaWrapper = styled.div`
	width: 100%;
`;

const StyledAvatar = styled(Avatar)`
	margin-right: 12px;
	width: 42px;
	height: 42px;
	border: none;
`;

const StyledInput = styled(Input)`
	position: relative;
	border-radius: 10px;
	transition: all 0.1s ease-out;
	width: 100%;
	font-family: ${({ theme }) => theme.typography.fontFamily};
	font-size: 16px;
	resize: none;
	background-color: ${({ theme }) => theme.palette.common.white};
	padding: 14px 30px 14px 12px;

	&.hasError {
		border: 1px solid ${({ theme }) => theme.palette.error.main};
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

interface CommentReplyProps {
	userAvatar?: string;
	onAddReply: (payload: Partial<CreateCommentDto>) => void;
	handleCloseReply: () => void;
}

export const CommentReply: React.FC<CommentReplyProps> = ({
	userAvatar,
	onAddReply,
	handleCloseReply,
}) => {
	const [isReplySaving, setIsReplySaving] = useState(false);

	const {
		register: registerReply,
		handleSubmit: handleReplySubmit,
		formState: { errors: replyErrors },
		reset: resetReply,
	} = useForm<{ body: string }>({
		resolver: yupResolver(schema),
		defaultValues: {
			body: '',
		},
	});

	const handleSaveReply = async (data: CommentFormData) => {
		setIsReplySaving(true);
		await onAddReply(data);
		resetReply({ body: '' });
		handleCloseReply();
		setIsReplySaving(false);
	};

	const handleCancelReply = () => {
		handleCloseReply();
		resetReply({ body: '' });
	};

	return (
		<StyledParentComment>
			<StyledAvatar src={userAvatar} />

			<StyleTextAreaWrapper>
				<StyledInput
					multiline
					placeholder={'Type your comment here'}
					autoFocus
					error={!!replyErrors.body}
					errorText={replyErrors.body?.message}
					{...registerReply('body')}
				/>
				<StyledButtonWrap>
					<StyledButton
						label="Cancel"
						color="info"
						onClick={handleCancelReply}
						disabled={isReplySaving}
					/>
					<StyledButton
						label="Save"
						isLoading={isReplySaving}
						onClick={handleReplySubmit(handleSaveReply)}
					/>
				</StyledButtonWrap>
			</StyleTextAreaWrapper>
		</StyledParentComment>
	);
};
