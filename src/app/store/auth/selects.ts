import {useSnapshot} from "valtio";
import {authState} from "app/store/auth/state";

// eslint-disable-next-line react-hooks/rules-of-hooks
export const isLoggedIn = () => useSnapshot(authState).isLoggedIn
