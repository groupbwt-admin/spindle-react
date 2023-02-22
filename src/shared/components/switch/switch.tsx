import React from 'react';
import styled from '@emotion/styled/macro';

import {
	FormControlLabel,
	FormGroup,
	Switch as ExternalSwitch,
} from '@mui/material';

const StyledFormControlLabel = styled(FormControlLabel)`
	justify-content: space-between;
`;

const StyledSwitch = styled(ExternalSwitch)`
	width: 50px;
	height: 30px;
	padding: 0;

	.MuiSwitch-switchBase {
		padding: 0;
		margin: 1px 0;
		transition-duration: 300ms;

		&.Mui-checked {
			transform: translateX(21px);
			color: #fff;

			& + .MuiSwitch-track {
				background-color: ${({ theme }) => theme.palette.primary.main};
				opacity: 1;
				border: 0;
			}

			&.Mui-disabled + .MuiSwitch-track {
				opacity: 0.5;
			}

			& .MuiSwitch-thumb {
				box-shadow: 0 0.1px 0.3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.2);
			}
		}

		&.Mui-focusVisible .MuiSwitch-thumb {
			color: ${({ theme }) => theme.palette.primary.main};
			border: 6px solid #fff;
		}

		&.Mui-disabled .MuiSwitch-thumb {
			color: ${({ theme }) => theme.palette.grey[600]};
		}

		&.Mui-disabled + .MuiSwitch-track {
			opacity: 0.3;
		}
	}

	.MuiSwitch-thumb {
		box-sizing: border-box;
		width: 28px;
		height: 28px;
		border: 0.5px solid rgba(0, 0, 0, 0.04);
		box-shadow: 0 0.1px 0.3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.2);
	}

	.MuiSwitch-track {
		border-radius: 99px;
		background-color: #E9E9EA;
		opacity: 1;
		transition: background-color 500ms ease;
	}
}`;

interface SwitchProps {
	value?: boolean;
	label?: string;
	onChange: (isComments: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({ value, label, onChange }) => {
	const handleChange = (e) => {
		onChange(e.target.checked);
	};

	return (
		<FormGroup>
			<StyledFormControlLabel
				checked={value}
				onChange={handleChange}
				control={
					<StyledSwitch
						focusVisibleClassName=".Mui-focusVisible"
						disableRipple
					/>
				}
				label={label}
				labelPlacement="start"
			/>
		</FormGroup>
	);
};
