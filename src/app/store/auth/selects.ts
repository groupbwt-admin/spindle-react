/* eslint-disable react-hooks/rules-of-hooks */
import { shallow } from 'zustand/shallow';

import { useAuthState } from 'app/store/auth/state';

export const selectIsLoggedIn = () =>
	useAuthState((state) => !!state.user, shallow);
export const selectAuthUserData = () =>
	useAuthState((state) => state.user, shallow);
