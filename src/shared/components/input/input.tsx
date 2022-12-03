import React, { useId } from 'react';
import { InputLabel } from '@mui/material';
import { InputBase, InputBaseProps } from '@mui/material';
import { styled, css } from '@mui/material/styles';

const AppInput = styled(InputBase)(
	({ theme }) => css`
		input {
			background-color: #ffffff;
			border: 1px solid #eeeff1;
			border-radius: 10px;
			padding: 14px 12px;
			transition: border-color 0.3s ${theme.transitions.easing.easeIn};

			&::placeholder {
				color: ${theme.palette.text.secondary};
			}

			&:focus {
				border-color: ${theme.palette.primary.main};
			}
		}
		&.Mui-error input {
			border-color: ${theme.palette.error.main};
		}
	`,
);

const AppLabel = styled(InputLabel)(
	({ theme }) => css`
		color: ${theme.palette.text.primary};
		padding-bottom: 12px;
	`,
);

const InputContainer = styled('label')`
	margin: 32px 0;
	display: block;
`;

const ErrorText = styled('div')(
	({ theme }) => css`
		font-size: 0.75rem;
		color: ${theme.palette.error.main};
		padding: 4px 24px 0;
	`,
);

interface InputProps {
	autoComplete?: InputBaseProps['autoComplete'];
	label: string;
	placeholder: InputBaseProps['placeholder'];
	error?: InputBaseProps['error'];
	type?: InputBaseProps['type'];
	name?: InputBaseProps['name'],
	endAdornment?: InputBaseProps['endAdornment'];
	autoFocus?: InputBaseProps['autoFocus'];
}

export const Input: React.FC<InputProps> = ({
	label,
	autoComplete,
	autoFocus,
	placeholder,
	error,
	type,
	name,
	endAdornment,
}) => {
	const id = useId();

	return (
		<InputContainer>
			<AppLabel htmlFor={id}>{label}</AppLabel>
			<AppInput
				autoComplete={autoComplete}
				autoFocus={autoFocus}
				fullWidth
				id={id}
				name={name}
				placeholder={placeholder}
				error={error}
				type={type}
				endAdornment={endAdornment}
			/>
			{error && <ErrorText>Error text</ErrorText>}
		</InputContainer>
	);
};
