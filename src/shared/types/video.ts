import { IUser } from 'shared/types/user';

import { VideoPermissionsEnum } from 'shared/constants/modal-names';

export interface IVideo {
	id: string;
	createdAt: string;
	gif: string;
	image: string;
	isComments: boolean;
	tags: string[];
	title: string;
	user: IUser;
	countComment: number;
	viewsCount: number;
	viewAccess: VideoPermissionsEnum;
}

export interface IVideoSign {
	expirationDate: string;
	url: string;
}

export interface ITag {
	id: string;
	tag: string;
}
