import {authState} from "app/store/auth/state";

export function useLogout() {
	const logout = () => {
		authState.setUser(null);
	};

	return {
		logout,
	};
}
