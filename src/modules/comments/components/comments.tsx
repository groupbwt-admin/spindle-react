import React from 'react';
import styled from '@emotion/styled/macro';

import TextareaAutosize from '@mui/base/TextareaAutosize';
import { TextField } from '@mui/material';

import { Avatar } from '../../../shared/components/avatar/avatar';
import { Typography } from '../../../shared/components/typography/typography';
import { getUserAvatarURL } from '../../../shared/utils/get-file-url';

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
const StyledParentComment = styled.div`
	display: flex;
	align-items: flex-start;
`;
const StyledComment = styled.div``;
export const Comments = () => {
	return (
		<>
			<InputLineWrapper>
				<StyledAvatar />
				<StyledInput placeholder={'Type your comment here'} />
			</InputLineWrapper>
			<StyledParentComment>
				<StyledAvatar />
				<StyledComment>
					<Typography variant="body1">DanilKravchenko</Typography>
				</StyledComment>
			</StyledParentComment>
		</>
	);
};
