import * as React from 'react';
import { forwardRef } from 'react';

import { IconButton as ExternalIconButton } from '@mui/material';

interface IconButtonProps {
	className?: string;
	disabled?: boolean;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const RootIconButton: React.ForwardRefRenderFunction<
	HTMLButtonElement,
	React.PropsWithChildren<IconButtonProps>
> = ({ className, disabled, onClick, children, ...props }, ref) => {
	return (
		<ExternalIconButton
			ref={ref}
			className={className}
			disabled={disabled}
			onClick={onClick}
			{...props}
		>
			{children}
		</ExternalIconButton>
	);
};

export const IconButton = forwardRef(RootIconButton);
