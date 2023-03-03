import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from '@emotion/styled/macro';

import { VideoApi } from '../../../app/api/video-api/video-api';
import { VIDEO_QUERY_KEYS } from '../../../shared/constants/query-keys';

import { BaseCommentInput } from './base-comment-input';
import { EditComment } from './edit-comment';

const StyledCommentsComponent = styled.div`
	display: block;
	width: 100%;
	margin-bottom: 60px;
`;

interface IComments {
	videoId: string;
}

const data = {
	data: [
		{
			id: '2a6b38cc-e846-48c7-be7b-3634a5553d76',
			createdAt: '2023-03-01T12:28:40.557Z',
			updatedAt: '2023-03-01T12:28:40.557Z',
			body: 'Comment 1',
			user: {
				id: 'a6af4b21-c077-490f-864c-ee0e20051fd0',
				role: 'user',
				email: 'polos_ss@groupbwt.com',
				avatar:
					'a6af4b21-c077-490f-864c-ee0e20051fd0/avatars/1338da3d-9c8c-43a1-9dd3-abc7b9bd1656.jpg',
				lastName: 'Polos',
				firstName: 'Stanislav',
			},
			countReplies: 2,
			subComments: [
				{
					id: '9f01e5a8-7b01-4278-b543-ecfde5e0346d',
					createdAt: '2023-03-01T13:01:30.081Z',
					updatedAt: '2023-03-01T13:01:30.081Z',
					body: 'Comment 1.1',
					user: {
						id: 'a6af4b21-c077-490f-864c-ee0e20051fd0',
						role: 'user',
						email: 'polos_ss@groupbwt.com',
						avatar:
							'a6af4b21-c077-490f-864c-ee0e20051fd0/avatars/1338da3d-9c8c-43a1-9dd3-abc7b9bd1656.jpg',
						lastName: 'Polos',
						firstName: 'Stanislav',
					},
					countReplies: 0,
					subComments: [],
				},
				{
					id: '8bdf77c1-7b79-472c-8e42-7874e399402e',
					createdAt: '2023-03-01T13:01:35.310Z',
					updatedAt: '2023-03-01T13:01:35.310Z',
					body: 'Comment 1.3',
					user: {
						id: 'a6af4b21-c077-490f-864c-ee0e20051fd0',
						role: 'user',
						email: 'polos_ss@groupbwt.com',
						avatar:
							'a6af4b21-c077-490f-864c-ee0e20051fd0/avatars/1338da3d-9c8c-43a1-9dd3-abc7b9bd1656.jpg',
						lastName: 'Polos',
						firstName: 'Stanislav',
					},
					countReplies: 1,
					subComments: [
						{
							id: '86b64fdb-7647-48ff-971b-face998c7dd3',
							createdAt: '2023-03-01T13:02:04.447Z',
							updatedAt: '2023-03-01T13:02:04.447Z',
							body: 'Comment 1.3.1',
							user: {
								id: 'a6af4b21-c077-490f-864c-ee0e20051fd0',
								role: 'user',
								email: 'polos_ss@groupbwt.com',
								avatar:
									'a6af4b21-c077-490f-864c-ee0e20051fd0/avatars/1338da3d-9c8c-43a1-9dd3-abc7b9bd1656.jpg',
								lastName: 'Polos',
								firstName: 'Stanislav',
							},
							countReplies: 2,
							subComments: [
								{
									id: '0858e920-9e1f-48d3-82aa-d68e3b922e0c',
									createdAt: '2023-03-01T13:02:17.411Z',
									updatedAt: '2023-03-01T13:02:17.411Z',
									body: 'Comment 1.3.1.1',
									user: {
										id: 'a6af4b21-c077-490f-864c-ee0e20051fd0',
										role: 'user',
										email: 'polos_ss@groupbwt.com',
										avatar:
											'a6af4b21-c077-490f-864c-ee0e20051fd0/avatars/1338da3d-9c8c-43a1-9dd3-abc7b9bd1656.jpg',
										lastName: 'Polos',
										firstName: 'Stanislav',
									},
									countReplies: 0,
									subComments: [],
								},
								{
									id: '2590f88e-71d3-46ec-8abf-f6b8bee68e1d',
									createdAt: '2023-03-01T13:02:23.139Z',
									updatedAt: '2023-03-01T13:02:23.139Z',
									body: 'Comment 1.3.1.2',
									user: {
										id: 'a6af4b21-c077-490f-864c-ee0e20051fd0',
										role: 'user',
										email: 'polos_ss@groupbwt.com',
										avatar:
											'a6af4b21-c077-490f-864c-ee0e20051fd0/avatars/1338da3d-9c8c-43a1-9dd3-abc7b9bd1656.jpg',
										lastName: 'Polos',
										firstName: 'Stanislav',
									},
									countReplies: 1,
									subComments: [
										{
											id: '05bb9c00-1efc-4e7b-ab51-7d3d8a47daa9',
											createdAt: '2023-03-01T13:02:35.440Z',
											updatedAt: '2023-03-01T13:02:35.440Z',
											body: 'Comment 1.3.1.2.1',
											user: {
												id: 'a6af4b21-c077-490f-864c-ee0e20051fd0',
												role: 'user',
												email: 'polos_ss@groupbwt.com',
												avatar:
													'a6af4b21-c077-490f-864c-ee0e20051fd0/avatars/1338da3d-9c8c-43a1-9dd3-abc7b9bd1656.jpg',
												lastName: 'Polos',
												firstName: 'Stanislav',
											},
											countReplies: 1,
											subComments: [
												{
													id: 'f9fd323e-742e-491f-9838-dcd42cc6258f',
													createdAt: '2023-03-01T13:02:47.908Z',
													updatedAt: '2023-03-01T13:02:47.908Z',
													body: 'Comment 1.3.1.2.1.1',
													user: {
														id: 'a6af4b21-c077-490f-864c-ee0e20051fd0',
														role: 'user',
														email: 'polos_ss@groupbwt.com',
														avatar:
															'a6af4b21-c077-490f-864c-ee0e20051fd0/avatars/1338da3d-9c8c-43a1-9dd3-abc7b9bd1656.jpg',
														lastName: 'Polos',
														firstName: 'Stanislav',
													},
													countReplies: 1,
												},
											],
										},
									],
								},
							],
						},
					],
				},
			],
		},
	],
	meta: {
		page: 1,
		take: 1,
		itemCount: 1,
		pageCount: 1,
		hasPreviousPage: false,
		hasNextPage: false,
	},
};
export const Comments: React.FC<IComments> = ({ videoId }) => {
	console.log(videoId);
	const [comments, setComments] = useState(data.data);
	// const {
	// 	data: video,
	// 	isLoading: isVideoDataLoading,
	// 	error: videoError,
	// } = useQuery({
	// 	queryKey: [VIDEO_QUERY_KEYS.video, urlParams.id],
	// 	queryFn: () => VideoApi.getVideoInfoById({ id: urlParams.id! }),
	// 	enabled: !!urlParams.id,
	// 	retry: 1,
	// });

	return (
		<StyledCommentsComponent>
			<BaseCommentInput />
			{comments.length &&
				data.data.map((comment: any) => (
					<EditComment
						key={comment.id}
						subComments={comment.subComments}
						id={comment.id}
						body={comment.body}
						user={comment.user}
					/>
				))}
		</StyledCommentsComponent>
	);
};
