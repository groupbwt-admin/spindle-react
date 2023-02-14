import * as React from 'react';

import { styled } from '@mui/material/styles';

import { IconCollectionType } from './icon-list';

const IconWrapper = styled('span')`
	display: inline-flex;
	align-items: center;
	justify-content: center;
`;

interface IconProps {
	className?: string;
	icon: IconCollectionType;
}

export const Icon: React.FC<IconProps> = ({ className, icon }) => {
	const Component = icon;

	return (
		<IconWrapper className={className}>
			<Component />
		</IconWrapper>
	);
};
