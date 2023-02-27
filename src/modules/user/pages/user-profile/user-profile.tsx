import styled from '@emotion/styled/macro';
import { useUserProfile } from 'modules/user/pages/user-profile/use-user-profile';

import { getUserAvatarURL } from 'shared/utils/get-file-url';

import { Avatar } from 'shared/components/avatar/avatar';
import { EmptyVideoList } from 'shared/components/empty-video-llist/empty-video-list';
import { FetchLinearLoader } from 'shared/components/fetch-linear-loader/fetch-linear-loader';
import { Filter } from 'shared/components/filter/filter';
import { SearchInput } from 'shared/components/search-input/search-input';
import { SortDropdown } from 'shared/components/sort-dropdown/sort-dropdown';
import { ActionPanel } from 'shared/components/table/action-panel';
import { VideoList } from 'shared/components/table/video-list';
import { Typography } from 'shared/components/typography/typography';
import { VideoListSkeleton } from 'shared/components/video-list-skeleton/video-list-skeleton';

const ProfileContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

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

const ProfileAvatar = styled(Avatar)`
	width: 64px;
	height: 64px;
	border: none;
	margin-right: 12px;
`;

const ProfileInfo = styled.div`
	display: flex;
	align-items: center;
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

export const UserProfilePage = () => {
	const { models, commands } = useUserProfile();

	return (
		<ProfileContainer>
			{(models.isVideoLoading ||
				models.isInitialLoading ||
				models.isSearching) && <FetchLinearLoader />}
			{!!models.user && (
				<ProfileInfo>
					<ProfileAvatar
						src={getUserAvatarURL(models.user.avatar)}
						alt={`${models.user.firstName} ${models.user.lastName}`}
					/>
					<div>
						<Typography variant="h3">{`${models.user.firstName} ${models.user.lastName}`}</Typography>
					</div>
				</ProfileInfo>
			)}
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
						userId={models.user?.id}
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
		</ProfileContainer>
	);
};
