import { forwardRef } from 'react';
import * as React from 'react';
import { Input, InputProps } from './input';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Icon } from 'shared/components/icon/icon';
import { IconButton } from 'shared/components/button/icon-button';
import { ReactComponent as ShowPasswordIcon } from 'shared/components/icon/collection/show-password.svg';
import { ReactComponent as HidePasswordIcon } from 'shared/components/icon/collection/hide-password.svg';
import { InputAdornment } from '@mui/material';

const StyledInput = styled(Input)`
`;

type PasswordInputProps = InputProps;

export const RootPasswordInput: React.ForwardRefRenderFunction<
	HTMLInputElement,
	PasswordInputProps
> = (props, ref) => {
	const [isDisplayedPassword, setIsDisplayedPassword] = useState(false);
	const toggleShowPassword = () =>
		setIsDisplayedPassword((prevValue) => !prevValue);

	const InputButton = (
		<InputAdornment
			position='end'
			sx={{ position: 'absolute', right: 7, top: 27 }}
		>
			<IconButton onClick={toggleShowPassword}>
				<Icon
					icon={isDisplayedPassword ? HidePasswordIcon : ShowPasswordIcon}
				/>
			</IconButton>
		</InputAdornment>
	);

	return (
		<StyledInput
			ref={ref}
			type={isDisplayedPassword ? 'text' : 'password'}
			endAdornment={InputButton}
			{...props}
		/>
	);
};

export const PasswordInput = forwardRef(RootPasswordInput);
