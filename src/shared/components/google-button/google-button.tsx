import { forwardRef } from 'react';
import * as React from 'react';

import { styled } from '@mui/material/styles';

import { Button, ButtonProps } from 'shared/components/button/button';
import { ReactComponent as GoogleIcon } from 'shared/components/icon/collection/google.svg';
import { Icon } from 'shared/components/icon/icon';

const StyledButton = styled(Button)`
	font-weight: 400;
`;

const GoogleIconStyled = styled(GoogleIcon)`
	width: 23px;
	height: 23px;
`;

type GoogleButtonProps = ButtonProps;

const GoogleButtonRoot: React.ForwardRefRenderFunction<
	HTMLButtonElement,
	GoogleButtonProps
> = (props, ref) => {
	return (
		<StyledButton
			ref={ref}
			startIcon={<Icon icon={GoogleIconStyled} />}
			color="info"
			{...props}
		/>
	);
};

export const GoogleButton = forwardRef(GoogleButtonRoot);
