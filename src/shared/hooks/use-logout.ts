import { useAuthState } from 'app/store/auth/state';
import { useUserState } from 'app/store/user/state';

export function useLogout() {
	const { setProfile } = useUserState();
	const { setUser } = useAuthState();
	const logout = () => {
		setUser(null);
		setProfile(null);
	};

	return {
		logout,
	};
}
