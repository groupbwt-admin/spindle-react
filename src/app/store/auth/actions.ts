import { authState } from 'app/store/auth/state';

export interface UserData {
	email?: string;
	firstName?: string;
	lastName?: string;
	avatar?: string;
}

export const setAuthUserData = (data: UserData) => {
	authState.user = data;
};
