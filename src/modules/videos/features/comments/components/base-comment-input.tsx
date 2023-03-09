import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled/macro';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { CreateCommentDto } from 'app/api/comments-api/comments-api';

import { Avatar } from 'shared/components/avatar/avatar';
import { Button } from 'shared/components/button/button';
import { Input } from 'shared/components/input/input';

const InputLineWrapper = styled.div`
	display: flex;
	align-items: flex-start;
	width: 100%;
`;

const StyledInput = styled(Input)`
	position: relative;
	border-radius: 10px;
	background-color: ${({ theme }) => theme.palette.common.white};
	border: 1px solid transparent;
	transition: border-color 0.3s
		${({ theme }) => theme.transitions.easing.easeIn};
	padding: 14px 12px;
	width: 100%;
	font-family: ${({ theme }) => theme.typography.fontFamily};
	font-size: 16px;
	resize: none;

	&:focus {
		outline: none;
		border-color: ${({ theme }) => theme.palette.primary.main};
	}

	.errorText {
		padding-left: 0;
	}
`;

const StyledAvatar = styled(Avatar)`
	margin-right: 12px;
	width: 42px;
	height: 42px;
	border: none;
`;

const StyledComment = styled.div`
	margin: 16px 0 32px 0;
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
		comment: yup.string().trim().max(7680).required(),
	})
	.defined();

interface IComment {
	avatar?: string;
	onCreateComment: (payload: Partial<CreateCommentDto>) => void;
	isLoading: boolean;
}

export const BaseCommentInput: React.FC<IComment> = ({
	avatar,
	isLoading,
	onCreateComment,
}) => {
	const [isOpenComment, setIsOpenComment] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<{ comment: string }>({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		await onCreateComment({ body: data.comment });
		setIsOpenComment(false);
		reset({ comment: '' });
	};

	const handleCancel = () => {
		setIsOpenComment(false);
		reset({ comment: '' });
	};

	return (
		<StyledComment>
			<InputLineWrapper onClick={() => setIsOpenComment(true)}>
				<StyledAvatar src={avatar} />
				<StyledInput
					multiline
					placeholder={'Type your comment here'}
					error={!!errors?.comment}
					errorText={errors?.comment?.message}
					{...register('comment')}
				/>
			</InputLineWrapper>
			{isOpenComment && (
				<StyledButtonWrap>
					<StyledButton label="Cancel" color="info" onClick={handleCancel} />
					<StyledButton
						label="Comment"
						onClick={handleSubmit(onSubmit)}
						isLoading={isLoading}
					/>
				</StyledButtonWrap>
			)}
		</StyledComment>
	);
};
