import { proxyWithComputed } from 'valtio/utils';
import { IToken } from 'shared/types/token';

interface AuthStateProps {
	user: IToken | null;
}

interface AuthStateComputedProps {
	isLoggedIn: boolean;
}

export const authState = proxyWithComputed<
	AuthStateProps,
	AuthStateComputedProps
>(
	{ user: null },
	{
		isLoggedIn: (state) => !!state.user,
	},
);
