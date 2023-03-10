import { AxiosResponse } from 'axios';

import { IComment } from 'shared/types/video';

import { RequestSortType } from 'shared/constants/request-sort-type';
import { BaseHttpServices } from 'shared/services/base-http-services';

export interface CreateCommentDto {
	videoId: string;
	body?: string;
	parentCommentId: string | null;
}

export interface EditCommentDto {
	id: string;
	body?: string;
}

export interface DeleteCommentDto {
	id: IComment['id'];
}

export interface CommentsListParamsDto {
	videoId: string;
	page?: number;
	take?: number;
	order?: RequestSortType.ASC | RequestSortType.DESC;
	signal?: AbortSignal;
}

export interface CommentsListResponseDto {
	data: IComment[];
	meta: {
		page: number;
		hasPreviousPage: boolean;
		hasNextPage: boolean;
		itemCount: number;
		pageCount: number;
		take: number;
	};
}

interface CommentsApiInterface {
	createComment: (data: CreateCommentDto) => Promise<IComment>;
	getComments: (
		params: CommentsListParamsDto,
	) => Promise<CommentsListResponseDto>;
	editComment: (data: EditCommentDto) => Promise<IComment>;
	deleteComment: (data: DeleteCommentDto) => Promise<AxiosResponse>;
}

export class CommentsApiService implements CommentsApiInterface {
	private readonly http: BaseHttpServices;

	constructor(httpService: BaseHttpServices) {
		this.http = httpService;
	}

	createComment = async (data: CreateCommentDto) => {
		const payload = await this.http.post(`/comments`, data);
		return payload.data;
	};

	getComments = async ({
		videoId,
		signal,
		...params
	}: CommentsListParamsDto) => {
		const payload = await this.http.get(`/comments/${videoId}`, {
			params: { order: 'DESC', take: 10, ...params },
			signal,
		});

		return payload.data;
	};

	editComment = async (data: EditCommentDto) => {
		const payload = await this.http.put(`/comments`, data);
		return payload.data;
	};

	deleteComment = async (payload: DeleteCommentDto) => {
		return await this.http.delete(`/comments`, { data: payload });
	};
}

export const CommentsApi = new CommentsApiService(new BaseHttpServices());
