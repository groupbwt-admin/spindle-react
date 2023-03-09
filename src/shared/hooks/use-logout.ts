import { authState } from 'app/store/auth/state';
import { useUserState } from 'app/store/user/state';

export function useLogout() {
	const { setProfile } = useUserState();
	const logout = () => {
		authState.setUser(null);
		setProfile(null);
	};

	return {
		logout,
	};
}
