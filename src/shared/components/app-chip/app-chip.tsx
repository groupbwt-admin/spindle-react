import React from 'react';
import styled from '@emotion/styled/macro';

import { Chip } from '@mui/material';

const StyledChip = styled(Chip)`
	padding: 4px 8px;
	color: ${({ theme }) => theme.palette.common.white};
	background-color: ${({ theme }) => theme.palette.primary.main};
	border-radius: 6px;
	font-weight: 700;
	font-size: 14px;
	line-height: 23px;
	margin: 0 !important;
`;

export interface AppChipProps {
	label: string;
	handleClick?: () => void;
}

export const AppChip: React.FC<AppChipProps> = ({ label, handleClick }) => {
	return <StyledChip label={label} onClick={handleClick} />;
};
