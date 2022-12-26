import React from 'react';
import { NavLink } from 'react-router-dom';
import { css } from '@mui/material/styles';
import styled from '@emotion/styled/macro';
import { Icon } from 'shared/components/icon/icon';
import { ReactComponent as Logo } from 'shared/assets/images/logo-reverse.svg';
import { ReactComponent as IconSearch } from 'shared/components/icon/collection/search.svg';
import { ReactComponent as IconVideos } from 'shared/components/icon/collection/video.svg';
import { ReactComponent as IconProfile } from 'shared/components/icon/collection/profile.svg';
import { ReactComponent as IconSettings } from 'shared/components/icon/collection/setting.svg';
import {ReactComponent as IconNotification } from 'shared/components/icon/collection/notification.svg';
import { Typography } from 'shared/components/typography/typography';
import {Avatar} from "@mui/material";
import {ICON_COLLECTION} from "shared/components/icon/icon-list";
import {IconButton} from "shared/components/button/icon-button";

const StyledLinkTitle = styled(Typography)`
	white-space: nowrap;
	opacity: 0;
	transform: translateX(-10px);
	transition: opacity 0.3s
	${({ theme }) => theme.transitions.easing.easeIn},
	transform 0.3s ${({ theme }) => theme.transitions.easing.easeIn};
`;

const LogoWrapper = styled('div')`
	width: 158px;
	cursor: pointer;
	svg {
		path:last-of-type {
			opacity: 0;
			transition: opacity 0.3s
			${({ theme }) => theme.transitions.easing.easeInOut};
		}
	}
`;

interface AppMenuProps {
	open?: boolean;
}

const StyledNavIcon = styled(Icon)`
	margin-right: 14px;
	width: 20px;
	height: 20px;
	position: relative;
	flex-shrink: 0;

	svg {
		position: absolute;
		width: 20px;
		height: 20px;
		transition: transform 1s ease;
	}
`;

const MenuContainer = styled.aside<AppMenuProps>`
	display: flex;
	flex-direction: column;
	background-color: ${({ theme }) => theme.palette.primary.main};
	height: 100%;
	width: 81px;
	border-right: 1px solid #eeedf1;
	padding: 40px 15px 32px;
	color: ${({ theme }) => theme.palette.primary.light};
	overflow: hidden;
	transition: width 0.3s ${({ theme }) => theme.transitions.easing.easeIn};


	${({ open }) =>
		open &&
		css`
			width: 236px;

			${StyledLinkTitle}, ${UserInfo} {
				transform: translateX(0);
				opacity: 1;
			}

			${LogoWrapper} {
				svg {
					path:last-of-type {
						opacity: 1;
					}
				}
			}

			${StyledNavIcon} {
				svg {
					transform: translateX(0);
				}
			}
		`}
`;

const NavContainer = styled('nav')`
	margin-top: 60px;
	flex-grow: 1;
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	li {
		margin-bottom: 24px;
	}
	li:last-child {
		margin-top: auto;
	}
`;

const UserInfoContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 0 4px;
`

const UserAvatar = styled(Avatar)`
	width: 42px;
	height: 42px;
	border: 2px solid #8192E2;
	margin-right: 10px;
	flex-shrink: 0;
`

const UserInfo = styled.div`
	white-space: nowrap;
	opacity: 0;
	transform: translateX(-10px);
	transition: opacity 0.3s
	${({ theme }) => theme.transitions.easing.easeIn},
	transform 0.3s ${({ theme }) => theme.transitions.easing.easeIn};
`

const StyledNavLink = styled(NavLink)(
	({ theme }) => css`
		padding: 13px 15px;
		color: ${theme.palette.primary.light};
		display: flex;
		align-items: center;
		border-radius: 10px;

		&.active {
			background-color: #576cd9;
			color: ${theme.palette.common.white};

			svg path {
				fill: ${theme.palette.common.white};
			}
		}
	`,
);

const StyledUserIconButton = styled(IconButton)`
	padding: 10px;
	margin-left: 6px;
`

export const AppMenu = () => {
	const [open, setOpen] = React.useState(false);

	const toggleDrawer = () => {
		setOpen((prev) => !prev);
	};

	return (
		<MenuContainer open={open}>
			<LogoWrapper onClick={toggleDrawer}>
				<Logo />
			</LogoWrapper>
			<NavContainer>
				<ul>
					<li>
						<StyledNavLink to="search">
							<StyledNavIcon icon={IconSearch} />
							<StyledLinkTitle variant="h3">Search</StyledLinkTitle>
						</StyledNavLink>
					</li>
					<li>
						<StyledNavLink to="/">
							<StyledNavIcon icon={IconVideos} />
							<StyledLinkTitle variant="h3">My Videos</StyledLinkTitle>
						</StyledNavLink>
					</li>
					<li>
						<StyledNavLink to="profile">
							<StyledNavIcon icon={IconProfile} />
							<StyledLinkTitle variant="h3">My Profile</StyledLinkTitle>
						</StyledNavLink>
					</li>
					<li>
						<StyledNavLink to="settings">
							<StyledNavIcon icon={IconSettings} />
							<StyledLinkTitle variant="h3">Settings</StyledLinkTitle>
						</StyledNavLink>
					</li>
					<li>
						<StyledNavLink to="notifications">
							<StyledNavIcon icon={IconNotification} />
							<StyledLinkTitle variant="h3">Notifications</StyledLinkTitle>
						</StyledNavLink>
					</li>
				</ul>
			</NavContainer>
			<UserInfoContainer>
				<UserAvatar />
				<UserInfo>
					<Typography variant='h3'>
						Oliver Brown
					</Typography>
					<Typography variant='body2'>
						Administrator
					</Typography>
				</UserInfo>
				<StyledUserIconButton>
					<Icon icon={ICON_COLLECTION.chevron_down} />
				</StyledUserIconButton>
			</UserInfoContainer>
		</MenuContainer>
	);
};
