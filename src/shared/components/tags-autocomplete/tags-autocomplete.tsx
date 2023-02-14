import { Autocomplete, Chip, TextField } from '@mui/material';

export const TagsAutocomplete = () => {
	return (
		<Autocomplete
			multiple
			id="tags-filled"
			open={false}
			options={['1', '2', '3'].map((option) => option)}
			defaultValue={[['1', '2', '3'][0]]}
			freeSolo
			fullWidth
			clearIcon={false}
			renderTags={(value: readonly string[], getTagProps) =>
				value.map((option: string, index: number) => (
					<Chip
						variant="outlined"
						label={option}
						{...getTagProps({ index })}
						key={option}
					/>
				))
			}
			renderInput={(params) => (
				<TextField {...params} placeholder="Tap to add tag" />
			)}
		/>
	);
};
