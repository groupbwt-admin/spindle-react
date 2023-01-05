import * as React from 'react';
import { Avatar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FileInput, FileInputProps } from 'shared/components/input/file-input';
import {Button} from "shared/components/button/button";

const StyledLabel = styled('label')`
	width: 100%;
	margin-bottom: 13px;
`;

interface AvatarUploaderProps extends FileInputProps {
	className?: string;
	avatar?: Blob | null;
	onRemove?: () => void;
}

export const AvatarUploader: React.FC<AvatarUploaderProps> = ({
	className,
	avatar,
	errorMessage,
	onChange,
	onError,
	onRemove
}) => {
	const avatarSrc =
		!avatar || typeof avatar === 'string'
			? avatar || ''
			: URL.createObjectURL(avatar);

	return (
		<Box
			sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
			className={className}
		>
			<StyledLabel>Profile Picture</StyledLabel>
			<Avatar
				sx={{ width: 46.5, height: 46.5, mr: 3 }}
				alt="user-photo"
				src={avatarSrc}
			/>
			<FileInput
				accept={['image/jpeg', 'image/jpg', 'image/png']}
				errorMessage={errorMessage}
				maxSize={3000000}
				onChange={onChange}
				onError={onError}
			/>
			{avatar && <Button label="Remove" variant="text" onClick={onRemove} size="small"/>}
		</Box>
	);
};
