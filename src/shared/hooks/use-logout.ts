import { useQueryClient } from 'react-query';

import { authState } from 'app/store/auth/state';
import { userState } from 'app/store/user/state';

export function useLogout() {
	const queryClient = useQueryClient();

	const logout = () => {
		authState.setUser(null);
		userState.setProfile(null);
		queryClient.clear();
	};

	return {
		logout,
	};
}
