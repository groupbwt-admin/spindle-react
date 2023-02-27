import { IUser } from 'shared/types/user';

import { BaseHttpServices } from 'shared/services/base-http-services';

export interface UpdateProfileDto {
	firstName: string;
	lastName: string;
	avatar: File;
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

	getUserById = async ({ id: userId }): Promise<IUser> => {
		const payload = await this.http.get(`/users/${userId}`);

		return payload.data;
	};

	updateProfile = async (data: UpdateProfileDto): Promise<IUser> => {
		const profileData = new FormData();
		for (const field in data) {
			profileData.append(field, data[field]);
		}
		const payload = await this.http.patch(`/users/me`, profileData);

		return payload.data;
	};
}

export const UserApi = new UserApiService(new BaseHttpServices());
