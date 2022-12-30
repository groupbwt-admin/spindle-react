import { BaseHttpServices } from 'shared/services/base-http-services';
import { IUser } from 'shared/types/user';

export interface UpdateProfileDto {
	firstName: string;
	lastName: string;
	file: File;
}

interface UserApiInterface {
	getProfile: (data: UpdateProfileDto) => Promise<IUser>;
	updateProfile: (data: UpdateProfileDto) => Promise<IUser>;
}

export class UserApiService implements UserApiInterface {
	private readonly http: BaseHttpServices;

	constructor(httpService: BaseHttpServices) {
		this.http = httpService;
	}

	getProfile = async (): Promise<IUser> => {
		const payload = await this.http.get(`/users/me`);

		return payload.data;
	};

	updateProfile = async (data: UpdateProfileDto): Promise<IUser> => {
		const profileData = new FormData();
		profileData.append('firstName', data.firstName);
		profileData.append('lastName', data.lastName);
		profileData.append('file', data.file);

		const payload = await this.http.patch(`/users/me`, profileData);

		return payload.data;
	};
}

export const UserApi = new UserApiService(new BaseHttpServices());
