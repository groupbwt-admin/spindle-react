import * as React from 'react';
import { Link } from 'react-router-dom';

import { css, styled } from '@mui/material/styles';

import { AUTH_ROUTES } from 'shared/config/routes';

import { Button } from 'shared/components/button/button';
import { Icon } from 'shared/components/icon/icon';
import { ICON_COLLECTION } from 'shared/components/icon/icon-list';

const StyledButton = styled(Button)(
	({ theme }) => css`
		font-size: 12px;
		font-weight: 400;
		color: ${theme.palette.common.black};
	`,
);

export const BackButton: React.FC = () => {
	return (
		<StyledButton
			component={Link}
			to={AUTH_ROUTES.LOGIN.path}
			label="Back to Sign in"
			variant="text"
			color="secondary"
			startIcon={<Icon icon={ICON_COLLECTION.arrow_left} />}
		/>
	);
};
