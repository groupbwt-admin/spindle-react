import { useSnapshot } from 'valtio';
import { userState } from 'app/store/user/state';

// eslint-disable-next-line react-hooks/rules-of-hooks
export const selectUserData = () => useSnapshot(userState).user;
// eslint-disable-next-line react-hooks/rules-of-hooks
export const selectIsLoadingUserData = () => useSnapshot(userState).isLoading;
