import styled from '@emotion/styled/macro';
import { ActionPanel } from 'modules/user/pages/profile/components/action-panel';
import { VideoList } from 'modules/user/pages/profile/components/video-list';
import { useProfile } from 'modules/user/pages/profile/use-profile';

import { Avatar } from 'shared/components/avatar/avatar';
import { Button } from 'shared/components/button/button';
import { EmptyVideoList } from 'shared/components/empty-video-llist/empty-video-list';
import { FetchLinearLoader } from 'shared/components/fetch-linear-loader/fetch-linear-loader';
import { Filter } from 'shared/components/filter/filter';
import { Icon } from 'shared/components/icon/icon';
import { ICON_COLLECTION } from 'shared/components/icon/icon-list';
import { SearchInput } from 'shared/components/search-input/search-input';
import { SortDropdown } from 'shared/components/sort-dropdown/sort-dropdown';
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

const EditProfileButton = styled(Button)`
	margin-left: auto;
`;

const StyledIcon = styled(Icon)`
	width: 19px;
	height: 19px;

	svg {
		width: 19px;
		height: 19px;
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

export const ProfilePage = () => {
	const { models, commands } = useProfile();

	return (
		<ProfileContainer>
			{(models.isVideoLoading ||
				models.isInitialLoading ||
				models.isSearching) && <FetchLinearLoader />}
			<ProfileInfo>
				<ProfileAvatar src={models.user?.avatar} alt={models.user?.fullName} />
				<div>
					<Typography variant="h3">{models.user?.fullName}</Typography>
				</div>
				<EditProfileButton
					label="Edit profile"
					startIcon={<StyledIcon icon={ICON_COLLECTION.edit_profile} />}
					size="small"
					onClick={commands.handleOpen}
				/>
			</ProfileInfo>
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
				{models.tags && (
					<Filter
						tags={models.tags}
						initialFilterOptions={models.filterOptions}
						onApplyFilters={commands.handleApplyFilters}
					/>
				)}
			</FiltersPanel>
			<VideoContainer>
				{!!models.videos.length && (
					<VideoList
						list={models.videos}
						selectedVideos={models.selectedVideos}
						hasNextPage={models.meta?.hasNextPage}
						isVideoLoading={models.isVideoLoading}
						isSelectMode={models.isSelectMode}
						loadNextPage={commands.loadNextPage}
						onChecked={commands.handleCheckVideo}
						onDeleteVideo={commands.handleDeleteVideo}
					/>
				)}
				{models.isInitialLoading && <VideoListSkeleton />}
				{models.isListEmpty && <EmptyVideoList />}
			</VideoContainer>
			{models.modal}
			{models.isSelectMode && (
				<StyledActionPanel
					selectedVideos={models.selectedVideosId}
					cancelSelection={commands.handleCancelSelection}
					onOpenDeleteVideoModal={commands.handleDeleteSelectedVideos}
				/>
			)}
			{models.deleteVideoModal}
		</ProfileContainer>
	);
};
