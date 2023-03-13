import React, { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled/macro';

import { Tooltip } from '@mui/material';

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

const StyledMenu = styled.div`
	background-color: ${({ theme }) => theme.palette.common.white};
	min-width: 280px;
	box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
	border-radius: 10px;
	padding: 12px 16px;
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
	return (
		<>
			<Tooltip
				placement="right-end"
				disableHoverListener={disabled}
				slots={{ tooltip: StyledMenu }}
				title={
					<>
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
					</>
				}
			>
				<UserInfoContainer>{children}</UserInfoContainer>
			</Tooltip>
		</>
	);
};
