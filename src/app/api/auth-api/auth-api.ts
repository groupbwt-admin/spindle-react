import { AxiosError, AxiosResponse } from 'axios';
import { BaseHttpServices } from 'shared/services/base-http-services';
import { IUser } from 'shared/types/user';

export interface LoginDataDto {
	username: string;
	password: string;
}

export interface RegisterDataDto {
	email: string;
	password: string;
	confirmPassword: string;
}

export interface ForgotPasswordDataDto {
	usernameOrEmail: string;
}

export interface VerifyEmailDataDto {
	token: string;
}

export interface VerifyEmailDataDto {
	token: string;
}

export interface ResetPasswordDto {
	token: string;
	password: string;
}

export interface SetNewPasswordDto {
	currentPassword: string;
	newPassword: string;
	newDuplicatePassword: string;
}

export interface GoogleAuthDto {
	token: string;
}

interface AuthApiInterface {
	login: (data: LoginDataDto) => Promise<{ accessToken: string }>;
	register: (data: RegisterDataDto) => Promise<{ accessToken: string }>;
	verifyEmail: (data: VerifyEmailDataDto) => Promise<string>;
	resendConfirmationLink: () => Promise<void>;
	forgotPassword: (data: ForgotPasswordDataDto) => Promise<string>;
	resetPassword: (data: ResetPasswordDto) => Promise<string>;
	setNewPassword: (data: SetNewPasswordDto) => Promise<string>;
	googleAuth: (
		data: GoogleAuthDto,
	) => Promise<{ accessToken: string; user: IUser }>;
}

export class AuthApiService implements AuthApiInterface {
	private readonly http: BaseHttpServices;

	constructor(httpService: BaseHttpServices) {
		this.http = httpService;
	}

	register = async (data: RegisterDataDto): Promise<{ accessToken: string; user: IUser }> => {
		const payload = await this.http.post(`/auth/register`, data, undefined);

		return payload.data;
	};

	login = async (data: LoginDataDto): Promise<{ accessToken: string }> => {
		const payload = await this.http.post<
			AxiosError<{ error: string; status: number }>,
			AxiosResponse<{ accessToken: string }>
		>(`/auth/log-in`, data, undefined);

		return payload.data;
	};

	verifyEmail = async (data: VerifyEmailDataDto): Promise<string> => {
		const payload = await this.http.post<
			AxiosError<{ error: string; status: number }>,
			AxiosResponse<string>
		>(`/email/confirm?token=${data.token}`);

		return payload.data;
	};

	resendConfirmationLink = async (): Promise<void> => {
		await this.http.post(`/email/resend-confirmation-link`);
	};

	forgotPassword = async (data: ForgotPasswordDataDto): Promise<string> => {
		const payload = await this.http.post(
			`/auth/reset-password`,
			data,
			undefined,
		);

		return payload.data.data;
	};

	resetPassword = async (data: ResetPasswordDto): Promise<string> => {
		const payload = await this.http.patch(
			`/auth/reset-password?token=${data.token}`,
			{ password: 'password' },
			undefined,
		);

		return payload.data.data;
	};

	setNewPassword = async (data: SetNewPasswordDto): Promise<string> => {
		const payload = await this.http.patch(`/auth/reset-password`, data);
		return payload.data;
	};

	googleAuth = async (
		data: GoogleAuthDto,
	): Promise<{ accessToken: string; user: IUser }> => {
		const payload = await this.http.post(`/google-auth`, data);
		return payload.data;
	};
}

export const AuthApi = new AuthApiService(new BaseHttpServices());
