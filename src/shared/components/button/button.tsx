import React, { ButtonHTMLAttributes } from 'react';
import { styled } from '@mui/material/styles';
import ExternalButton, {
	ButtonProps as ExternalButtonProps,
} from '@mui/material/Button';
import { LinkProps } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const StyledButton = styled(ExternalButton)`
	position: relative;
	padding: 17px 24px 15px;
	border-radius: 60px;
	text-transform: none;
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

interface ButtonProps {
	component?: React.ElementType;
	className?: string;
	type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
	label: string;
	variant?: ExternalButtonProps['variant'];
	to?: LinkProps['to'];
	startIcon?: ExternalButtonProps['startIcon'];
	color?: ExternalButtonProps['color'];
	sx?: ExternalButtonProps['sx'];
	fullWidth?: ExternalButtonProps['fullWidth'];
	isLoading?: boolean;
}

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
	component,
	className,
	label,
	variant,
	type,
	startIcon,
	color,
	to,
	isLoading,
	fullWidth,
	children,
}) => {
	const StyledLabel = styled('span')`
		position: relative;
		opacity: ${isLoading ? 0 : 1};
		transition: opacity 0.3s ease;
	`;

	return (
		<StyledButton
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			component={component}
			to={to}
			className={className}
			variant={variant || 'contained'}
			disableElevation
			type={type}
			startIcon={startIcon}
			color={color}
			fullWidth={fullWidth}
		>
			{isLoading && (
				<StyledSpinnerContainer>
					<CircularProgress color="info" size={24} />
				</StyledSpinnerContainer>
			)}
			<StyledLabel>{label}</StyledLabel>
		</StyledButton>
	);
};
