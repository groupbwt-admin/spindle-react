import * as React from 'react';
import * as yup from 'yup';
import styled from '@emotion/styled/macro';
import { Box } from '@mui/material';
import { Input } from 'shared/components/input/input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AvatarUploader } from 'shared/components/avatar-uploader/avatar-uploader';
import { IUser } from 'shared/types/user';
import {
	DropzoneErrors,
	FileInvalidDropzone,
} from 'shared/components/input/file-input';
import {getUserAvatarURL} from "shared/utils/get-file-url";

const FormGroup = styled.div`
	display: flex;
	gap: 24px;

	& > * {
		flex-grow: 1;
	}
`;

const StyledAvatarUploader = styled(AvatarUploader)`
	margin-bottom: 32px;
`;

const FormContainer = styled.div`
	padding: 48px 32px;
`;

const schema = yup
	.object({
		firstName: yup.string().trim().required(),
		lastName: yup.string().trim().required(),
		avatar: yup.mixed(),
	})
	.defined();

type SetUpProfileFormData = yup.InferType<typeof schema>;

interface SetUpProfileFormProps {
	user?: IUser | null;
	isLoading: boolean;
	onSubmit: (data: SetUpProfileFormData) => void;
}

export const EditUserForm: React.FC<
	React.PropsWithChildren<SetUpProfileFormProps>
> = ({ user, isLoading, onSubmit, children }) => {
	const {
		register,
		watch,
		setValue,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<SetUpProfileFormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			firstName: user?.firstName,
			lastName: user?.lastName,
			avatar: user ? getUserAvatarURL(user.avatar) : undefined
		},
	});

	const avatar = watch('avatar');

	const onAvatarChange = ([file]: File[]) => {
		setValue('avatar', file, {
			shouldValidate: true,
			shouldDirty: true,
		});
	};

	const onAvatarDownloadError = ([invalidFile]: FileInvalidDropzone[]) => {
		if (invalidFile.errors.includes(DropzoneErrors.MAX_SIZE)) {
			setError('avatar', {
				message: 'Max size 3 mb',
			});
			return;
		}
		if (invalidFile.errors.includes(DropzoneErrors.TYPE)) {
			setError('avatar', {
				message: 'Allowed types: jpeg, jpg, png',
			});
			return;
		}
		setError('avatar', { message: invalidFile.errors[0] });
	};

	const onRemoveAvatar = () => {
		setValue('avatar', null, {
			shouldValidate: true,
			shouldDirty: true,
		});
	};

	const handleSubmitSetUpProfileForm = (data) => {
		onSubmit(data);
	};

	return (
		<Box
			sx={{ width: '100%' }}
			component={'form'}
			onSubmit={handleSubmit(handleSubmitSetUpProfileForm)}
		>
			<FormContainer>
				<StyledAvatarUploader
					onChange={onAvatarChange}
					onError={onAvatarDownloadError}
					onRemove={onRemoveAvatar}
					errorMessage={errors?.avatar?.message as string}
					avatar={avatar}
				/>
				<FormGroup>
					<Input
						type="first-name"
						label="First name"
						placeholder="Your first name"
						autoComplete="first-name"
						error={!!errors.firstName}
						errorText={errors.firstName?.message as string}
						autoFocus
						{...register('firstName')}
					/>
					<Input
						type="last-name"
						label="Last name"
						placeholder="Your last name"
						autoComplete="last-name"
						error={!!errors.lastName}
						errorText={errors.lastName?.message as string}
						{...register('lastName')}
					/>
				</FormGroup>
			</FormContainer>
			{children}
		</Box>
	);
};
