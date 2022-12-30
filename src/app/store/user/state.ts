import { proxy } from 'valtio';
import { UserApi } from 'app/api/user-api/user-api';
import { IUser } from 'shared/types/user';

interface IUserState {
	user: IUser | null;
	isLoading: boolean;
	getProfile: () => Promise<void>;
	setProfile: (user: IUser | null) => void;
}

export const userState = proxy<IUserState>({
	user: null,
	isLoading: false,
	getProfile: async function () {
		this.isLoading = true;
		this.user = await UserApi.getProfile();
		this.isLoading = false;
	},
	setProfile(user: IUser | null) {
		this.user = user;
	},
});
