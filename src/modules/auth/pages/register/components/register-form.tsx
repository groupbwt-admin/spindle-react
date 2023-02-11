import * as React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { AuthLink } from 'modules/auth/components/link';
import * as yup from 'yup';

import { Box, Divider, Typography } from '@mui/material';
import { css, styled } from '@mui/material/styles';

import { Button } from 'shared/components/button/button';
import { Checkbox } from 'shared/components/checkbox/checkbox';
import { Input } from 'shared/components/input/input';
import { PasswordInput } from 'shared/components/input/password-input';
import {
	validatePassword,
	ValidationPasswordErrors,
} from 'shared/utils/validation-password';
import { GoogleAuthButtonWidget } from 'shared/widgets/google-auth-button/google-auth-button';

const StyledInput = styled(Input)`
	margin-top: 47px;
`;

const StyledPasswordInput = styled(PasswordInput)`
	margin-top: 32px;
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

const StyledCheckbox = styled(Checkbox)`
	margin-top: 4px;
	margin-bottom: 38px;
`;

const StyledCheckboxLabel = styled(Typography)`
	line-height: 12px;
`;

const CheckboxLabel = (
	<StyledCheckboxLabel variant="subtitle2">
		By signing up, I agree to Spindle’s{' '}
		<AuthLink to={'/terms-of-use'}>Terms</AuthLink> and{' '}
		<AuthLink to={'/privacy-policy'}>Privacy Policy</AuthLink>.
	</StyledCheckboxLabel>
);

const schema = yup
	.object({
		email: yup.string().email().required('This field is required'),
		password: yup
			.string()
			.test({
				name: 'password',
				test: function (value, { createError }) {
					const errors: ValidationPasswordErrors = validatePassword(
						value || '',
					);

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
			})
			.required(),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref('password')], 'The password confirmation does not match')
			.required(),
	})
	.defined();

export type RegisterFormData = yup.InferType<typeof schema>;

interface RegisterFormProps {
	isLoading: boolean;
	error?: string;
	onSubmit: (data: RegisterFormData) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
	error,
	isLoading,
	onSubmit,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<RegisterFormData>({
		resolver: yupResolver(schema),
	});

	const [isTermsAgreed, setIsTermsAgreed] = useState(false);

	useEffect(() => {
		setError('email', { type: 'custom', message: error });
	}, [error]);

	const handleTermsAgreement = (val) => {
		setIsTermsAgreed(val.target.checked);
	};

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
			<StyledCheckbox
				label={CheckboxLabel}
				checked={isTermsAgreed}
				required
				onChange={handleTermsAgreement}
			/>
			<Button
				label="Verify Email Address"
				type="submit"
				disabled={!isTermsAgreed}
				isLoading={isLoading}
				fullWidth
			/>
		</Box>
	);
};
