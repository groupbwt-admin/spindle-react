import React, { useState } from 'react';
import * as yup from 'yup';
import { Button } from 'shared/components/button/button';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Input } from 'shared/components/input/input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AvatarUploader } from 'shared/components/avatar-uploader/avatar-uploader';

const StyledInput = styled(Input)`
	margin-top: 32px;
`;

const StyledButton = styled(Button)`
	margin-top: 40px;
`;

const schema = yup
	.object({
		firstName: yup.string().trim().required(),
		lastName: yup.string().trim().required(),
	})
	.defined();

type SetUpProfileFormData = yup.InferType<typeof schema>;

interface SetUpProfileFormProps {
	isLoading: boolean;
	onSubmit: (data: SetUpProfileFormData) => void;
}

export const SetUpProfileForm: React.FC<SetUpProfileFormProps> = ({
	isLoading,
	onSubmit,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SetUpProfileFormData>({
		resolver: yupResolver(schema),
	});

	const [avatarError, setAvatarError] = useState<string>('');
	const [file, setFile] = useState<string>('');

	const onAvatarChange = (files) => {
		setAvatarError('');
		const avatarUrl = URL.createObjectURL(files[0]);
		setFile(avatarUrl);
	};

	const onAvatarDownloadError = (data) => {
		setAvatarError('File is too big');
	};

	const handleSubmitSetUpProfileForm = (data) => {
		onSubmit({ ...data, file });
	};

	return (
		<Box
			sx={{ width: '100%', maxWidth: 400 }}
			component={'form'}
			onSubmit={handleSubmit(handleSubmitSetUpProfileForm)}
		>
			<AvatarUploader
				onChange={onAvatarChange}
				onError={onAvatarDownloadError}
				errorMessage={avatarError}
				maxSize={3000000}
				avatar={file}
			/>
			<StyledInput
				type="first-name"
				label="First name"
				placeholder="Your first name"
				autoComplete="first-name"
				error={!!errors.firstName}
				errorText={errors.firstName?.message as string}
				autoFocus
				{...register('firstName')}
			/>
			<StyledInput
				type="last-name"
				label="Last name"
				placeholder="Your last name"
				autoComplete="last-name"
				error={!!errors.lastName}
				errorText={errors.lastName?.message as string}
				{...register('lastName')}
			/>
			<StyledButton
				label="Continue"
				type="submit"
				isLoading={isLoading}
				fullWidth
			/>
		</Box>
	);
};
