import * as React from 'react';
import styled from '@emotion/styled/macro';

const ModalFooterContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 16px;
	border-top: 1px solid #eeedf1;
	gap: 12px;
`;

export const ModalFooter: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	return <ModalFooterContainer>{children}</ModalFooterContainer>;
};
