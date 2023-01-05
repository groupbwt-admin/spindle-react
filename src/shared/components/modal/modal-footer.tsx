import styled from "@emotion/styled/macro";
import * as React from "react";

const ModalFooterContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 16px;
	border-top: 1px solid #EEEDF1;
	gap: 12px;
`

export const ModalFooter: React.FC<React.PropsWithChildren> = ({children}) => {
	return <ModalFooterContainer>
		{children}
	</ModalFooterContainer>
}
