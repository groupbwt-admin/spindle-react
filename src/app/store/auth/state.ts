import { proxyWithComputed } from 'valtio/utils';
import { IToken } from 'shared/types/token';
import jwtDecode from 'jwt-decode';
import { LocalStorageService } from 'shared/services/local-storage-service';

interface AuthStateProps {
	user: IToken | null;
	setUser: (token: string | null) => void;
}

interface AuthStateComputedProps {
	isLoggedIn: boolean;
}

export const authState = proxyWithComputed<
	AuthStateProps,
	AuthStateComputedProps
>(
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
