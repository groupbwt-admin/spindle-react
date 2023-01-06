import * as React from 'react';
import { styled } from '@mui/material/styles';

const Wrapper = styled('div')`
	display: flex;
	width: 100%;
	gap: 12px;
`

interface ButtonListProps {
	className?: string;
}

export const ButtonList: React.FC<React.PropsWithChildren<ButtonListProps>> = ({
	className,
	children,
}) => {
	return <Wrapper className={className}>{children}</Wrapper>;
};
