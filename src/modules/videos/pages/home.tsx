import * as React from 'react';
import styled from '@emotion/styled/macro';

import { Button } from 'shared/components/button/button';
import { EmptyVideoList } from 'shared/components/empty-video-llist/empty-video-list';
import { Filter } from 'shared/components/filter/filter';
import { ReactComponent as IconRecord } from 'shared/components/icon/collection/record.svg';
import { SearchInput } from 'shared/components/search-input/search-input';
import { SortDropdown } from 'shared/components/sort-dropdown/sort-dropdown';
import { ActionPanel } from 'shared/components/table/action-panel';
import { VideoList } from 'shared/components/table/video-list';
import { Typography } from 'shared/components/typography/typography';
import { VideoListSkeleton } from 'shared/components/video-list-skeleton/video-list-skeleton';

import { useRecording } from '../hooks/use-recording';

import { useHome } from './use-home';

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

const ContentContainer = styled.div``;

const Title = styled(Typography)`
	flex-shrink: 0;
`;

const RecordButton = styled(Button)`
	max-width: 190px;
	color: #ffffff;
`;

export const HomePage = () => {
	const [value, setValue] = React.useState(0);

	const { models, commands } = useHome();

	const {
		models: { timeRecording, recordStatus, isMicrophoneOn },
		command: {
			toggleMicrophone,
			pauseRecording,
			resetRecording,
			resumeRecording,
			startRecording,
			stopRecording,
		},
	} = useRecording();

	return (
		<>
			<HeaderContainer>
				<Title variant="h1">My videos</Title>
				<RecordButton
					label="Start Recording"
					startIcon={<IconRecord />}
					onClick={startRecording}
				/>
			</HeaderContainer>
			<ContentContainer>
				{/*<TabsList value={value} handleChange={handleChange}>*/}
				{/*	<Tab label="My videos" />*/}
				{/*	<Tab label="Shared videos" />*/}
				{/*	<Tab label="All videos" />*/}
				{/*</TabsList>*/}
				{/*<div>*/}
				{/*	<p>Status: {recordStatus}</p>*/}
				{/*	<p>Time: {timeRecording}</p>*/}
				{/*	<button onClick={startRecording}>Start Recording</button>*/}
				{/*	<button onClick={stopRecording}>Stop Recording</button>*/}
				{/*	<button onClick={pauseRecording}>Pause Recording</button>*/}
				{/*	<button onClick={resumeRecording}>Resume Recording</button>*/}
				{/*	<button onClick={resetRecording}>Reset Recording</button>*/}
				{/*	<button onClick={toggleMicrophone}>*/}
				{/*		toggleMicrophone + {isMicrophoneOn ? 'true' : 'false'}*/}
				{/*	</button>*/}
				{/*</div>*/}
				<FiltersPanel>
					<SearchInput
						value={models.searchQuery}
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
					{models.isInitialLoading && <VideoListSkeleton />}
					{models.isListEmpty && <EmptyVideoList />}
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
