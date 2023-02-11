import * as React from 'react';
import styled from '@emotion/styled/macro';

import { Modal as ExternalModal } from '@mui/material';

const ModalBody = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	max-width: 600px;
	background: linear-gradient(0deg, #ffffff, #ffffff), #f3f5f7;
	box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.15);
	border-radius: 10px;
`;

interface ModalProps {
	open: boolean;
	onClose: () => void;
}

export const ModalRoot: React.FC<React.PropsWithChildren<ModalProps>> = ({
	open,
	onClose,
	children,
}) => {
	return (
		<ExternalModal open={open} onClose={onClose}>
			<ModalBody>{children}</ModalBody>
		</ExternalModal>
	);
};
