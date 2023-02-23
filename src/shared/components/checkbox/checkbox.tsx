import React, { forwardRef, InputHTMLAttributes } from 'react';

import { Checkbox as ExternalCheckbox, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Icon } from 'shared/components/icon/icon';
import { ICON_COLLECTION } from 'shared/components/icon/icon-list';

const StyledCheckbox = styled(ExternalCheckbox)`
	margin-right: 12px;
	width: 16px;
	height: 16px;
	color: ${({ theme }) => theme.palette.text.secondary};
	border-radius: 4px;

	input {
		opacity: 0;
		width: 16px;
		height: 16px;
	}
`;

export interface CheckboxProps {
	checked: boolean;
	required?: boolean;
	className?: string;
	label?: React.ReactNode | string;
	tabIndex?: InputHTMLAttributes<HTMLInputElement>['tabIndex'];
	onChange?: InputHTMLAttributes<HTMLInputElement>['onChange'];
	onClick?: InputHTMLAttributes<HTMLLabelElement>['onClick'];
}

const RootCheckbox: React.ForwardRefRenderFunction<
	HTMLInputElement,
	CheckboxProps
> = ({ checked, label, className, onClick, ...props }, ref) => {
	return (
		<FormControlLabel
			value="start"
			control={
				<StyledCheckbox
					icon={<Icon icon={ICON_COLLECTION.empty_checkbox} />}
					checked={checked}
					inputProps={{ 'aria-label': 'controlled' }}
					size="small"
					inputRef={ref}
					{...props}
				/>
			}
			label={label || false}
			labelPlacement="end"
			className={className}
			onClick={onClick}
		/>
	);
};

export const Checkbox = forwardRef(RootCheckbox);
