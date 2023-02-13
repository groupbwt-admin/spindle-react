import { Modal, ModalContext } from 'shared/components/modal';
import { Typography } from 'shared/components/typography/typography';
import { Button } from 'shared/components/button/button';
import styled from '@emotion/styled/macro';
import React, { useContext } from 'react';
import { IVideo } from 'shared/types/video';

const ModalContent = styled.div`
	padding: 24px;
	text-align: center;
	font-size: 18px;
	line-height: 30px;
	max-height: 400px;
	overflow: auto;
`;

const ProjectName = styled.div`
	font-weight: 700;
`;

interface DeleteVideoModalProps {
	videos: IVideo[];
	isLoading: boolean;
	onDelete: () => void;
}

export const DeleteVideoModal: React.FC<DeleteVideoModalProps> = ({
	videos,
	isLoading,
	onDelete,
}) => {
	const modalContext = useContext(ModalContext);

	return (
		<>
			<Modal.Header onClose={modalContext.onClose}>
				<Typography variant="h3">Delete Video</Typography>
			</Modal.Header>
			<ModalContent>
				<div>Would you like to delete</div>
				{videos.map((item) => (
					<ProjectName key={item.id}>{item.title}</ProjectName>
				))}
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
