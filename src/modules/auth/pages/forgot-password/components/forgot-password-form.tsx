import { useEffect } from 'react';
import * as React from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Button } from 'shared/components/button/button';
import { Input } from 'shared/components/input/input';

const StyledInput = styled(Input)`
	margin-top: 47px;
	margin-bottom: 40px;
`;

const schema = yup
	.object({
		email: yup.string().email().required('This field is required'),
	})
	.defined();

type ForgotPasswordData = yup.InferType<typeof schema>;

interface ForgotPasswordProps {
	isLoading: boolean;
	error?: string;
	onSubmit: (data: ForgotPasswordData) => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordProps> = ({
	error,
	isLoading,
	onSubmit,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<ForgotPasswordData>({
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
			<Button label="Send" type="submit" isLoading={isLoading} fullWidth />
		</Box>
	);
};
