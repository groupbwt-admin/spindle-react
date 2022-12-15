import React, { forwardRef, InputHTMLAttributes, useId } from 'react';
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
	display: block;
`;

const HelperText = styled('div')`
	margin-top: 4px;
`;

const ErrorText = styled('div')(
	({ theme }) => css`
		font-size: 0.75rem;
		color: ${theme.palette.error.main};
		padding: 4px 24px 0;
	`,
);

export interface InputProps {
	className?: string;
	type?: InputHTMLAttributes<HTMLInputElement>['type'];
	autoComplete?: InputHTMLAttributes<HTMLInputElement>['autoComplete'];
	label?: string;
	placeholder?: InputHTMLAttributes<HTMLInputElement>['placeholder'];
	error?: InputBaseProps['error'];
	helperText?: React.ReactNode;
	errorText?: React.ReactNode;
	name?: InputHTMLAttributes<HTMLInputElement>['name'];
	endAdornment?: InputBaseProps['endAdornment'];
	startAdornment?: InputBaseProps['startAdornment'];
	autoFocus?: InputHTMLAttributes<HTMLInputElement>['autoFocus'];
	tabIndex?: InputHTMLAttributes<HTMLInputElement>['tabIndex'];
	onClick?: InputHTMLAttributes<HTMLInputElement>['onClick'];
	onChange?: InputHTMLAttributes<HTMLInputElement>['onChange'];
	onBlur?: InputHTMLAttributes<HTMLInputElement>['onBlur'];
	onFocus?: InputHTMLAttributes<HTMLInputElement>['onFocus'];
}

const RootInput: React.ForwardRefRenderFunction<
	HTMLInputElement,
	InputProps
> = ({ className, label, helperText, error, errorText, ...props }, ref) => {
	const id = useId();

	return (
		<InputContainer className={className} htmlFor={id}>
			<AppLabel htmlFor={id}>{label}</AppLabel>
			<AppInput inputRef={ref} id={id} fullWidth {...props} />
			{helperText && <HelperText>{helperText}</HelperText>}
			{error && <ErrorText>{errorText}</ErrorText>}
		</InputContainer>
	);
};

export const Input = forwardRef(RootInput);
