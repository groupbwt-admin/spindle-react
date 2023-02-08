import { Button } from 'shared/components/button/button';
import { Menu, MenuItem } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { ICON_COLLECTION } from 'shared/components/icon/icon-list';
import styled from '@emotion/styled/macro';
import { Icon } from 'shared/components/icon/icon';
import { IFilterOptions } from 'modules/user/pages/profile/use-profile';

const StyledMenu = styled(Menu)`
	.MuiMenu-paper {
		min-width: 200px;
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
		background-color: ${({ theme }) => theme.palette.common.white};
		border-radius: 10px;
	}
`;

const StyledButton = styled(Button)`
	background-color: ${({ theme }) => theme.palette.common.white};
	border-radius: 10px;
	font-weight: 400;
	margin-left: 12px;
	padding: 14px 24px 13px;
`;

const StyledMenuItem = styled(MenuItem)`
	padding-bottom: 13px;
	padding-top: 13px;
	padding-left: 24px;

	&.Mui-selected {
		color: ${({ theme }) => theme.palette.primary.main};

		svg {
			fill: ${({ theme }) => theme.palette.primary.main};
		}
	}
`;

const StyledMenuIcon = styled(Icon)`
	margin-left: 13px;
`;

export interface SortOption {
	value: string;
	label: string;
}

interface SortDropdownProps {
	options: SortOption[];
	value: SortOption['value'];
	sortOptions: IFilterOptions;
	handleChangeSortField: (sortField: string) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({
	sortOptions,
	options,
	value,
	handleChangeSortField,
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const onChangeSortField = (sortField) => {
		handleChangeSortField(sortField);
		handleClose();
	};

	const open = Boolean(anchorEl);

	const selectedValue = useMemo(() => {
		return options.find((option) => option.value === value);
	}, [value]);

	return (
		<>
			<StyledButton
				label={selectedValue ? `Sort by: ${selectedValue.label}` : 'Sort by:'}
				onClick={handleClick}
				aria-controls={open ? 'sort-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				color="secondary"
				variant="outlined"
				endIcon={<Icon icon={ICON_COLLECTION.chevron_down} />}
			/>
			<StyledMenu
				id="sort-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				PaperProps={{
					style: {
						transform: 'translateX(0) translateY(8px)',
					},
				}}
			>
				{options.map((option) => (
					<StyledMenuItem
						key={option.value}
						selected={option.value === value}
						onClick={() => onChangeSortField(option.value)}
					>
						<span>{option.label}</span>
						<StyledMenuIcon
							icon={
								option.value === value
									? sortOptions.order === 'ASC'
										? ICON_COLLECTION.sort_arrow_up
										: ICON_COLLECTION.sort_arrow_down
									: ICON_COLLECTION.default_sort
							}
						/>
					</StyledMenuItem>
				))}
			</StyledMenu>
		</>
	);
};
