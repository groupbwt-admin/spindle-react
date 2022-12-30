export interface IToken {
	id: string;
	email: string;
	isEmailConfirmed: boolean;
	iat: number;
	exp: number;
}
