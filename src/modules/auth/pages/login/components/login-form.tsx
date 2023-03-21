import { useEffect } from 'react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthLink } from 'modules/auth/components/link';
import { GoogleAuthButtonWidget } from 'shared/widgets/google-auth-button/google-auth-button';
import * as yup from 'yup';

import { Box, Divider } from '@mui/material';
import { css, styled } from '@mui/material/styles';

import { AUTH_ROUTES } from 'shared/config/routes';
import {
	validatePassword,
	ValidationPasswordErrors,
} from 'shared/utils/validation-password';

import { Button } from 'shared/components/button/button';
import { Input } from 'shared/components/input/input';
import { PasswordInput } from 'shared/components/input/password-input';
import { Typography } from 'shared/components/typography/typography';

const StyledInput = styled(Input)`
	margin-top: 47px;
`;

const StyledPasswordInput = styled(PasswordInput)`
	margin-top: 36px;
	margin-bottom: 36px;
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

const ForgotPasswordText = styled(Typography)`
	text-align: right;
`;

const schema = yup
	.object({
		email: yup.string().email().required('This field is required'),
		password: yup.string().test({
			name: 'password',
			test: function (value, { createError }) {
				const errors: ValidationPasswordErrors = validatePassword(value || '');

				if (Object.keys(errors).length) {
					return createError({ message: Object.values(errors).join(';\n') });
				}

				return true;
			},
		}),
	})
	.defined();

type LoginFormData = yup.InferType<typeof schema>;

interface LoginFormProps {
	isLoading: boolean;
	error?: string;
	onSubmit: (data: LoginFormData) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
	error,
	isLoading,
	onSubmit,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<LoginFormData>({
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		setError('email', { type: 'custom', message: error });
	}, [error]);

	return (
		<Box
			sx={{ width: '100%', maxWidth: 400 }}
			component={'form'}
			onSubmit={handleSubmit(onSubmit)}
		>
			<GoogleAuthButtonWidget label="Sign In with Google" />
			<StyledDivider>or</StyledDivider>
			<StyledInput
				data-test-id="email-login"
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
				data-test-id="password-login"
				placeholder="Your password"
				{...register('password')}
				helperText={
					<ForgotPasswordText variant="subtitle2">
						<AuthLink to={AUTH_ROUTES.FORGOT_PASSWORD.path}>
							Forgot password?
						</AuthLink>
					</ForgotPasswordText>
				}
				error={!!errors.password}
				errorText={errors.password?.message as string}
			/>
			<Button label="Sign in" type="submit" isLoading={isLoading} fullWidth />
		</Box>
	);
};
