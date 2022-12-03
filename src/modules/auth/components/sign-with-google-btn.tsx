import React from 'react';
import {AppButton} from "shared/components/button/button";
import {Icon} from 'shared/components/icon/icon'
import {ReactComponent as GoogleIcon} from "shared/components/icon/collection/google.svg";
import {styled} from "@mui/material/styles";

const GoogleIconStyled = styled(GoogleIcon)`
	width: 23px;
	height: 23px;
`

const ButtonIcon = <Icon icon={GoogleIconStyled} />

export const SignWithGoogleBtn = () => {

	return <AppButton label={'Sign In with Google'} startIcon={ButtonIcon} color={'info'}/>
}
