import * as React from 'react';
import { IconButton as ExternalIconButton } from '@mui/material';

interface IconButtonProps {
	className?: string;
	disabled?: boolean;
	onClick?: () => void;
}

export const IconButton: React.FC<React.PropsWithChildren<IconButtonProps>> = ({
	className,
	disabled,
	onClick,
	children,
}) => {
	return (
		<ExternalIconButton
			className={className}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</ExternalIconButton>
	);
};
