import { AxiosResponse, isAxiosError } from 'axios';
import download from 'downloadjs';
import {
	BoundaryError,
	ForbiddenVideoBoundaryError,
	NotFoundVideoBoundaryError,
	UnauthorisedVideoBoundaryError,
} from 'shared/models/custom-errors';

import { IUser } from 'shared/types/user';
import { ITag, IVideo, IVideoSign } from 'shared/types/video';

import { VideoPermissionsEnum } from 'shared/constants/modal-names';
import { RequestSortType } from 'shared/constants/request-sort-type';
import { BaseHttpServices } from 'shared/services/base-http-services';

export interface SaveVideoDto {
	socketId: string;
	title?: string;
	tags?: string[];
}

export interface VideoListResponseDto {
	data: IVideo[];
	meta: {
		page: number;
		hasPreviousPage: boolean;
		hasNextPage: boolean;
		itemCount: number;
		pageCount: number;
		take: number;
		search: string;
	};
}

export interface VideoListParamsDto {
	order?: RequestSortType.ASC | RequestSortType.DESC;
	page?: number;
	take?: number;
	sortField?: string;
	search?: string;
	signal?: AbortSignal;
	criteriaTags?: string[];
}

export interface UpdateVideoDto {
	id: IVideo['id'];
	payload: {
		isComments?: boolean;
		title?: string;
		tags?: string[];
	};
}

export interface SearchParamsDto {
	search?: string;
	signal?: AbortSignal;
	searchByTag?: boolean;
	criteriaTags?: string[];
	meta?: {
		tags?: { page?: number; take?: number };
		users?: { page?: number; take?: number };
		videos?: { page?: number; take?: number };
	};
}

export interface SearchResponseDto {
	tags: ITag[];
	users: IUser[];
	videos: IVideo[];
	data: IVideo[];
	meta: {
		tags: VideoListResponseDto['meta'];
		users: VideoListResponseDto['meta'];
		videos: VideoListResponseDto['meta'];
	};
}

interface UserVideoListParamsDto extends VideoListParamsDto {
	userId?: string;
}

export interface GetVideoUrlDto {
	id: IVideo['id'];
	type?: string;
}

interface VideoApiInterface {
	saveVideo: (data: SaveVideoDto) => Promise<IVideo>;
	getVideoUrl: (data: GetVideoUrlDto) => Promise<IVideoSign>;
	getVideoStreamManifest: (url: string) => Promise<Blob>;
	getVideoInfoById: (data: GetVideoUrlDto) => Promise<IVideo>;
	updateVideoById: (data: UpdateVideoDto) => Promise<IVideo>;
	getVideos: (params: VideoListParamsDto) => Promise<SearchResponseDto>;
	getVideosByUserId: (
		params: UserVideoListParamsDto,
	) => Promise<VideoListResponseDto>;
	getVideoTags: (payload: { userId: string }) => Promise<ITag[]>;
	downloadVideoById: (payload: { id: IVideo['id']; title: string }) => void;
	deleteVideoById: (videoId: IVideo['id']) => Promise<AxiosResponse>;
	changeVideoPermissions: (payload: {
		id: IVideo['id'];
		viewAccess: VideoPermissionsEnum;
	}) => Promise<IVideo>;
	search: (data: SearchParamsDto) => Promise<SearchResponseDto>;
}

export class VideoApiService implements VideoApiInterface {
	private readonly http: BaseHttpServices;

	constructor(httpService: BaseHttpServices) {
		this.http = httpService;
	}

	saveVideo = async (data: SaveVideoDto): Promise<IVideo> => {
		const payload = await this.http.post(`/videos/save`, data);

		return payload.data;
	};

	getVideoUrl = async ({
		id,
		type = 'hls',
	}: GetVideoUrlDto): Promise<IVideoSign> => {
		const payload = await this.http.get(`/videos/${id}/sign-url`, {
			params: { type },
		});

		return payload.data;
	};

	getVideoStreamManifest = async (url: string): Promise<Blob> => {
		const payload = await this.http.get(url, {
			responseType: 'blob',
		});

		return payload.data;
	};

	getVideoInfoById = async ({ id }: GetVideoUrlDto): Promise<IVideo> => {
		try {
			const res = await this.http.get(`/videos/${id}/video-information`);
			return res.data;
		} catch (error) {
			if (!isAxiosError(error)) return Promise.reject(error);
			switch (error.response?.status) {
				case 401:
					return Promise.reject(new UnauthorisedVideoBoundaryError());
				case 404:
					return Promise.reject(new NotFoundVideoBoundaryError());
				case 403:
					return Promise.reject(new ForbiddenVideoBoundaryError());
				default:
					return Promise.reject(new BoundaryError());
			}
		}
	};

	updateVideoById = async ({
		id,
		payload,
	}: UpdateVideoDto): Promise<IVideo> => {
		const res = await this.http.patch(`/videos/${id}`, {
			title: 'My video',
			isComments: false,
			...payload,
		});

		return res.data;
	};

	getVideos = async ({
		signal,
		...params
	}: VideoListParamsDto): Promise<SearchResponseDto> => {
		const payload = await this.http.get(`/videos`, { params: params, signal });
		return payload.data;
	};

	getVideosByUserId = async ({
		signal,
		userId,
		...params
	}: UserVideoListParamsDto): Promise<VideoListResponseDto> => {
		const payload = await this.http.get(`/videos/users/${userId}`, {
			params: params,
			signal,
		});

		return payload.data;
	};

	getVideoTags = async ({ userId }): Promise<ITag[]> => {
		const payload = await this.http.get(`/tags`, {
			params: { userId },
		});

		return payload.data;
	};

	downloadVideoById = async ({ id, title }) => {
		const res = await this.http.get(`/videos/${id}/download`, {
			responseType: 'blob',
		});

		download(res.data, title, res.headers.contentType);
	};

	deleteVideoById = async (videoId) => {
		return await this.http.delete(`/videos/${videoId}`);
	};

	changeVideoPermissions = async ({ id, viewAccess }): Promise<IVideo> => {
		const payload = await this.http.patch(`/videos/${id}/change-permission`, {
			viewAccess,
		});

		return payload.data;
	};

	search = async ({
		signal,
		search,
		meta = {},
	}: SearchParamsDto): Promise<SearchResponseDto> => {
		const payload = await this.http.post(`/search`, meta, {
			params: { search },
			signal,
		});

		return payload.data;
	};
}

export const VideoApi = new VideoApiService(new BaseHttpServices());
