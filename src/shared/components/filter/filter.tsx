import * as React from 'react';
import { useState } from 'react';
import styled from '@emotion/styled/macro';
import update from 'immutability-helper';
import { IFilterOptions } from 'modules/user/pages/profile/use-profile';

import { Divider, Drawer } from '@mui/material';

import { ITag } from 'shared/types/video';

import { RequestSortType } from 'shared/constants/request-sort-type';

import { Button } from 'shared/components/button/button';
import { IconButton } from 'shared/components/button/icon-button';
import { DatePicker } from 'shared/components/calendar/date-picker';
import { Checkbox } from 'shared/components/checkbox/checkbox';
import { Icon } from 'shared/components/icon/icon';
import { ICON_COLLECTION } from 'shared/components/icon/icon-list';
import { Typography } from 'shared/components/typography/typography';

const DrawerContent = styled.div`
	width: 348px;
	height: 100%;
	padding: 24px;
	display: flex;
	flex-direction: column;
	background-color: ${({ theme }) => theme.palette.common.white};
`;

const DateContainer = styled.div`
	display: flex;
	column-gap: 12px;
	padding-top: 18px;
`;

const HeaderContainer = styled.div`
	padding-bottom: 16px;
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	justify-content: space-between;

	div {
		width: 100%;
	}
`;

const StyledClearButton = styled(Button)`
	padding: 4px 2px;
`;

const SectionContainer = styled.div`
	padding: 16px 0;
`;

const ActionContainer = styled.div`
	margin-top: auto;
	display: flex;
	column-gap: 12px;
`;

const StyledCheckbox = styled(Checkbox)`
	display: block;
	padding: 4px 0;

	span {
		text-transform: capitalize;
	}
`;

const StyledButton = styled(Button)`
	background: ${({ theme }) => theme.palette.common.white};
	border: 1px solid ${({ theme }) => theme.palette.secondary.main};
	border-radius: 10px;
	font-weight: 400;
	margin-left: 12px;
	padding: 14px 24px 13px;
`;

const StyledButtonIcon = styled(Icon)`
	width: 18px;
	height: 18px;
`;

const DEFAULT_FILTER_OPTIONS: IFilterOptions = {
	criteriaTags: [],
	dateFrom: null,
	dateTo: null,
	order: RequestSortType.ASC,
	sortField: 'created_at',
};

interface FilterProps {
	tags?: ITag[];
	initialFilterOptions: IFilterOptions;
	onApplyFilters: (filterOptions: IFilterOptions) => void;
}

export const Filter: React.FC<FilterProps> = ({
	initialFilterOptions,
	tags,
	onApplyFilters,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [filterOptions, setFilterOptions] =
		useState<IFilterOptions>(initialFilterOptions);

	const handleChangeFilterOption = (e, { id, optionName }) => {
		setFilterOptions((prevVal) => {
			if (e.target.checked) {
				return update(prevVal, { [optionName]: { $push: [id] } });
			} else {
				const idxToRemove = prevVal[optionName].findIndex((tag) => tag === id);
				return update(prevVal, {
					[optionName]: { $splice: [[idxToRemove, 1]] },
				});
			}
		});
	};

	const handleChangeDateOption = (newVal, optionName) => {
		setFilterOptions((prevVal) => {
			return { ...prevVal, [optionName]: newVal };
		});
	};

	const handleClearFilterOptions = () => {
		setFilterOptions(DEFAULT_FILTER_OPTIONS);
	};

	const handleSubmit = () => {
		onApplyFilters(filterOptions);
		toggleDrawer();
	};

	const toggleDrawer = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<>
			<StyledButton
				label="Filter"
				endIcon={<StyledButtonIcon icon={ICON_COLLECTION.filter} />}
				color="secondary"
				onClick={toggleDrawer}
			/>
			<Drawer anchor="right" open={isOpen} onClose={toggleDrawer}>
				<DrawerContent>
					<HeaderContainer>
						<Typography variant="h2">Filter</Typography>
						<IconButton onClick={toggleDrawer}>
							<Icon icon={ICON_COLLECTION.close} />
						</IconButton>
						<div>
							<StyledClearButton
								label="Clear all"
								size="small"
								variant="text"
								onClick={handleClearFilterOptions}
							/>
						</div>
					</HeaderContainer>
					<Divider />
					<SectionContainer>
						<Typography variant="h3">Date</Typography>
						<DateContainer>
							<DatePicker
								label="From"
								maxDate={filterOptions.dateTo}
								value={filterOptions.dateFrom}
								handleChange={(newVal) =>
									handleChangeDateOption(newVal, 'dateFrom')
								}
							/>
							<DatePicker
								label="To"
								minDate={filterOptions.dateFrom}
								value={filterOptions.dateTo}
								handleChange={(newVal) =>
									handleChangeDateOption(newVal, 'dateTo')
								}
							/>
						</DateContainer>
					</SectionContainer>
					{!!tags?.length && (
						<SectionContainer>
							<Typography variant="h3">Tags</Typography>
							{tags.map((tag) => (
								<StyledCheckbox
									label={tag.tag}
									checked={!!filterOptions.criteriaTags?.includes(tag.id)}
									onChange={(e) =>
										handleChangeFilterOption(e, {
											id: tag.id,
											optionName: 'criteriaTags',
										})
									}
									key={tag.id}
								/>
							))}
						</SectionContainer>
					)}
					<ActionContainer>
						<Button
							color="secondary"
							variant="outlined"
							label="Cancel"
							fullWidth
							onClick={toggleDrawer}
						/>
						<Button label="Apply Filter" fullWidth onClick={handleSubmit} />
					</ActionContainer>
				</DrawerContent>
			</Drawer>
		</>
	);
};
