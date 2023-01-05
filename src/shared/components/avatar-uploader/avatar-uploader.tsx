import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { FileInput, FileInputProps } from 'shared/components/input/file-input';
import { Button } from 'shared/components/button/button';
import { Avatar } from 'shared/components/avatar/avatar';

const StyledLabel = styled('label')`
	width: 100%;
	margin-bottom: 18px;
`;

const StyledAvatar = styled(Avatar)`
	margin-right: 24px;
	width: 48px;
	height: 48px;
`

const StyledFileInput = styled(FileInput)`
	margin-right: 13px;
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
	onRemove,
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
			<StyledLabel>Profile picture</StyledLabel>
			<StyledAvatar src={avatarSrc} />
			<StyledFileInput
				accept={['image/jpeg', 'image/jpg', 'image/png']}
				errorMessage={errorMessage}
				maxSize={3000000}
				onChange={onChange}
				onError={onError}
			/>
			{avatar && (
				<Button label="Remove" variant="text" onClick={onRemove} size="small" />
			)}
		</Box>
	);
};
