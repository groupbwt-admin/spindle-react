import React from 'react';
import { styled } from "@mui/material/styles";
import AuthBg from 'shared/assets/images/auth_bg.svg'
import {  ReactComponent as Logo } from 'shared/assets/images/logo.svg'
import {AuthSlider} from "./auth-slider";

const AuthContainer = styled('div')`
	height: 100vh;
	display: flex;
`;

const AuthContentLeft = styled('div')`
	width: 50%;
	padding: 24px;
	display: flex;
	flex-direction: column;
	height: calc(100% - 48px);
`;

const AuthContentRight = styled('div')`
	width: 50%;
	background: url(${AuthBg}) no-repeat center;
	background-size: cover;
	height: calc(100% - 40px);
	display: flex;
	align-items: flex-end;
	justify-content: center;
	padding-bottom: 40px;
`;

const ContentContainer = styled('div')`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`

const LogoWrapper = styled('div')``;

export const AuthLayout:React.FC<React.PropsWithChildren> = ({children}) => {
	return (
		<AuthContainer>
			<AuthContentLeft>
				<LogoWrapper>
					<Logo />
				</LogoWrapper>
				<ContentContainer>
					{children}
				</ContentContainer>
			</AuthContentLeft>
			<AuthContentRight>
				<AuthSlider></AuthSlider>
			</AuthContentRight>
		</AuthContainer>
	)
}

