import React from 'react';
import { useMutation } from 'react-query';

import { UserApi } from '../../app/api/user-api/user-api';
import { selectUserData } from '../../app/store/user/selects';
import { useUserState } from '../../app/store/user/state';
import { EditUserForm } from '../../modules/user/components/edit-user-form';
import { Button } from '../components/button/button';
import { Modal } from '../components/modal';
import { Typography } from '../components/typography/typography';
import { VIDEO_MODALS_NAMES } from '../constants/modal-names';
import { useStateModalManager } from '../context/modal-manager';

export const EditProfileUser = () => {
	const user = selectUserData();
	const { setProfile } = useUserState();

	const modalState = useStateModalManager(VIDEO_MODALS_NAMES.edit_profile_user);

	const setUpProfileMutation = useMutation(UserApi.updateProfile, {
		onSuccess: async (userData) => {
			setProfile(userData);
			handleClose();
		},
		onError: async (error) => {
			console.log(error);
		},
	});

	const handleClose = () => modalState.close();

	const handleSubmit = (data) => {
		setUpProfileMutation.mutate(data);
	};

	return (
		<Modal.Root open={modalState.open} onClose={handleClose}>
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
};
