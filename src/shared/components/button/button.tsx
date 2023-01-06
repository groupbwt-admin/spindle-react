import * as React from 'react';
import styled from "@emotion/styled/macro";
import { ButtonHTMLAttributes, forwardRef } from 'react';
import ExternalButton, {
	ButtonProps as ExternalButtonProps,
} from '@mui/material/Button';
import { LinkProps } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const StyledButton = styled(ExternalButton)`
	position: relative;
	border-radius: 60px;
	text-transform: none;

	&.MuiButton-outlinedSecondary {
		color: ${({theme}) => theme.palette.text.primary};
	}
`;

const StyledSpinnerContainer = styled('span')`
	position: absolute;
	right: 0;
	top: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const StyledLabel = styled('span')<{ isLoading?: boolean }>`
	position: relative;
	opacity: ${({ isLoading }) => (isLoading ? 0 : 1)};
	transition: opacity 0.3s ease;
`;

const SPINNER_COLOR = {
	info: 'primary',
};

export interface ButtonProps {
	component?: React.ElementType;
	className?: string;
	type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
	label: string;
	variant?: ExternalButtonProps['variant'];
	to?: LinkProps['to'];
	startIcon?: ExternalButtonProps['startIcon'];
	color?: ExternalButtonProps['color'];
	size?: ExternalButtonProps['size'];
	sx?: ExternalButtonProps['sx'];
	fullWidth?: ExternalButtonProps['fullWidth'];
	isLoading?: boolean;
	disabled?: boolean;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonRoot: React.ForwardRefRenderFunction<
	HTMLButtonElement,
	ButtonProps
> = (
	{
		component,
		className,
		label,
		variant,
		type,
		startIcon,
		color = 'primary',
		size = "medium",
		to,
		isLoading,
		disabled,
		fullWidth,
		onClick,
	},
	ref,
) => {
	return (
		<StyledButton
			ref={ref}
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			component={component}
			to={to}
			type={type}
			className={className}
			variant={variant || 'contained'}
			disableElevation
			startIcon={startIcon}
			color={color}
			size={size}
			disabled={disabled}
			fullWidth={fullWidth}
			onClick={onClick}
		>
			{isLoading && (
				<StyledSpinnerContainer>
					<CircularProgress color={SPINNER_COLOR[color] ?? 'info'} size={24} />
				</StyledSpinnerContainer>
			)}
			<StyledLabel isLoading={isLoading}>{label}</StyledLabel>
		</StyledButton>
	);
};

export const Button = forwardRef(ButtonRoot);
