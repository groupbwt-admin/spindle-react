import * as React from 'react';

import styled from '@emotion/styled/macro';

import { Modal as ExternalModal } from '@mui/material';

import { ModalContext } from 'shared/components/modal/index';

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
	isClosable?: boolean;
}

export const ModalRoot: React.FC<React.PropsWithChildren<ModalProps>> = ({
	open,
	isClosable = true,
	onClose,
	children,
}) => {
	const handleClose = () => {
		if (!isClosable) {
			return;
		}
		onClose();
	};

	return (
		<ExternalModal open={open} onClose={isClosable ? onClose : undefined}>
			<ModalContext.Provider value={{ onClose: handleClose }}>
				<ModalBody>{children}</ModalBody>
			</ModalContext.Provider>
		</ExternalModal>
	);
};
