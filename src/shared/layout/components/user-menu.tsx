import React, { useState } from 'react';
import styled from '@emotion/styled/macro';
import { Menu, MenuItem } from '@mui/material';
import { css } from '@mui/material/styles';
import { useLogout } from 'shared/hooks/use-logout';
import { selectUserData } from 'app/store/user/selects';
import { APP_ROLE_NAMES } from 'shared/constants/roles';
import { Typography } from 'shared/components/typography/typography';
import { Icon } from 'shared/components/icon/icon';
import { ICON_COLLECTION } from 'shared/components/icon/icon-list';
import { Avatar } from 'shared/components/avatar/avatar';

const UserInfo = styled.div`
	max-width: calc(100% - 92px);
	opacity: 0;
	color: ${({ theme }) => theme.palette.primary.light};
	transform: translateX(-10px);
	transition: opacity 0.3s ${({ theme }) => theme.transitions.easing.easeIn},
		transform 0.3s ${({ theme }) => theme.transitions.easing.easeIn};

	p {
		overflow: hidden;
		max-width: 100%;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
`;

const UserInfoContainer = styled.div<{
	expanded: boolean;
}>`
	display: flex;
	align-items: center;
	padding: 0 4px;
	color: ${({ theme }) => theme.palette.primary.light};
	cursor: pointer;

	${({ expanded }) =>
		expanded &&
		css`
			${UserInfo} {
				transform: translateX(0);
				opacity: 1;
			}
		`}
`;

const UserAvatar = styled(Avatar)`
	margin-right: 10px;
`;

const StyledUserIcon = styled(Icon)<{
	open: boolean;
}>`
	padding: 10px;
	margin-left: 6px;
	transition: transform 0.3s ease;

	${({ open }) =>
		open &&
		css`
			transform: rotate(180deg);
		`}
`;

const StyledMenu = styled(Menu)`
	.MuiMenu-paper {
		min-width: 280px;
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
		border-radius: 10px;
	}
`;

const MenuUserBio = styled.div`
	display: flex;
	align-items: center;
	padding: 12px 16px;
	border-bottom: 1px solid #eeedf1;
	margin-bottom: 8px;

	${UserInfo} {
		transform: translateX(0);
		opacity: 1;
		color: #000000;
	}
`;

const MenuUserVideosInfo = styled(Typography)`
	color: #8a91a6;
`;

const StyledIcon = styled(Icon)`
	margin-right: 10px;
`;

const StyledMenuItem = styled(MenuItem)`
	padding-bottom: 13px;
	padding-top: 13px;
	padding-left: 24px;
`;

interface UserMenuProps {
	expanded: boolean;
}

export const UserMenu: React.FC<UserMenuProps> = ({ expanded }) => {
	const useLogoutHook = useLogout();
	const user = selectUserData();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleEditProfile = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		useLogoutHook.logout();
		setAnchorEl(null);
	};

	if (!user) return <></>;

	const userName = `${user.firstName} ${user.lastName}`;
	const userRole = APP_ROLE_NAMES[user.role];
	const open = Boolean(anchorEl);

	return (
		<>
			<UserInfoContainer
				expanded={expanded}
				onClick={handleClick}
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
			>
				<UserAvatar src={user.avatar} alt={userName} />
				<UserInfo>
					<Typography variant="h3">{userName}</Typography>
					{userRole && <Typography variant="body2">{userRole}</Typography>}
				</UserInfo>
				<StyledUserIcon icon={ICON_COLLECTION.chevron_down} open={open} />
			</UserInfoContainer>
			<StyledMenu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				PaperProps={{
					style: {
						transform: 'translateX(0) translateY(-8px)',
					},
				}}
			>
				<MenuUserBio>
					<UserAvatar src={user.avatar} alt={userName} />
					<UserInfo>
						<Typography variant="h3">{userName}</Typography>
						<MenuUserVideosInfo variant="body2">8 videos</MenuUserVideosInfo>
					</UserInfo>
				</MenuUserBio>
				<StyledMenuItem onClick={handleEditProfile}>
					<StyledIcon icon={ICON_COLLECTION.edit} />
					Edit Profile
				</StyledMenuItem>
				<StyledMenuItem onClick={handleLogout}>
					<StyledIcon icon={ICON_COLLECTION.logout} />
					Logout
				</StyledMenuItem>
			</StyledMenu>
		</>
	);
};
