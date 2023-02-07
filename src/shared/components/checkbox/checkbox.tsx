import React, { forwardRef, InputHTMLAttributes } from 'react';
import { Checkbox as ExternalCheckbox, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ICON_COLLECTION } from 'shared/components/icon/icon-list';
import { Icon } from 'shared/components/icon/icon';

const StyledCheckbox = styled(ExternalCheckbox)`
	margin-right: 12px;
	width: 16px;
	height: 16px;
	color: #eeeff1;
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
		<label className={className} onClick={onClick}>
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
			/>
		</label>
	);
};

export const Checkbox = forwardRef(RootCheckbox);
