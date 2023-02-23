import * as React from 'react';
import { useId, useRef } from 'react';
import styled from '@emotion/styled/macro';
import clsx from 'clsx';

import { CircularProgress, InputAdornment, InputBase } from '@mui/material';

import { Icon } from 'shared/components/icon/icon';
import { ICON_COLLECTION } from 'shared/components/icon/icon-list';
import { InputProps } from 'shared/components/input/input';

const StyledInputAdornment = styled(InputAdornment)`
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

const StyledClearInputAdornment = styled(InputAdornment)`
	position: absolute;
	right: 20px;
	top: 36%;
	display: none;
	cursor: pointer;
`;

const AppInput = styled(InputBase)`
	display: flex;
	position: relative;

	input {
		max-width: 100%;
		background-color: #ffffff;
		border: 1px solid ${({ theme }) => theme.palette.text.secondary};
		border-radius: 10px;
		padding: 14px 12px 14px 46px;
		transition: border-color 0.3s
			${({ theme }) => theme.transitions.easing.easeIn};

		&::placeholder {
			color: ${({ theme }) => theme.palette.text.secondary};
		}

		&:focus {
			border-color: ${({ theme }) => theme.palette.primary.main};
		}
	}

	&.Mui-error input {
		border-color: ${({ theme }) => theme.palette.error.main};
	}

	&.MuiInputBase-root {
		transition: width 0.3s ease;
		width: 54px;
		max-width: 400px;
	}

	&.Mui-focused,
	&.hasValue {
		transition: width 0.3s ease;
		width: 100%;
	}

	&.hasValue {
		${StyledClearInputAdornment} {
			display: block;
		}
	}
`;

interface SearchInputProps extends InputProps {
	value: string;
	isLoading?: boolean;
	onClear: () => void;
}

export const SearchInput: React.ForwardRefRenderFunction<
	HTMLInputElement,
	SearchInputProps
> = ({ value, isLoading, className, onClear, ...props }) => {
	const id = useId();
	const inputEl = useRef<HTMLInputElement | null>(null);

	const handleClear = () => {
		onClear();
		inputEl.current && inputEl.current.focus();
	};

	return (
		<AppInput
			value={value}
			inputRef={inputEl}
			type="search"
			autoComplete="off"
			id={id}
			className={clsx(className, value && 'hasValue')}
			{...props}
			startAdornment={
				<StyledInputAdornment position="start">
					{!isLoading ? (
						<Icon icon={ICON_COLLECTION.search} />
					) : (
						<CircularProgress color="primary" size={24} />
					)}
				</StyledInputAdornment>
			}
			endAdornment={
				<StyledClearInputAdornment position="end" onClick={handleClear}>
					<Icon icon={ICON_COLLECTION.close} />
				</StyledClearInputAdornment>
			}
			slots={{ root: 'label' }}
		/>
	);
};
