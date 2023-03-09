import { useUserState } from 'app/store/user/state';

import { getUserAvatarURL } from '../../../shared/utils/get-file-url';

export const selectUserData = () =>
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useUserState((state) =>
		state.userData
			? {
					...state.userData,
					fullName: `${state.userData?.firstName} ${state.userData?.lastName}`,
					avatar: state.userData?.avatar
						? getUserAvatarURL(state.userData!.avatar)
						: state.userData?.avatar,
			  }
			: null,
	);
export const selectIsLoadingUserData = () =>
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useUserState((state) => state.isLoading);
