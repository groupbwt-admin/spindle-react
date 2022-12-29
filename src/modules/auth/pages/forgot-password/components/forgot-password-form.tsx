import React from 'react';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box } from '@mui/material';
import { Input } from 'shared/components/input/input';
import { Button } from 'shared/components/button/button';

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
	onSubmit: (data: ForgotPasswordData) => void
}

export const ForgotPasswordForm: React.FC<ForgotPasswordProps> = ({isLoading, onSubmit}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ForgotPasswordData>({
		resolver: yupResolver(schema),
	});

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
			<Button label="Send" type="submit" isLoading={isLoading}/>
		</Box>
	);
};
