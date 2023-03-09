import jwtDecode from 'jwt-decode';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { IToken } from 'shared/types/token';

import { LocalStorageService } from 'shared/services/local-storage-service';

interface IAuthState {
	user: IToken | null;
	setUser: (token: string | null) => void;
}

export const useAuthState = create<IAuthState>()(
	devtools((set) => ({
		user: null,
		setUser(token: string | null) {
			if (!token) {
				LocalStorageService.remove('token');
				set({ user: null });
				return;
			}
			const userData: IToken = jwtDecode(token);
			LocalStorageService.set('token', token);
			set({ user: userData });
		},
	})),
);
