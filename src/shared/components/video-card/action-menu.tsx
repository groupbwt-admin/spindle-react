import React, { useState } from 'react';
import styled from '@emotion/styled/macro';
import { Menu, MenuItem } from '@mui/material';
import { IconButton } from 'shared/components/button/icon-button';
import { ICON_COLLECTION } from 'shared/components/icon/icon-list';
import { Icon } from 'shared/components/icon/icon';
import clsx from 'clsx';

const StyledMenu = styled(Menu)`
	.MuiMenu-paper {
		min-width: 200px;
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
		border-radius: 10px;
	}
`;

const StyledButton = styled(IconButton)`
	&.open {
		opacity: 1 !important;
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

interface VideoActionMenuProps {
	className?: string;
	isLinkCopied: boolean;
	onDownload: (event: React.MouseEvent<HTMLLIElement>) => void;
	onCopyLink: (event: React.MouseEvent<HTMLLIElement>) => void;
	onDelete: (event: React.MouseEvent<HTMLLIElement>) => void;
}

export const ActionMenu: React.FC<VideoActionMenuProps> = ({
	className,
	isLinkCopied,
	onDownload,
	onDelete,
	onCopyLink,
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (event) => {
		event.stopPropagation();
		setAnchorEl(null);
	};

	return (
		<>
			<StyledButton
				onClick={handleClick}
				aria-controls={open ? 'video-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				className={clsx(className, open && 'open')}
			>
				<Icon icon={ICON_COLLECTION.action_menu} />
			</StyledButton>
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
				<StyledMenuItem onClick={(e) => onCopyLink(e)} selected={isLinkCopied}>
					<StyledMenuIcon icon={ICON_COLLECTION.copy_link} />
					<span>{isLinkCopied ? 'Copied' : 'Copy link'}</span>
				</StyledMenuItem>
				<StyledMenuItem>
					<StyledMenuIcon icon={ICON_COLLECTION.settings} />
					<span>Settings</span>
				</StyledMenuItem>
				<StyledMenuItem onClick={(e) => onDownload(e)}>
					<StyledMenuIcon icon={ICON_COLLECTION.download} />
					<span>Download</span>
				</StyledMenuItem>
				<StyledMenuItem onClick={(e) => onDelete(e)}>
					<StyledMenuIcon icon={ICON_COLLECTION.delete} />
					<span>Delete</span>
				</StyledMenuItem>
			</StyledMenu>
		</>
	);
};
