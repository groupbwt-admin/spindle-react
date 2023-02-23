import React, { useState } from 'react';
import styled from '@emotion/styled/macro';
import clsx from 'clsx';

import { InputAdornment } from '@mui/material';

import { IconButton } from 'shared/components/button/icon-button';
import { Icon } from 'shared/components/icon/icon';
import { ICON_COLLECTION } from 'shared/components/icon/icon-list';
import { Input, InputProps } from 'shared/components/input/input';

interface EditInputFieldProps extends InputProps {
	onSubmit: (val: string) => Promise<void>;
}

const StyledInputAdornment = styled(InputAdornment)`
	position: absolute;
	right: 12px;
`;

const StyledInput = styled(Input)`
	.MuiInputBase-input {
		border-color: transparent;
	}

	input {
		font-size: 32px;
		line-height: 52px;
		font-weight: 700;
		color: #231d2c;
		transition: border-color 0.3s
			${({ theme }) => theme.transitions.easing.easeIn};

		&:hover {
			border-color: ${({ theme }) => theme.palette.primary.main};
		}
	}

	&:not(.editMode) {
		cursor: pointer;

		${StyledInputAdornment} {
			display: none;
		}

		input {
			padding: 0;
			background-color: transparent;
		}
	}
`;

const StyledIconButton = styled(IconButton)`
	width: 45px;
	height: 45px;
`;

export const EditInputField: React.FC<EditInputFieldProps> = ({
	value,
	className,
	onSubmit,
}) => {
	const [inputVal, setInputVal] = useState(value);
	const [isEditMode, setIsEditMode] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const toggleEditMode = (e, state) => {
		setIsEditMode(state);
	};

	const submitHandler = async (e) => {
		if (!inputVal) return;
		setIsLoading(true);
		await onSubmit(inputVal);
		toggleEditMode(e, false);
		setIsLoading(false);
	};

	const handleChange = (e) => setInputVal(e.target.value);

	const handleInputClick = (e) => {
		e.stopPropagation();
		if (isEditMode) return;
		toggleEditMode(e, true);
	};

	const handleCancelEdit = (e) => {
		e.stopPropagation();
		toggleEditMode(e, false);
	};

	return (
		<StyledInput
			value={inputVal}
			onChange={handleChange}
			className={clsx(className, isEditMode && 'editMode')}
			onClick={handleInputClick}
			endAdornment={
				<StyledInputAdornment position="end">
					{!isLoading && (
						<StyledIconButton onClick={handleCancelEdit}>
							<Icon icon={ICON_COLLECTION.close} />
						</StyledIconButton>
					)}
					<StyledIconButton onClick={submitHandler} isLoading={isLoading}>
						<Icon icon={ICON_COLLECTION.checkmark} />
					</StyledIconButton>
				</StyledInputAdornment>
			}
		/>
	);
};
