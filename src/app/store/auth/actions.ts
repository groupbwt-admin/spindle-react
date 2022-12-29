import { authState } from 'app/store/auth/state';
import { IToken } from 'shared/types/token';

export const setAuthUserData = (data: IToken | null) => {
	authState.user = data;
};
