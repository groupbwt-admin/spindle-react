import { useAuthState } from 'app/store/auth/state';
// eslint-disable-next-line react-hooks/rules-of-hooks
export const selectIsLoggedIn = () => useAuthState((state) => !!state.user);
// eslint-disable-next-line react-hooks/rules-of-hooks
export const selectAuthUserData = () => useAuthState((state) => state.user);
