import { devtools, proxyWithComputed } from 'valtio/utils';
import { IToken } from 'shared/types/token';
import jwtDecode from 'jwt-decode';
import { LocalStorageService } from 'shared/services/local-storage-service';

interface IAuthState {
	user: IToken | null;
	setUser: (token: string | null) => void;
}

interface IAuthStateComputed {
	isLoggedIn: boolean;
}

export const authState = proxyWithComputed<IAuthState, IAuthStateComputed>(
	{
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
	},
	{
		isLoggedIn: (state) => !!state.user,
	},
);

devtools(authState, { name: 'authState', enabled: true });
