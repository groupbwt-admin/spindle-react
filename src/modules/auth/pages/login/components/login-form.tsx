import React from "react";
import {Box} from "@mui/material";
import {Input} from "shared/components/input/input";
import {PasswordInput} from "shared/components/input/password-input";
import {AppButton} from "shared/components/button/button";
import {SignWithGoogleBtn} from "modules/auth/components/sign-with-google-btn";
import {css, styled} from "@mui/material/styles";
import {Divider} from "@mui/material";

const StyledDivider = styled(Divider)(({ theme }) => css`
	color: ${theme.palette.text.secondary};
	margin: 40px 0;

	&::before {
		border-color: ${theme.palette.text.secondary};
	}
	&::after {
		border-color: ${theme.palette.text.secondary};
	}
`)

export const LoginForm = () => {
	return <Box sx={{width: 400}} component={'form'}>
		<SignWithGoogleBtn/>
		<StyledDivider>or</StyledDivider>
		<Input label={'Email address'} autoComplete={'email'} autoFocus placeholder={'Your email address'} type={'email'} name={'email'}/>
		<PasswordInput />
		<AppButton label={'Sign in'} type={'submit'}/>
	</Box>
}
