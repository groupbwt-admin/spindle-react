import { AxiosError, AxiosResponse } from 'axios';
import { BaseHttpServices } from 'shared/services/base-http-services';

export interface LoginDataDto {
	username: string;
	password: string;
}

export interface ForgotPasswordDataDto {
	usernameOrEmail: string;
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

interface AuthApiInterface {
	login: (data: LoginDataDto) => Promise<{ accessToken: string }>;
	verifyEmail: (data: VerifyEmailDataDto) => Promise<string>;
	forgotPassword: (data: ForgotPasswordDataDto) => Promise<string>;
	resetPassword: (data: ResetPasswordDto) => Promise<string>;
	setNewPassword: (data: SetNewPasswordDto) => Promise<string>;
}

export class AuthApiService implements AuthApiInterface {
	private readonly http: BaseHttpServices;

	constructor(httpService: BaseHttpServices) {
		this.http = httpService;
	}

	register = async (data: LoginDataDto): Promise<string> => {
		const payload = await this.http.post<
			AxiosError<{ error: string; status: number }>,
			AxiosResponse<string>
		>(`/auth/register`, data, undefined);

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
		return payload.data.data;
	};
}

export const AuthApi = new AuthApiService(new BaseHttpServices());
