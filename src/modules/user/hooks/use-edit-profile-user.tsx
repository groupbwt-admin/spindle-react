import { useState } from 'react';
import { useMutation } from 'react-query';
import { EditUserForm } from 'modules/user/components/edit-user-form';

import { UserApi } from 'app/api/user-api/user-api';

import { selectUserData } from 'app/store/user/selects';
import { useUserState } from 'app/store/user/state';

import { Button } from 'shared/components/button/button';
import { Modal } from 'shared/components/modal';
import { Typography } from 'shared/components/typography/typography';

export function useEditProfileUser() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const user = selectUserData();
	const { setProfile } = useUserState();

	const setUpProfileMutation = useMutation(UserApi.updateProfile, {
		onSuccess: async (userData) => {
			setProfile(userData);
			handleClose();
		},
		onError: async (error) => {
			console.log(error);
		},
	});

	const handleClose = () => setIsModalOpen(false);

	const handleOpen = () => setIsModalOpen(true);

	const handleSubmit = (data) => {
		setUpProfileMutation.mutate(data);
	};

	const modal = (
		<Modal.Root open={isModalOpen} onClose={handleClose}>
			<Modal.Header onClose={handleClose}>
				<Typography variant="h3">Profile Settings</Typography>
			</Modal.Header>
			<EditUserForm
				user={user}
				isLoading={setUpProfileMutation.isLoading}
				onSubmit={handleSubmit}
			>
				{(formState) => (
					<Modal.Footer>
						<Button
							label="Cancel"
							fullWidth
							variant="outlined"
							color="secondary"
							disabled={setUpProfileMutation.isLoading}
							onClick={handleClose}
						/>
						<Button
							label="Save Changes"
							fullWidth
							type="submit"
							disabled={!formState.isDirty}
							isLoading={setUpProfileMutation.isLoading}
						/>
					</Modal.Footer>
				)}
			</EditUserForm>
		</Modal.Root>
	);

	return { modal, handleOpen };
}
