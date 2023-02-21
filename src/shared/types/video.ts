import { IUser } from 'shared/types/user';

import { VideoPermissionsEnum } from 'shared/hooks/use-change-access-settings';

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
