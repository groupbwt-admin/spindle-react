import React, { useState } from 'react';
import styled from '@emotion/styled/macro';
import clsx from 'clsx';

import { Autocomplete, Chip, TextField } from '@mui/material';
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

const StyledInput = styled(TextField)`
	input,
	.MuiInputBase-root {
		padding: 0;
		column-gap: 12px;
		row-gap: 6px;
	}

	position: relative;
	border-radius: 10px;
	background-color: ${({ theme }) => theme.palette.common.white};
	border: 1px solid ${({ theme }) => theme.palette.text.secondary};
	transition: border-color 0.3s
		${({ theme }) => theme.transitions.easing.easeIn};
	padding: 8px 40px 8px 6px;

	&:hover {
		border-color: ${({ theme }) => theme.palette.primary.main};
	}

	fieldset {
		border: none;
	}
`;

const FormControl = styled.div`
	position: relative;
	width: 100%;

	&:not(.editMode) {
		cursor: pointer;

		${StyledInputAdornment} {
			display: none;
		}

		${StyledInput} {
			background-color: transparent;
			border: none;
			border-radius: 10px;
			padding: 0;
		}
	}

	&.isFocused {
		${StyledInput} {
			border-color: ${({ theme }) => theme.palette.primary.main};
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

	&:not(.isEditable) {
		.MuiChip-deleteIcon {
			display: none;
		}
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

interface TagsAutocompleteProps {
	className?: string;
	options?: string[];
	initialTags: string[];
	isEditable?: boolean;
	onUpdateTags: (payload: string[]) => void;
}

export const TagsAutocomplete: React.FC<TagsAutocompleteProps> = ({
	className,
	options,
	isEditable = false,
	initialTags,
	onUpdateTags,
}) => {
	const [tagsList, setTagsList] = useState(initialTags);
	const [isEditMode, setIsEditMode] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	const toggleEditMode = (e, state) => {
		if (!isEditable) return;
		e.stopPropagation();
		setIsEditMode(state);
	};

	const submitHandler = async (e) => {
		setIsLoading(true);
		await onUpdateTags(tagsList);
		toggleEditMode(e, false);
		setIsLoading(false);
	};

	const handleDeleteTag = (
		e: React.MouseEvent<HTMLButtonElement>,
		onDelete,
	) => {
		!isEditMode && toggleEditMode(e, true);
		onDelete(e);
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

	const handleCancelEdit = (e) => {
		setTagsList(initialTags);
		toggleEditMode(e, false);
	};

	const handleChange = (e, value) => setTagsList(value);

	return (
		<FormControl
			className={clsx(
				className,
				isEditMode && 'editMode',
				isFocused && 'isFocused',
				isEditable && 'isEditable',
			)}
			onClick={(e) => toggleEditMode(e, true)}
		>
			<Autocomplete
				multiple
				id="tags-filled"
				value={tagsList}
				options={options || []}
				defaultValue={tagsList}
				onChange={handleChange}
				disablePortal
				readOnly={isLoading || !isEditable}
				freeSolo
				filterSelectedOptions
				fullWidth
				clearIcon={false}
				renderTags={handleRenderTags}
				renderInput={(params) => (
					<StyledInput
						{...params}
						placeholder={isEditable ? 'Tap to add tag' : undefined}
					/>
				)}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>
			<StyledInputAdornment>
				{!isLoading && (
					<StyledIconButton onClick={handleCancelEdit}>
						<Icon icon={ICON_COLLECTION.close} />
					</StyledIconButton>
				)}
				<StyledIconButton onClick={submitHandler} isLoading={isLoading}>
					<Icon icon={ICON_COLLECTION.checkmark} />
				</StyledIconButton>
			</StyledInputAdornment>
		</FormControl>
	);
};
