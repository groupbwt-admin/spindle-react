import React, { useRef, useState } from 'react';
import styled from '@emotion/styled/macro';
import clsx from 'clsx';

import { InputAdornment } from '@mui/material';

import { IconButton } from 'shared/components/button/icon-button';
import { Icon } from 'shared/components/icon/icon';
import { ICON_COLLECTION } from 'shared/components/icon/icon-list';
import { Input, InputProps } from 'shared/components/input/input';

const StyledInputAdornment = styled(InputAdornment)`
	position: absolute;
	right: 12px;
`;

const StyledInput = styled(Input)`
	.MuiInputBase-input {
		border-color: transparent;
	}

	&:not(.isEditable) {
		&:hover {
			border-color: ${({ theme }) => theme.palette.primary.main};
		}
	}

	input {
		font-size: 32px;
		line-height: 52px;
		font-weight: 700;
		color: #231d2c;
		transition: border-color 0.3s
			${({ theme }) => theme.transitions.easing.easeIn};
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

interface EditInputFieldProps extends InputProps {
	onSubmit: (val: string) => Promise<void>;
	isEditable?: boolean;
}

export const EditInputField: React.FC<EditInputFieldProps> = ({
	value,
	isEditable = false,
	className,
	onSubmit,
}) => {
	const [inputVal, setInputVal] = useState(value);
	const [isEditMode, setIsEditMode] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const adornmentRef = useRef<HTMLDivElement>(null);

	const toggleEditMode = (e, state) => {
		setIsEditMode(state);
	};

	const submitHandler = async (e) => {
		if (!inputVal) return;
		if (value === inputVal) {
			toggleEditMode(e, false);
		}
		setIsLoading(true);
		await onSubmit(inputVal);
		toggleEditMode(e, false);
		setIsLoading(false);
	};

	const handleChange = (e) => setInputVal(e.target.value);

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		e.stopPropagation();
		if (
			adornmentRef?.current &&
			adornmentRef.current.contains(e.relatedTarget)
		) {
			return;
		}
		if (value === inputVal) {
			toggleEditMode(e, false);
		}
	};

	const handleInputClick = (e) => {
		e.stopPropagation();
		if (isEditMode || !isEditable) return;
		toggleEditMode(e, true);
	};

	const handleCancelEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.nativeEvent.stopImmediatePropagation();
		e.stopPropagation();
		setInputVal(value);
		toggleEditMode(e, false);
	};

	return (
		<StyledInput
			value={inputVal}
			readOnly={!isEditable}
			onChange={handleChange}
			onBlur={handleBlur}
			className={clsx(
				className,
				isEditMode && 'editMode',
				isEditable && 'isEditable',
			)}
			onClick={handleInputClick}
			endAdornment={
				<StyledInputAdornment position="end" ref={adornmentRef}>
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
