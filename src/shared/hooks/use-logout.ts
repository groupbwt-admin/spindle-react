import { setAuthUserData } from 'app/store/auth/actions';
import { LocalStorageService } from 'shared/services/local-storage-service';

export function useLogout() {
	const logout = () => {
		LocalStorageService.remove('token');
		setAuthUserData(null);
	};

	return {
		logout,
	};
}
