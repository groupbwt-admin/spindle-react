import React from 'react';
import styled from '@emotion/styled/macro';

import { Menu, MenuItem } from '@mui/material';

import { IconButton } from '../../../shared/components/button/icon-button';
import { Icon } from '../../../shared/components/icon/icon';
import { ICON_COLLECTION } from '../../../shared/components/icon/icon-list';

const StyledMenuButton = styled(IconButton)`
	padding: 0px;
	&.open {
		opacity: 1 !important;
	}
`;

const StyledMenu = styled(Menu)`
	.MuiMenu-paper {
		min-width: 200px;
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
		background-color: ${({ theme }) => theme.palette.common.white};
		border-radius: 10px;
	}
`;
const StyledMenuItem = styled(MenuItem)`
	padding-bottom: 13px;
	padding-top: 13px;
	padding-left: 24px;
	transition: color 0.3s ease;

	svg path {
		transition: all 0.3s ease;
	}

	&.Mui-selected {
		background-color: transparent;
		color: ${({ theme }) => theme.palette.primary.main};

		svg path {
			stroke: ${({ theme }) => theme.palette.primary.main};
		}
	}
`;

const StyledMenuIcon = styled(Icon)`
	margin-right: 13px;
`;

interface ICommentMenu {
	handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
	handleEdit: () => void;
	open: boolean;
	anchorEl: null | HTMLElement;
}

const CommentMenu: React.FC<ICommentMenu> = ({
	handleClick,
	handleClose,
	handleEdit,
	anchorEl,
	open,
}) => {
	return (
		<>
			<StyledMenuButton
				onClick={handleClick}
				aria-controls={'video-menu'}
				aria-haspopup="true"
				aria-expanded={'true'}
			>
				<Icon icon={ICON_COLLECTION.action_menu} />
			</StyledMenuButton>

			<StyledMenu
				id="video-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				PaperProps={{
					style: {
						transform: 'translateX(0) translateY(8px)',
					},
				}}
			>
				<StyledMenuItem onClick={handleEdit}>
					<StyledMenuIcon icon={ICON_COLLECTION.edit} />
					<span>Edit</span>
				</StyledMenuItem>
				<StyledMenuItem>
					<StyledMenuIcon icon={ICON_COLLECTION.delete} />
					<span>Delete</span>
				</StyledMenuItem>
			</StyledMenu>
		</>
	);
};

export default CommentMenu;
