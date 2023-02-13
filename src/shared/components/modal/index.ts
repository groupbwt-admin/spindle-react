import React from 'react';

import { ModalFooter } from 'shared/components/modal/modal-footer';
import { ModalHeader } from 'shared/components/modal/modal-header';
import { ModalRoot } from 'shared/components/modal/modal-root';

export interface ModalContextProps {
	onClose: () => void;
}

export const ModalContext = React.createContext<ModalContextProps>({
	onClose: () => false,
});

export const Modal = {
	Root: ModalRoot,
	Header: ModalHeader,
	Footer: ModalFooter,
};
