import * as React from 'react';
import { useId, useRef } from 'react';
import styled from '@emotion/styled/macro';
import clsx from 'clsx';

import { InputAdornment, InputBase } from '@mui/material';
import { css } from '@mui/material/styles';

import { Icon } from 'shared/components/icon/icon';
import { ICON_COLLECTION } from 'shared/components/icon/icon-list';
import { InputProps } from 'shared/components/input/input';

const StyledInputAdornment = styled(InputAdornment)`
	position: absolute;
	left: 20px;
	top: 50%;
	transition: opacity 0.3s ease;

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

const AppInput = styled(InputBase)(
	({ theme }) => css`
		display: flex;
		position: relative;

		input {
			max-width: 100%;
			background-color: #ffffff;
			border: 1px solid #eeeff1;
			border-radius: 10px;
			padding: 14px 12px 14px 46px;
			transition: border-color 0.3s ${theme.transitions.easing.easeIn};

			&::placeholder {
				color: ${theme.palette.text.secondary};
			}

			&:focus {
				border-color: ${theme.palette.primary.main};
			}
		}

		&.Mui-error input {
			border-color: ${theme.palette.error.main};
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

			${StyledInputAdornment} {
				opacity: 0;
			}

			input {
				padding-left: 12px;
			}
		}

		&.hasValue {
			${StyledClearInputAdornment} {
				display: block;
			}
		}
	`,
);

interface SearchInputProps extends InputProps {
	value: string;
	onClear: () => void;
}

export const SearchInput: React.ForwardRefRenderFunction<
	HTMLInputElement,
	SearchInputProps
> = ({ value, className, onClear, ...props }) => {
	const id = useId();
	const inputEl = useRef<HTMLInputElement | null>(null);

	const handleClear = (e) => {
		onClear();
		inputEl.current && inputEl.current.focus();
	};

	return (
		<AppInput
			value={value}
			inputRef={inputEl}
			id={id}
			className={clsx(className, value && 'hasValue')}
			{...props}
			startAdornment={
				<StyledInputAdornment position="start">
					<Icon icon={ICON_COLLECTION.search} />
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
