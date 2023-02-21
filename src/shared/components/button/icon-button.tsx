import * as React from 'react';
import { forwardRef } from 'react';
import styled from '@emotion/styled/macro';

import {
	CircularProgress,
	IconButton as ExternalIconButton,
} from '@mui/material';

const StyledIconButton = styled(ExternalIconButton)`
	position: relative;
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
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	opacity: ${({ isLoading }) => (isLoading ? 0 : 1)};
	transition: opacity 0.3s ease;
`;

interface IconButtonProps {
	className?: string;
	disabled?: boolean;
	isLoading?: boolean;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const RootIconButton: React.ForwardRefRenderFunction<
	HTMLButtonElement,
	React.PropsWithChildren<IconButtonProps>
> = ({ className, disabled, isLoading, onClick, children, ...props }, ref) => {
	return (
		<StyledIconButton
			ref={ref}
			className={className}
			disabled={disabled}
			onClick={onClick}
			{...props}
		>
			{isLoading && (
				<StyledSpinnerContainer>
					<CircularProgress color="primary" size={24} />
				</StyledSpinnerContainer>
			)}
			<StyledLabel isLoading={isLoading}>{children}</StyledLabel>
		</StyledIconButton>
	);
};

export const IconButton = forwardRef(RootIconButton);
