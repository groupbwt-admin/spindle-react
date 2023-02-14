import React, { ReactNode } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from '@emotion/styled/macro';

import { IVideo } from 'shared/types/video';

import { Button } from 'shared/components/button/button';
import {
	VideoCard,
	VideoCardProps,
} from 'shared/components/video-card/video-card';

const VideoContainer = styled(InfiniteScroll)`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(5, minmax(0px, 1fr));
	grid-auto-columns: 306px;
	grid-column-gap: 24px;
	grid-row-gap: 24px;
	overflow: unset !important;

	@media screen and (max-width: ${({ theme }) =>
			theme.breakpoints.values.xl}px) {
		grid-template-columns: repeat(4, minmax(0px, 1fr));
	}

	@media screen and (max-width: ${({ theme }) =>
			theme.breakpoints.values.lg}px) {
		grid-template-columns: repeat(3, minmax(0px, 1fr));
	}

	@media screen and (max-width: ${({ theme }) =>
			theme.breakpoints.values.md}px) {
		grid-template-columns: repeat(2, minmax(0px, 1fr));
	}

	@media screen and (max-width: ${({ theme }) =>
			theme.breakpoints.values.sm}px) {
		grid-template-columns: repeat(1, minmax(0px, 1fr));
	}
`;

const EndMessage = styled.div`
	text-align: center;
	grid-column: 1 / -1;
	color: ${({ theme }) => theme.palette.text.secondary};
	padding-top: 50px;
`;

const LoadingMessage = styled.div`
	text-align: center;
	grid-column: 1 / -1;
	color: ${({ theme }) => theme.palette.text.secondary};
`;

const LoadMoreBtn = styled(Button)`
	margin: 15px auto;
`;

const BtnContainer = styled.div`
	display: flex;
`;

interface VideoListProps {
	list: IVideo[];
	activeActions?: VideoCardProps['activeActions'];
	selectedVideos: Record<IVideo['id'], IVideo>;
	isVideoLoading?: boolean;
	hasNextPage?: boolean;
	isSelectMode: boolean;
	loadNextPage: () => void;
	onChecked: (IVideo) => void;
	onDeleteVideo?: (video: IVideo) => void;
}

export const VideoList: React.FC<VideoListProps> = ({
	isSelectMode,
	isVideoLoading,
	hasNextPage,
	loadNextPage,
	selectedVideos,
	list,
	activeActions,
	onChecked,
	onDeleteVideo,
}) => {
	const isCardChecked = (cardId) => {
		return !!selectedVideos[cardId];
	};

	return (
		<>
			<VideoContainer
				dataLength={list.length}
				next={loadNextPage}
				hasMore={hasNextPage || false}
				loader={<LoadingMessage>Loading...</LoadingMessage>}
				scrollableTarget={document.querySelector(' main') as ReactNode}
				endMessage={
					<EndMessage>
						<span>Yay! You have seen it all</span>
					</EndMessage>
				}
			>
				{list.map((item) => (
					<VideoCard
						key={item.id}
						video={item}
						checked={isCardChecked(item.id)}
						activeActions={activeActions}
						onChecked={onChecked}
						isSelectMode={isSelectMode}
						onDelete={onDeleteVideo}
					/>
				))}
			</VideoContainer>
			{hasNextPage && !isVideoLoading && (
				<BtnContainer>
					<LoadMoreBtn
						label="Load more"
						color="secondary"
						onClick={loadNextPage}
					/>
				</BtnContainer>
			)}
		</>
	);
};
