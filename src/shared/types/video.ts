import { IUser } from 'shared/types/user';

export interface IVideo {
	id: string;
	createdAt: string;
	gif: string;
	isComments: boolean;
	tags: string[];
	title: string;
	user: IUser;
	countComment: number;
	viewsCount: number;
}

export interface IVideoSign {
	expirationDate: string;
	url: string;
}

export interface ITag {
	id: string;
	tag: string;
}
