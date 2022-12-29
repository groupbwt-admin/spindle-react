import { AxiosError, AxiosResponse } from 'axios';
import { BaseHttpServices } from 'shared/services/base-http-services';

export interface UpdateProfileDto {
	firstName: string;
	lastName: string;
	file: File;
}

interface UserApiInterface {
	getProfile: (data: UpdateProfileDto) => Promise<any>;
	updateProfile: (data: UpdateProfileDto) => Promise<UpdateProfileDto>;
}

export class UserApiService implements UserApiInterface {
	private readonly http: BaseHttpServices;

	constructor(httpService: BaseHttpServices) {
		this.http = httpService;
	}

	getProfile = async (): Promise<any> => {
		const payload = await this.http.get(`/users/me`);

		return payload.data;
	};

	updateProfile = async (data: UpdateProfileDto): Promise<UpdateProfileDto> => {
		const profileData = new FormData();
		profileData.append('firstName', data.firstName);
		profileData.append('lastName', data.lastName);
		profileData.append('file', data.file);

		const payload = await this.http.patch<
			AxiosError<{ error: string; status: number }>,
			AxiosResponse<UpdateProfileDto>
		>(`/users/me`, profileData, undefined);

		return payload.data;
	};
}

export const UserApi = new UserApiService(new BaseHttpServices());
