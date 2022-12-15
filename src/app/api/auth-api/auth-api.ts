import { AxiosError, AxiosResponse } from 'axios';
import { BaseHttpServices } from 'shared/services/base-http-services';

export interface LoginDataDto {
	username: string;
	password: string;
}

export interface ForgotPasswordDataDto {
	usernameOrEmail: string;
}

export interface SetNewPasswordDto {
	token: string;
	password: string;
}

interface AuthApiInterface {
	login: (data: LoginDataDto) => Promise<string>;
	logout: () => Promise<AxiosResponse<any>>;
	forgotPassword: (data: ForgotPasswordDataDto) => Promise<string>;
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
		>(`/login`, data, undefined);

		return payload.data;

	};

	login = async (data: LoginDataDto): Promise<string> => {

			const payload = await this.http.post<
				AxiosError<{ error: string; status: number }>,
				AxiosResponse<string>
			>(`/login`, data, undefined);

			return payload.data;

	};

	logout = (): Promise<AxiosResponse<any>> => {
		return this.http.get(`/logout`);
	};

	forgotPassword = async (data: ForgotPasswordDataDto): Promise<string> => {
		const payload = await this.http.post(
			`/api/corepublic/reset/password/request`,
			data,
			undefined,
		);

		return payload.data.data;
	};

	setNewPassword = async (data: SetNewPasswordDto): Promise<string> => {
		const payload = await this.http.post(`/api/corepublic/reset/password/response`, data);
		return payload.data.data
	};
}

export const AuthApi = new AuthApiService(new BaseHttpServices());
