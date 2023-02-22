import * as React from 'react';
import styled from '@emotion/styled/macro';

import {EmptyVideoList} from 'shared/components/empty-video-llist/empty-video-list';
import {Filter} from 'shared/components/filter/filter';
import {SearchInput} from 'shared/components/search-input/search-input';
import {SortDropdown} from 'shared/components/sort-dropdown/sort-dropdown';
import {ActionPanel} from 'shared/components/table/action-panel';
import {VideoList} from 'shared/components/table/video-list';
import {Typography} from 'shared/components/typography/typography';
import {VideoListSkeleton} from 'shared/components/video-list-skeleton/video-list-skeleton';

import {StartRecordButton} from "../components/start-record-button";
import {useRecordContext} from "../hooks/use-record-context";

import {useHome} from './use-home';

const VideoContainer = styled.div`
	padding-top: 48px;
	padding-bottom: 80px;
	display: flex;
	flex-direction: column;
	align-items: center;
	flex-grow: 1;

	.infinite-scroll-component__outerdiv {
		width: 100%;
	}
`;

const FiltersPanel = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 40px;
`;

const StyledActionPanel = styled(ActionPanel)`
	position: fixed;
	bottom: 22px;
	left: calc(50% - 240px);
`;

const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

const Title = styled(Typography)`
	flex-shrink: 0;
`;


export const HomePage = () => {
	const [value, setValue] = React.useState(0);

	const {models, commands} = useHome();

	const {isRecording, startRecording, isOnline} = useRecordContext()

	return (
		<>
			<HeaderContainer>
				<Title variant="h1">My videos</Title>

				<StartRecordButton isRecording={isRecording} onStartRecording={startRecording} isOnline={isOnline}/>


			</HeaderContainer>
			<ContentContainer>
				<FiltersPanel>
					<SearchInput
						value={models.searchQuery}
						isLoading={models.isSearching}
						onChange={commands.handleSearch}
						onClear={commands.handleClearSearch}
					/>
					<SortDropdown
						sortOptions={models.filterOptions}
						value={models.filterOptions.sortField}
						options={models.SORT_OPTIONS}
						onChangeSortField={commands.handleChangeSortField}
					/>
					<Filter
						tags={models.tags}
						initialFilterOptions={models.filterOptions}
						onApplyFilters={commands.handleApplyFilters}
					/>
				</FiltersPanel>
				<VideoContainer>
					{!!models.videos.length && (
						<VideoList
							activeActions={{
								copy: true,
								download: true,
							}}
							list={models.videos}
							selectedVideos={models.selectedVideos}
							hasNextPage={models.meta?.hasNextPage}
							isVideoLoading={models.isVideoLoading}
							isSelectMode={models.isSelectMode}
							loadNextPage={commands.loadNextPage}
							onChecked={commands.handleCheckVideo}
						/>
					)}
					{models.isInitialLoading && <VideoListSkeleton/>}
					{models.isListEmpty && <EmptyVideoList/>}
				</VideoContainer>
				{models.isSelectMode && (
					<StyledActionPanel
						activeActions={{
							copy: true,
						}}
						isLinksCopied={models.isLinksCopied}
						selectedVideos={models.selectedVideosId}
						cancelSelection={commands.handleCancelSelection}
						onCopyLinks={commands.handleCopySelectedLinks}
					/>
				)}
			</ContentContainer>
		</>
	);
};
