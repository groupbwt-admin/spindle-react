import * as React from 'react';
import { useState } from 'react';
import styled from '@emotion/styled/macro';
import clsx from 'clsx';

import { Autocomplete, Chip, CircularProgress, TextField } from '@mui/material';
import { AutocompleteRenderGetTagProps } from '@mui/material/Autocomplete/Autocomplete';

import { IconButton } from 'shared/components/button/icon-button';
import { Icon } from 'shared/components/icon/icon';
import { ICON_COLLECTION } from 'shared/components/icon/icon-list';

const StyledInputAdornment = styled.span`
	position: absolute;
	right: 12px;
	top: calc(50% - 12px);
	display: flex;
	column-gap: 12px;
`;

const StartInputAdornment = styled.span`
	position: absolute;
	left: 20px;
	top: calc(50% - 12px);
	transition: opacity 0.3s ease;
	height: auto;
	margin-right: 0;

	svg {
		width: 19px;
		height: 19px;
		color: ${({ theme }) => theme.palette.text.primary};
	}
`;

const StyledInput = styled(TextField)`
	input,
	.MuiInputBase-root {
		padding: 0;
		column-gap: 12px;
		row-gap: 6px;
	}

	.MuiInputBase-root {
		position: relative;
		border-radius: 10px;
		background-color: ${({ theme }) => theme.palette.common.white};
		transition: border-color 0.3s
			${({ theme }) => theme.transitions.easing.easeIn};

		border: 1px solid ${({ theme }) => theme.palette.secondary.main};
		padding: 8px 12px 8px 46px;
		transition: border-color 0.3s
			${({ theme }) => theme.transitions.easing.easeIn};

		&::placeholder {
			color: ${({ theme }) => theme.palette.text.secondary};
		}

		&:focus {
			border-color: ${({ theme }) => theme.palette.primary.main};
		}

		&:hover {
			border-color: ${({ theme }) => theme.palette.primary.main};
		}
	}

	fieldset {
		border: none;
	}
`;

const FormControl = styled.div`
	position: relative;
	width: 100%;

	&.isFocused {
		${StyledInput} {
			.MuiInputBase-root {
				border-color: ${({ theme }) => theme.palette.primary.main};
			}
		}
	}

	.MuiAutocomplete-popper {
		width: 100% !important;
		transform: none !important;
		inset: unset !important;
		bottom: -280px;
	}

	.MuiAutocomplete-paper {
		background-color: ${({ theme }) => theme.palette.common.white};
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
		border-radius: 10px;
		margin: 14px 0;
		width: 100%;
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
	margin: 0 !important;

	.MuiChip-deleteIcon {
		color: ${({ theme }) => theme.palette.common.white};
		transition: opacity 0.3s ease;
		margin-left: 16px;

		&:hover {
			color: ${({ theme }) => theme.palette.common.white};
			opacity: 0.6;
		}
	}
`;

const StyledIconButton = styled(IconButton)`
	width: 24px;
	height: 24px;
`;

type SearchInputExtendedProps = {
	className?: string;
	isLoading: boolean;
	options?: string[];
	inputValue: string;
	selectedTags: string[];
	onInputChange: (value: string) => void;
	onClear: () => void;
	onDeleteTag: () => void;
};

export const SearchInputExtended = ({
	className,
	options,
	isLoading,
	inputValue,
	selectedTags,
	onInputChange,
	onClear,
	onDeleteTag,
}: SearchInputExtendedProps) => {
	const [isFocused, setIsFocused] = useState(false);

	const handleDeleteTag = (
		e: React.MouseEvent<HTMLButtonElement>,
		onDelete,
	) => {
		onDelete(e);
		onDeleteTag();
	};

	const handleRenderTags = (
		value: readonly string[],
		getTagProps: AutocompleteRenderGetTagProps,
	) => {
		return value.map((option: string, index: number) => {
			const { key, onDelete, ...props } = getTagProps({ index });

			return (
				<StyledChip
					key={key}
					{...props}
					label={option}
					onDelete={(e) => handleDeleteTag(e, onDelete)}
				/>
			);
		});
	};

	const handleInputChange = (e, value) => {
		onInputChange(value);
	};

	return (
		<FormControl className={clsx(className, isFocused && 'isFocused')}>
			<Autocomplete
				multiple
				id="tags-filled"
				inputValue={inputValue}
				value={selectedTags}
				options={options || []}
				onInputChange={(e, value) => handleInputChange(e, value)}
				disablePortal
				readOnly={isLoading}
				freeSolo
				filterSelectedOptions
				fullWidth
				clearIcon={false}
				renderTags={handleRenderTags}
				renderInput={(params) => (
					<StyledInput {...params} placeholder="Search" />
				)}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>
			<StyledInputAdornment>
				{!isLoading && (inputValue || !!selectedTags.length) && (
					<StyledIconButton onClick={onClear}>
						<Icon icon={ICON_COLLECTION.close} />
					</StyledIconButton>
				)}
			</StyledInputAdornment>
			<StartInputAdornment>
				{!isLoading ? (
					<Icon icon={ICON_COLLECTION.search} />
				) : (
					<CircularProgress color="primary" size={24} />
				)}
			</StartInputAdornment>
		</FormControl>
	);
};
