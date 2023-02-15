import styled from '@emotion/styled/macro';

import { Autocomplete, Chip, TextField } from '@mui/material';

import { Icon } from 'shared/components/icon/icon';
import { ICON_COLLECTION } from 'shared/components/icon/icon-list';

const StyledInput = styled(TextField)`
	input,
	.MuiInputBase-root {
		padding: 0;
	}

	fieldset {
		border: none;
	}
`;

const StyledChip = styled(Chip)`
	padding: 4px 8px;
	color: ${({ theme }) => theme.palette.common.white};
	background-color: ${({ theme }) => theme.palette.primary.main};
	border-radius: 6px;
	font-weight: 700;
	font-size: 14px;
	line-height: 23px;

	svg {
		color: ${({ theme }) => theme.palette.common.white};
	}

	.MuiChip-label {
		margin-right: 16px;
	}
`;

export const TagsAutocomplete = () => {
	return (
		<Autocomplete
			multiple
			id="tags-filled"
			open={false}
			options={[].map((option) => option)}
			defaultValue={[]}
			freeSolo
			fullWidth
			clearIcon={false}
			renderTags={(value: readonly string[], getTagProps) =>
				value.map((option: string, index: number) => (
					<StyledChip
						label={option}
						{...getTagProps({ index })}
						key={option}
						deleteIcon={<Icon icon={ICON_COLLECTION.close} />}
					/>
				))
			}
			renderInput={(params) => (
				<StyledInput {...params} placeholder="Tap to add tag" />
			)}
		/>
	);
};
