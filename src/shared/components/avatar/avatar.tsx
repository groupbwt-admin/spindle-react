import React from 'react';
import styled from '@emotion/styled/macro';
import { Avatar as MuiAvatar } from '@mui/material';
import { getUserAvatarURL } from 'shared/utils/get-file-url';

const StyledAvatar = styled(MuiAvatar)`
	width: 42px;
	height: 42px;
	border: 2px solid #ffffff;
	flex-shrink: 0;
`;

interface AvatarProps {
	className?: string;
	src?: string;
	alt?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ className, src, alt }) => {

	return (
		<StyledAvatar
			className={className}
			src={src ? getUserAvatarURL(src) : undefined}
			alt={alt}
		/>
	);
};
