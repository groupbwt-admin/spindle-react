import React from 'react';
import styled from '@emotion/styled/macro';
import { Avatar as MuiAvatar } from '@mui/material';
import { USER_AVATAR_STORAGE_PATH } from 'shared/constants/file-storage-path';

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
			src={USER_AVATAR_STORAGE_PATH + src}
			alt={alt}
		/>
	);
};
