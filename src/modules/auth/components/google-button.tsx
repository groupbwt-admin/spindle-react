import React from 'react';
import { styled } from '@mui/material/styles';
import { Button } from 'shared/components/button/button';
import { Icon } from 'shared/components/icon/icon';
import { ReactComponent as GoogleIcon } from 'shared/components/icon/collection/google.svg';

const StyledButton = styled(Button)`
	font-weight: 400;
`;

const GoogleIconStyled = styled(GoogleIcon)`
	width: 23px;
	height: 23px;
`;

interface GoogleButtonProps {
	label: string;
}

export const GoogleButton: React.FC<GoogleButtonProps> = ({ label }) => {
	return (
		<StyledButton
			label={label}
			startIcon={<Icon icon={GoogleIconStyled} />}
			color="info"
		/>
	);
};
