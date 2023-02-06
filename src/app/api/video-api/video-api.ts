import { BaseHttpServices } from 'shared/services/base-http-services';
import { IVideo, IVideoSign } from 'shared/types/video';

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
	order?: 'ASC' | 'DESC';
	page?: number;
	take?: number;
	sortField?: string;
	search?: string;
	signal?: AbortSignal;
	criteriaTags?: string[];
}

interface UserVideoListParamsDto extends VideoListParamsDto{
	userId?: string;
}

export interface GetVideoUrlDto {
	id: IVideo['id'];
}

interface VideoApiInterface {
	saveVideo: (data: SaveVideoDto) => Promise<IVideo>;
	getVideoUrl: (data: GetVideoUrlDto) => Promise<IVideoSign>;
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

	getVideoUrl = async ({id}: GetVideoUrlDto): Promise<IVideoSign> => {
		const payload = await this.http.get(`/videos/${id}/sign-url`);
		return payload.data;
	};

	getVideos = async ({signal, ...params}: VideoListParamsDto): Promise<VideoListResponseDto> => {
		const payload = await this.http.get(`/videos`, { params: params, signal });
		return payload.data;
	};

	getVideosByUserId = async ({signal, userId, ...params}: UserVideoListParamsDto): Promise<VideoListResponseDto> => {
		const payload = await this.http.get(`/videos/users/${userId}`, { params: params, signal });
		return payload.data;
	};
}

export const VideoApi = new VideoApiService(new BaseHttpServices());
