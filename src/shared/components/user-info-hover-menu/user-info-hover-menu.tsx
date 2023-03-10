import React, { PropsWithChildren, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled/macro';

import { Menu } from '@mui/material';

import { IUser } from 'shared/types/user';

import { USER_ROUTES } from 'shared/config/routes';
import { getUserAvatarURL } from 'shared/utils/get-file-url';

import { Avatar } from 'shared/components/avatar/avatar';
import { Button } from 'shared/components/button/button';
import { Typography } from 'shared/components/typography/typography';

const UserInfoContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 0 4px;
	cursor: pointer;
`;

const UserAvatar = styled(Avatar)`
	margin-right: 10px;
`;

const StyledMenu = styled(Menu)`
	.MuiMenu-paper {
		min-width: 280px;
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
		border-radius: 10px;
		padding: 12px 16px;
	}
`;

const UserInfo = styled.div`
	max-width: calc(100% - 92px);

	p {
		overflow: hidden;
		max-width: 100%;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
`;

const MenuUserBio = styled.div`
	display: flex;
	align-items: center;
	padding-bottom: 12px;
	border-bottom: 1px solid ${({ theme }) => theme.palette.secondary.main};
	margin-bottom: 8px;
`;

const MenuUserVideosInfo = styled(Typography)`
	color: #8a91a6;
`;

type UserInfoHoverMenuProps = {
	user: IUser;
	disabled?: boolean;
	isCurrentUser?: boolean;
};

export const UserInfoHoverMenu: React.FC<
	PropsWithChildren<UserInfoHoverMenuProps>
> = ({ user, disabled, isCurrentUser, children }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleMouseEnter = (
		event:
			| React.MouseEvent<HTMLDivElement>
			| React.MouseEvent<HTMLUListElement>,
	) => {
		if (disabled) return;
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	return (
		<>
			<UserInfoContainer
				onClick={handleMouseEnter}
				onMouseOver={handleMouseEnter}
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
			>
				{children}
			</UserInfoContainer>
			<StyledMenu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
					onMouseLeave: handleClose,
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
					<UserAvatar
						src={getUserAvatarURL(user.avatar)}
						alt={user.firstName}
					/>
					<UserInfo>
						<Typography variant="h3">{`${user.firstName} ${user.lastName}`}</Typography>
						<MenuUserVideosInfo variant="body2">
							{user.countVideo} videos
						</MenuUserVideosInfo>
					</UserInfo>
				</MenuUserBio>
				<Button
					label="View Profile"
					fullWidth
					component={Link}
					to={
						isCurrentUser
							? USER_ROUTES.MY_PROFILE.path
							: USER_ROUTES.USER.generate(user.id as string)
					}
				/>
			</StyledMenu>
		</>
	);
};
