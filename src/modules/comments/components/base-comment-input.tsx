import React, { useState } from 'react';
import styled from '@emotion/styled/macro';

import TextareaAutosize from '@mui/base/TextareaAutosize';

import { Avatar } from '../../../shared/components/avatar/avatar';
import { Button } from '../../../shared/components/button/button';

const InputLineWrapper = styled.div`
	display: flex;
	align-items: flex-start;
	width: 100%;
`;

const StyledInput = styled(TextareaAutosize)`
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

interface IComment {
	avatar?: string;
}

export const BaseCommentInput: React.FC<IComment> = ({ avatar }) => {
	const [isOpenComment, setIsOpenComment] = useState(false);

	return (
		<StyledComment>
			<InputLineWrapper onClick={() => setIsOpenComment(true)}>
				<StyledAvatar />
				<StyledInput placeholder={'Type your comment here'} />
			</InputLineWrapper>
			{isOpenComment && (
				<StyledButtonWrap>
					<StyledButton
						label="Cancel"
						color="info"
						onClick={() => setIsOpenComment(false)}
					/>
					<StyledButton
						label="Comment"
						onClick={() => setIsOpenComment(false)}
					/>
				</StyledButtonWrap>
			)}
		</StyledComment>
	);
};
