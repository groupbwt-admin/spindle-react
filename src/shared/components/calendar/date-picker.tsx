import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
	DatePicker as ExternalDatePicker,
	LocalizationProvider,
} from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import * as React from 'react';
import { Dayjs } from 'dayjs';
import styled from '@emotion/styled/macro';
import { Icon } from 'shared/components/icon/icon';
import { ICON_COLLECTION } from 'shared/components/icon/icon-list';

const StyledInput = styled(TextField)`
	.MuiInputBase-root {
		border-radius: 10px;
		color: ${({ theme }) => theme.palette.text.secondary};
	}

	&::placeholder {
		color: ${({ theme }) => theme.palette.text.secondary};
	}
`;

interface CalendarProps {
	label: string;
	value: Dayjs | null;
	handleChange: (
		value: Dayjs | null,
		keyboardInputValue?: string | undefined,
	) => void;
	maxDate?: Dayjs | null;
	minDate?: Dayjs | null;
}

export const DatePicker: React.FC<CalendarProps> = ({
	maxDate,
	minDate,
	label,
	value,
	handleChange,
}) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<ExternalDatePicker
				value={value}
				maxDate={maxDate}
				minDate={minDate}
				disableFuture
				label={label}
				onChange={(value) => handleChange(value)}
				renderInput={(params) => <StyledInput {...params} />}
				components={{
					OpenPickerIcon: () => <Icon icon={ICON_COLLECTION.calendar} />,
				}}
				InputAdornmentProps={{ position: 'start' }}
			/>
		</LocalizationProvider>
	);
};
