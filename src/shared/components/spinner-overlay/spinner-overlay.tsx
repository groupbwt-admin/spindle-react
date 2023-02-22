import * as React from 'react';

import { Backdrop, CircularProgress } from '@mui/material';

interface Props {
	open: boolean;
}

export const SpinnerOverlay = ({ open }: Props) => {
	return (
		<Backdrop open={open}>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};
