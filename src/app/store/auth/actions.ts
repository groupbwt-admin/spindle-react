import {authState} from "app/store/auth/state";

export const setAuthUserData = (data: {username : string}) => {
	authState.user = data
}
