import {LinearProgress} from "@mui/material";
import styled from "@emotion/styled";

const StyledLinearProgress = styled(LinearProgress)`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;
	width: 100%;
`

export const FetchLinearLoader = () => {
	return <StyledLinearProgress color="primary"/>
}
