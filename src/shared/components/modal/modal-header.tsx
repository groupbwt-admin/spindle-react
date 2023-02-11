import * as React from 'react';

import styled from '@emotion/styled/macro';

import { IconButton } from 'shared/components/button/icon-button';
import { Icon } from 'shared/components/icon/icon';
import { ICON_COLLECTION } from 'shared/components/icon/icon-list';

const ModalHeaderContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 19px 16px;
	border-bottom: 1px solid #eeedf1;
`;

interface ModalHeaderProps {
	onClose: () => void;
}

export const ModalHeader: React.FC<
	React.PropsWithChildren<ModalHeaderProps>
> = ({ onClose, children }) => {
	return (
		<ModalHeaderContainer>
			{children}
			<IconButton onClick={onClose}>
				<Icon icon={ICON_COLLECTION.close} />
			</IconButton>
		</ModalHeaderContainer>
	);
};
