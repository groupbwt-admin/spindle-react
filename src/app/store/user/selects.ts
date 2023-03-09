/* eslint-disable react-hooks/rules-of-hooks */
import { shallow } from 'zustand/shallow';

import { useUserState } from 'app/store/user/state';

import { getUserAvatarURL } from '../../../shared/utils/get-file-url';

export const selectUserData = () =>
	useUserState(
		(state) =>
			state.userData
				? {
						...state.userData,
						fullName: `${state.userData?.firstName} ${state.userData?.lastName}`,
						avatar: state.userData?.avatar
							? getUserAvatarURL(state.userData!.avatar)
							: state.userData?.avatar,
				  }
				: null,
		shallow,
	);
export const selectIsLoadingUserData = () =>
	useUserState((state) => state.isLoading, shallow);
