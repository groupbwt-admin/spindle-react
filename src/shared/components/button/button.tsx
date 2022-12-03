import React, { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)`
	padding: 17px 24px 15px;
	border-radius: 60px;
	width: 100%;
	text-transform: none;
`;

interface AppButtonProps {
	type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
	label: string;
	variant?: ButtonProps['variant'];
	startIcon?: ButtonProps['startIcon'];
	color?: ButtonProps['color'];
}

export const AppButton: React.FC<AppButtonProps> = ({
	label,
	variant,
	type,
	startIcon,
	color
}) => {
	return (
		<StyledButton variant={variant || 'contained'} disableElevation type={type} startIcon={startIcon} color={color}>
			{label}
		</StyledButton>
	);
};
