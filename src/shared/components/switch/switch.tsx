import React from 'react';
import styled from '@emotion/styled/macro';

import {
	FormControlLabel,
	FormGroup,
	Switch as ExternalSwitch,
} from '@mui/material';

interface SwitchProps {
	value?: boolean;
	label?: string;
}

const StyledFormControlLabel = styled(FormControlLabel)`
	justify-content: space-between;
`;

const StyledSwitch = styled((props: SwitchProps) => (
	<ExternalSwitch
		focusVisibleClassName=".Mui-focusVisible"
		disableRipple
		{...props}
	/>
))(({ theme }) => ({
	width: 50,
	height: 30,
	padding: 0,
	'& .MuiSwitch-switchBase': {
		padding: 0,
		margin: '1px 0',
		transitionDuration: '300ms',
		'&.Mui-checked': {
			transform: 'translateX(21px)',
			color: '#fff',
			'& + .MuiSwitch-track': {
				backgroundColor: theme.palette.primary.main,
				opacity: 1,
				border: 0,
			},
			'&.Mui-disabled + .MuiSwitch-track': {
				opacity: 0.5,
			},
			'& .MuiSwitch-thumb': {
				boxShadow:
					'0px 0.1px 0.3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.2)',
			},
		},
		'&.Mui-focusVisible .MuiSwitch-thumb': {
			color: theme.palette.primary.main,
			border: '6px solid #fff',
		},
		'&.Mui-disabled .MuiSwitch-thumb': {
			color:
				theme.palette.mode === 'light'
					? theme.palette.grey[100]
					: theme.palette.grey[600],
		},
		'&.Mui-disabled + .MuiSwitch-track': {
			opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
		},
	},
	'& .MuiSwitch-thumb': {
		boxSizing: 'border-box',
		width: 28,
		height: 28,
		border: '0.5px solid rgba(0, 0, 0, 0.04)',
		boxShadow:
			'0px 0.1px 0.3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.2)',
	},
	'& .MuiSwitch-track': {
		borderRadius: 30 / 2,
		backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
		opacity: 1,
		transition: theme.transitions.create(['background-color'], {
			duration: 500,
		}),
	},
}));

export const Switch: React.FC<SwitchProps> = ({ value, label }) => {
	return (
		<FormGroup>
			<StyledFormControlLabel
				value="start"
				control={<StyledSwitch />}
				label={label}
				labelPlacement="start"
			/>
		</FormGroup>
	);
};
