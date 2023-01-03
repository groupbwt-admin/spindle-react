export interface IUser {
	id?: string;
	email: string;
	firstName: string;
	lastName: string;
	avatar: string;
	role: string;
	hashedPassword: string;
	isRegisteredWithGoogle: boolean;
	isEmailConfirmed: boolean;
	createdAt: string;
	deletedAt: string;
}
