import React from "react";
import { AuthLayout } from "modules/auth/components/layout";
import { Typography } from "shared/components/typography/typography";
import {LoginForm} from "modules/auth/pages/login/components/login-form";
import {styled} from "@mui/material/styles";
import {Link} from 'react-router-dom'

const LoginContainer = styled('div')`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	justify-content: center;
`

const LoginHeader = styled(Typography)`
	margin-bottom: 40px;
	text-align: center;
	margin-top: auto;
`

const LoginFootnote = styled(Typography)`
	margin-top: auto;
`

export const Login = () => {
	return <AuthLayout>
		<LoginContainer>
			<LoginHeader variant='h1' component='h1' >
				Sign in to Spindle
			</LoginHeader>
			{/*<Typography variant='body1' >*/}
			{/*	Enter your registered email address and we’ll send you a link to reset your password.*/}
			{/*</Typography>*/}
			<LoginForm/>
			<LoginFootnote variant={'body2'}>
				Don’t have an account? <Link to={'/register'}>Sign up</Link>
			</LoginFootnote>
		</LoginContainer>
	</AuthLayout>
}

