import { authState } from 'app/store/auth/state';
import { userState } from 'app/store/user/state';

export function useLogout() {
	const logout = () => {
		authState.setUser(null);
		userState.setProfile(null);
	};

	return {
		logout,
	};
}
