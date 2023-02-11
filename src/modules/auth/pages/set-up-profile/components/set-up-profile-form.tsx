import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { AvatarUploader } from 'shared/components/avatar-uploader/avatar-uploader';
import { Button } from 'shared/components/button/button';
import { ButtonList } from 'shared/components/button-list/button-list';
import {
	DropzoneErrors,
	FileInvalidDropzone,
} from 'shared/components/input/file-input';
import { Input } from 'shared/components/input/input';

const StyledInput = styled(Input)`
	margin-top: 32px;
`;

const StyledButtonList = styled(ButtonList)`
	flex-direction: column;
	margin-top: 40px;
`;

const schema = yup
	.object({
		firstName: yup.string().trim().required(),
		lastName: yup.string().trim().required(),
		file: yup.mixed(),
	})
	.defined();

type SetUpProfileFormData = yup.InferType<typeof schema>;

interface SetUpProfileFormProps {
	isLoading: boolean;
	onSubmit: (data: SetUpProfileFormData) => void;
	onSignOut: () => void;
}

export const SetUpProfileForm: React.FC<SetUpProfileFormProps> = ({
	isLoading,
	onSubmit,
	onSignOut,
}) => {
	const {
		watch,
		register,
		handleSubmit,
		setValue,
		setError,
		formState: { errors },
	} = useForm<SetUpProfileFormData>({
		resolver: yupResolver(schema),
	});

	const avatar = watch('file');

	const onAvatarChange = ([file]: File[]) => {
		setValue('file', file, {
			shouldValidate: true,
			shouldDirty: true,
		});
	};

	const onAvatarDownloadError = ([invalidFile]: FileInvalidDropzone[]) => {
		if (invalidFile.errors.includes(DropzoneErrors.MAX_SIZE)) {
			setError('file', {
				message: 'Max size 3 mb',
			});
			return;
		}
		if (invalidFile.errors.includes(DropzoneErrors.TYPE)) {
			setError('file', {
				message: 'Allowed types: jpeg, jpg, png',
			});
			return;
		}
		setError('file', { message: invalidFile.errors[0] });
	};

	const onRemoveAvatar = () => {
		setValue('file', null, {
			shouldValidate: true,
			shouldDirty: true,
		});
	};

	const handleSubmitSetUpProfileForm = (data) => {
		onSubmit(data);
	};

	return (
		<Box
			sx={{ width: '100%', maxWidth: 400 }}
			component={'form'}
			onSubmit={handleSubmit(handleSubmitSetUpProfileForm)}
		>
			<AvatarUploader
				errorMessage={errors?.file?.message as string}
				avatar={avatar}
				onChange={onAvatarChange}
				onError={onAvatarDownloadError}
				onRemove={onRemoveAvatar}
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
			<StyledButtonList>
				<Button
					label="Continue"
					type="submit"
					isLoading={isLoading}
					fullWidth
				/>
				<Button
					label="Sign Out"
					type="button"
					variant="outlined"
					disabled={isLoading}
					onClick={onSignOut}
					fullWidth
				/>
			</StyledButtonList>
		</Box>
	);
};
