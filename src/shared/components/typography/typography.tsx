import React from 'react';
import {
	Typography as TypographyExternal,
	TypographyProps as TypographyExternalProps,
} from '@mui/material';

interface TypographyProps {
	variant: TypographyExternalProps['variant'];
	className?: string;
	component?: React.ElementType;
}

export const Typography: React.FC<React.PropsWithChildren<TypographyProps>> = ({
	className,
	variant,
	component = 'p',
	children,
}) => {
	return (
		<TypographyExternal variant={variant} component={component} className={className}>
			{children}
		</TypographyExternal>
	);
};
