import styled from '@emotion/styled/macro';

import { FormControl, MenuItem, Select as ExternalSelect } from '@mui/material';

import { VideoPermissionsEnum } from 'shared/constants/modal-names';

import { Icon } from 'shared/components/icon/icon';
import { ICON_COLLECTION } from 'shared/components/icon/icon-list';

const StyledSelect = styled(ExternalSelect)`
	border-radius: 10px;

	fieldset {
		border-color: ${({ theme }) => theme.palette.secondary.main};
	}
`;

const StyledIcon = styled(Icon)`
	margin-right: 13px;
`;

const SelectValue = styled.div`
	display: flex;
	align-items: center;
	text-transform: none;
`;

interface SelectProps {
	value?: string;
	options: { title: string; value: VideoPermissionsEnum }[];
	onChange: (VideoPermissionsEnum) => void;
}

export const Select = ({ value, options, onChange }: SelectProps) => {
	const handleChange = (e) => {
		onChange(e.target.value);
	};

	const renderValue = (value) => (
		<SelectValue>
			<StyledIcon icon={ICON_COLLECTION.globe} />
			{options.find((option) => option.value === value)?.title}
		</SelectValue>
	);

	return (
		<FormControl>
			<StyledSelect
				autoWidth
				value={value}
				onChange={handleChange}
				inputProps={{ 'aria-label': 'Without label' }}
				renderValue={renderValue}
			>
				{options.map((option) => (
					<MenuItem value={option.value} key={option.value}>
						{option.title}
					</MenuItem>
				))}
			</StyledSelect>
		</FormControl>
	);
};
