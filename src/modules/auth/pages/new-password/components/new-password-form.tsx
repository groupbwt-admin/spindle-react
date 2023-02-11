import { useEffect } from 'react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	validatePassword,
	ValidationPasswordErrors,
} from 'shared/utils/validation-password';
import * as yup from 'yup';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Button } from 'shared/components/button/button';
import { PasswordInput } from 'shared/components/input/password-input';

const StyledInput = styled(PasswordInput)`
	margin-top: 47px;
	margin-bottom: 40px;
`;

const schema = yup
	.object({
		password: yup.string().test({
			name: 'password',
			test: function (value, { createError }) {
				const errors: ValidationPasswordErrors = validatePassword(value || '');

				if (errors.hasNotValue) {
					return createError({
						message: errors.hasNotValue,
					});
				}

				if (Object.keys(errors).length) {
					return createError({
						message: Object.values(errors)
							.map((error) => '– ' + error)
							.join('\n'),
					});
				}

				return true;
			},
		}),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref('password')], 'The password confirmation does not match')
			.required(),
	})
	.defined();

type NewPasswordFormData = yup.InferType<typeof schema>;

interface NewPasswordProps {
	isLoading: boolean;
	error?: string;
	onSubmit: (data: NewPasswordFormData) => void;
}

export const NewPasswordForm: React.FC<NewPasswordProps> = ({
	error,
	onSubmit,
	isLoading,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<NewPasswordFormData>({
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		setError('password', { type: 'custom', message: error });
	}, [error]);

	return (
		<Box
			sx={{ width: '100%', maxWidth: 400 }}
			component={'form'}
			onSubmit={handleSubmit(onSubmit)}
		>
			<StyledInput
				label="Password"
				placeholder="Your password"
				autoComplete="new-password"
				error={!!errors.password}
				errorText={errors.password?.message as string}
				autoFocus
				{...register('password')}
			/>
			<StyledInput
				label="Confirm password"
				placeholder="Your password confirmation"
				autoComplete="new-password-confirmation"
				error={!!errors.confirmPassword}
				errorText={errors.confirmPassword?.message as string}
				{...register('confirmPassword')}
			/>
			<Button
				label="Submit and Sign in"
				type="submit"
				isLoading={isLoading}
				fullWidth
			/>
		</Box>
	);
};
