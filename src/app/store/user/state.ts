import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { IUser } from 'shared/types/user';

import { UserApi } from 'app/api/user-api/user-api';

interface IUserState {
	userData: IUser | null;
	isLoading: boolean;
	getProfile: () => Promise<void>;
	setProfile: (user: IUser | null) => void;
}

export const useUserState = create<IUserState>()(
	devtools(
		(set) => ({
			userData: null,
			isLoading: false,
			getProfile: async function () {
				try {
					set({ isLoading: true });
					const tempUserData = await UserApi.getProfile();
					set({ userData: tempUserData });
					set({ isLoading: false });
				} catch (e) {
					set({ isLoading: false });
				}
			},
			setProfile(user: IUser | null) {
				set({ userData: user });
			},
		}),
		{ name: 'useUserState', store: 'useUserState' },
	),
);
