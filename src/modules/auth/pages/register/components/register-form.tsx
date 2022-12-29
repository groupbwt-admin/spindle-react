import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Divider } from '@mui/material';
import { Input } from 'shared/components/input/input';
import { PasswordInput } from 'shared/components/input/password-input';
import { Button } from 'shared/components/button/button';
import { css, styled } from '@mui/material/styles';
import {
	validatePassword,
	ValidationPasswordErrors,
} from 'shared/utils/validation-password';
import { GoogleAuthButtonWidget } from 'shared/widgets/google-auth-button/google-auth-button';

const StyledInput = styled(Input)`
	margin-top: 47px;
`;

const StyledPasswordInput = styled(PasswordInput)`
	margin-top: 36px;
	margin-bottom: 40px;
`;

const StyledDivider = styled(Divider)(
	({ theme }) => css`
		color: ${theme.palette.text.secondary};
		margin: 42px 0;

		&::before {
			border-color: ${theme.palette.text.secondary};
		}

		&::after {
			border-color: ${theme.palette.text.secondary};
		}
	`,
);

const schema = yup
	.object({
		email: yup.string().email().required('This field is required'),
		password: yup.string().test({
			name: 'password',
			test: function (value, { createError }) {
				const errors: ValidationPasswordErrors = validatePassword(value || '');

				if (errors.hasNotValue) {
					return createError({
						message: Object.values(errors).join(',  '),
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

type RegisterFormData = yup.InferType<typeof schema>;

interface RegisterFormProps {
	isLoading: boolean;
	onSubmit: (data: RegisterFormData) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
	isLoading,
	onSubmit,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: yupResolver(schema),
	});

	return (
		<Box
			sx={{ width: '100%', maxWidth: 400 }}
			component={'form'}
			onSubmit={handleSubmit(onSubmit)}
		>
			<GoogleAuthButtonWidget label="Sign Up with Google" />
			<StyledDivider>or</StyledDivider>
			<StyledInput
				type="email"
				label="Email address"
				placeholder="Your email address"
				autoComplete="email"
				error={!!errors.email}
				errorText={errors.email?.message as string}
				autoFocus
				{...register('email')}
			/>
			<StyledPasswordInput
				label="Password"
				placeholder="Your password"
				{...register('password')}
				error={!!errors.password}
				errorText={errors.password?.message as string}
			/>
			<StyledPasswordInput
				label="Confirm password"
				placeholder="Password"
				{...register('confirmPassword')}
				error={!!errors.confirmPassword}
				errorText={errors.confirmPassword?.message as string}
			/>
			<Button
				label="Verify Email Address"
				type="submit"
				isLoading={isLoading}
				fullWidth
			/>
		</Box>
	);
};
