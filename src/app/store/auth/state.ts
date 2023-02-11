import jwtDecode from 'jwt-decode';
import { LocalStorageService } from 'shared/services/local-storage-service';
import { IToken } from 'shared/types/token';
import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

interface IAuthState {
	user: IToken | null;
	setUser: (token: string | null) => void;
	isLoggedIn: boolean;
}

export const authState = proxy<IAuthState>({
	user: null,
	setUser(token: string | null) {
		if (!token) {
			LocalStorageService.remove('token');
			this.user = null;

			return;
		}

		const userData: IToken = jwtDecode(token);
		LocalStorageService.set('token', token);

		this.user = userData;
	},
	get isLoggedIn() {
		return !!this.user;
	},
});

devtools(authState, { name: 'authState', enabled: true });
