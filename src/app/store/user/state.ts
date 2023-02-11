import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import { IUser, IUserExtended } from 'shared/types/user';

import { UserApi } from 'app/api/user-api/user-api';

import { getUserAvatarURL } from 'shared/utils/get-file-url';

interface IUserState {
	userData: IUser | null;
	isLoading: boolean;
	getProfile: () => Promise<void>;
	setProfile: (user: IUser | null) => void;
	user: IUserExtended | null;
}

export const userState = proxy<IUserState>({
	userData: null,
	isLoading: false,
	getProfile: async function () {
		try {
			this.isLoading = true;
			this.userData = await UserApi.getProfile();
			this.isLoading = false;
		} catch (e) {
			this.isLoading = false;
		}
	},
	setProfile(user: IUser | null) {
		this.userData = user;
	},
	get user() {
		if (!this.userData) return null;

		return {
			...this.userData,
			fullName: `${this.userData.firstName} ${this.userData.lastName}`,
			avatar: this.userData.avatar
				? getUserAvatarURL(this.userData.avatar)
				: this.userData.avatar,
		};
	},
});

devtools(userState, { name: 'userState', enabled: true });
