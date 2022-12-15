import React from 'react';
import { styled } from '@mui/material/styles';
import AuthBg from 'shared/assets/images/auth_bg.svg';
import { ReactComponent as Logo } from 'shared/assets/images/logo.svg';
import { AuthSlider } from './auth-slider';

const AuthContainer = styled('div')`
	display: flex;
	height: 100vh;
`;

const AuthContentLeft = styled('div')`
	display: flex;
	flex-direction: column;
	width: 50%;
	padding: 80px 24px;
`;

const AuthContentRight = styled('div')`
	display: flex;
	align-items: flex-end;
	justify-content: center;
	width: 50%;
	padding: 24px;
	background: url(${AuthBg}) no-repeat center;
	background-size: cover;
`;

const ContentContainer = styled('div')`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
`;

const LogoWrapper = styled('div')`
	position: absolute;
	top: 24px;
`;


export const AuthLayout: React.FC<React.PropsWithChildren> = ({
	children
}) => {
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
				<AuthSlider />
			</AuthContentRight>
		</AuthContainer>
	);
};
