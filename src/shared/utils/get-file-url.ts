import { USER_AVATAR_STORAGE_PATH } from 'shared/constants/file-storage-path';

export const getUserAvatarURL = (url: string) => {
	return USER_AVATAR_STORAGE_PATH + url;
};
