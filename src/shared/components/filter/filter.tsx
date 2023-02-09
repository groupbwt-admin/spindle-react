import * as React from 'react';
import { useState } from 'react';
import update from 'immutability-helper';
import { Button } from 'shared/components/button/button';
import { Icon } from 'shared/components/icon/icon';
import { ICON_COLLECTION } from 'shared/components/icon/icon-list';
import { Divider, Drawer, TextField } from '@mui/material';
import { Typography } from 'shared/components/typography/typography';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import styled from '@emotion/styled/macro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { Checkbox } from 'shared/components/checkbox/checkbox';
import { IconButton } from 'shared/components/button/icon-button';
import { ITag } from 'shared/types/video';
import { IFilterOptions } from 'modules/user/pages/profile/use-profile';

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
	padding-top: 12px;
`;

const HeaderContainer = styled.div`
	padding-bottom: 40px;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
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
`;

const StyledButton = styled(Button)`
	background: #ffffff;
	border: 1px solid #eeeff1;
	border-radius: 10px;
	font-weight: 400;
	margin-left: 12px;
	padding: 14px 24px 13px;
`;

const StyledButtonIcon = styled(Icon)`
	width: 18px;
	height: 18px;
`;

interface FilterProps {
	tags: ITag[];
	initialFilterOptions: IFilterOptions;
}

export const Filter: React.FC<FilterProps> = ({
	initialFilterOptions,
	tags,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [from, setFrom] = useState<Dayjs | null>(null);
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
					</HeaderContainer>
					<Divider />
					<SectionContainer>
						<Typography variant="h3">Date</Typography>
						<DateContainer>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									label="From"
									value={from}
									onChange={(newValue) => {
										setFrom(newValue);
									}}
									renderInput={(params) => <TextField {...params} />}
								/>
								<DatePicker
									label="To"
									value={from}
									onChange={(newValue) => {
										setFrom(newValue);
									}}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						</DateContainer>
					</SectionContainer>
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
					<ActionContainer>
						<Button
							color="secondary"
							variant="outlined"
							label="Cancel"
							fullWidth
						/>
						<Button label="Apply Filter" fullWidth />
					</ActionContainer>
				</DrawerContent>
			</Drawer>
		</>
	);
};
