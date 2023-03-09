/* eslint-disable react-hooks/rules-of-hooks */
import { useAuthState } from 'app/store/auth/state';

export const selectIsLoggedIn = () => useAuthState((state) => !!state.user);
export const selectAuthUserData = () => useAuthState((state) => state.user);
