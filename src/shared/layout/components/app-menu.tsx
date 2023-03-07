import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled/macro';
import { useRecordContext } from 'modules/videos/hooks/use-record-context';
import { ReactComponent as Logo } from 'shared/assets/images/logo-reverse.svg';
import { UserMenu } from 'shared/layout/components/user-menu';

import { css } from '@mui/material/styles';

import { IconButton } from 'shared/components/button/icon-button';
import { ReactComponent as IconProfile } from 'shared/components/icon/collection/profile.svg';
import { ReactComponent as IconSearch } from 'shared/components/icon/collection/search.svg';
import { ReactComponent as IconVideos } from 'shared/components/icon/collection/video.svg';
import { Icon } from 'shared/components/icon/icon';
import { ICON_COLLECTION } from 'shared/components/icon/icon-list';
import { Typography } from 'shared/components/typography/typography';

const StyledLinkTitle = styled(Typography)`
	white-space: nowrap;
	opacity: 0;
	transform: translateX(-10px);
	transition: opacity 0.3s ${({ theme }) => theme.transitions.easing.easeIn},
		transform 0.3s ${({ theme }) => theme.transitions.easing.easeIn};
`;

const StyledLogo = styled(Logo)`
	path:last-of-type {
		opacity: 0;
		transition: opacity 0.3s
			${({ theme }) => theme.transitions.easing.easeInOut};
	}
`;

const StyledToggleMenuBtn = styled(IconButton)`
	padding: 15px 16px;
	background: #576cd9 !important;
	border-radius: 10px;
	position: absolute;
	z-index: 5;
	left: 0;
	top: 0;
	opacity: 0;
	transition: opacity 0.3s ${({ theme }) => theme.transitions.easing.sharp};

	svg {
		color: ${({ theme }) => theme.palette.common.white};
	}
`;

const LogoWrapper = styled('div')<{ isDisabled: boolean }>`
	width: 158px;
	cursor: ${(props) => (props.isDisabled ? 'not-allowed' : 'pointer')};
	position: relative;

	&:hover {
		${StyledToggleMenuBtn} {
			opacity: 1;
		}
	}
}
`;

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

const MenuContainer = styled.aside<{
	open?: boolean;
}>`
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	height: 100%;
	width: 81px;
	padding: 40px 15px 32px;
	color: ${({ theme }) => theme.palette.primary.light};
	border-right: 1px solid ${({ theme }) => theme.palette.secondary.main};
	background-color: ${({ theme }) => theme.palette.primary.main};
	overflow: hidden;
	transition: width 0.3s ${({ theme }) => theme.transitions.easing.easeIn};

	&:hover {
		${StyledToggleMenuBtn} {
			opacity: 1;
		}
	}

	${({ open }) =>
		open &&
		css`
			width: 236px;

			${StyledLinkTitle} {
				transform: translateX(0);
				opacity: 1;
			}

			${LogoWrapper} {
				${StyledLogo} {
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
`;

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

export const AppMenu = () => {
	const [open, setOpen] = useState(false);
	const { isRecording } = useRecordContext();
	const toggleDrawer = () => {
		setOpen((prev) => !prev);
	};

	return (
		<MenuContainer open={open}>
			<LogoWrapper
				onClick={isRecording ? undefined : toggleDrawer}
				isDisabled={isRecording}
			>
				<StyledLogo />
				<StyledToggleMenuBtn>
					<Icon
						icon={open ? ICON_COLLECTION.hide_menu : ICON_COLLECTION.open_menu}
					/>
				</StyledToggleMenuBtn>
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
				</ul>
			</NavContainer>
			<UserMenu expanded={open} />
		</MenuContainer>
	);
};
