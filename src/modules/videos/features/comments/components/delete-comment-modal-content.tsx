import React, { useContext } from 'react';
import styled from '@emotion/styled/macro';

import { Button } from 'shared/components/button/button';
import { Modal, ModalContext } from 'shared/components/modal';
import { Typography } from 'shared/components/typography/typography';

const ModalContent = styled.div`
	padding: 24px;
	text-align: center;
	font-size: 18px;
	line-height: 30px;
	max-height: 400px;
	overflow: auto;
`;

interface DeleteCommentModalProps {
	isLoading: boolean;
	onDelete: () => void;
}

export const DeleteCommentModalContent: React.FC<DeleteCommentModalProps> = ({
	isLoading,
	onDelete,
}) => {
	const modalContext = useContext(ModalContext);

	return (
		<>
			<Modal.Header onClose={modalContext.onClose}>
				<Typography variant="h3">Delete comment</Typography>
			</Modal.Header>
			<ModalContent>
				<div>Delete your comment permanently?</div>
			</ModalContent>
			<Modal.Footer>
				<Button
					label="Cancel"
					fullWidth
					variant="outlined"
					color="secondary"
					onClick={modalContext.onClose}
					disabled={isLoading}
				/>
				<Button
					label="Delete"
					fullWidth
					type="submit"
					onClick={onDelete}
					isLoading={isLoading}
				/>
			</Modal.Footer>
		</>
	);
};
