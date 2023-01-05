import { devtools } from 'valtio/utils'
import { UserApi } from 'app/api/user-api/user-api';
import { IUser, IUserExtended } from 'shared/types/user';
import { proxyWithComputed } from 'valtio/utils';
import { getUserAvatarURL } from 'shared/utils/get-file-url';

interface IUserState {
	userData: IUser | null;
	isLoading: boolean;
	getProfile: () => Promise<void>;
	setProfile: (user: IUser | null) => void;
}

interface IUserStateComputed {
	user: IUserExtended | null;
}

export const userState = proxyWithComputed<IUserState, IUserStateComputed>(
	{
		userData: null,
		isLoading: false,
		getProfile: async function () {
			this.isLoading = true;
			this.userData = await UserApi.getProfile();
			this.isLoading = false;
		},
		setProfile(user: IUser | null) {
			this.userData = user;
		},
	},
	{
		user: (state) => {
			if (!state.userData) return null;

			return {
				...state.userData,
				fullName: `${state.userData.firstName} ${state.userData.lastName}`,
				avatar: state.userData.avatar
					? getUserAvatarURL(state.userData.avatar)
					: state.userData.avatar,
			};
		},
	},
);

devtools(userState, { name: 'userState', enabled: true });
