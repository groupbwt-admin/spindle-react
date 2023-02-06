import styled from '@emotion/styled/macro';
import { ICON_COLLECTION } from 'shared/components/icon/icon-list';
import { Avatar } from 'shared/components/avatar/avatar';
import { Typography } from 'shared/components/typography/typography';
import { Button } from 'shared/components/button/button';
import { Icon } from 'shared/components/icon/icon';
import { SearchInput } from 'shared/components/search-input/search-input';
import { VideoList } from 'modules/user/pages/profile/components/video-list';
import { useProfile } from 'modules/user/pages/profile/use-profile';
import { VideoListSkeleton } from 'shared/components/video-list-skeleton/video-list-skeleton';
import { ActionPanel } from 'modules/user/pages/profile/components/action-panel';
import { FetchLinearLoader } from 'shared/components/fetch-linear-loader/fetch-linear-loader';
import { EmptyVideoList } from 'shared/components/empty-video-llist/empty-video-list';

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
	justify-content: center;
	flex-grow: 1;
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
					onChange={commands.searchHandler}
					onClear={commands.clearSearchHandler}
				/>
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
						onChecked={commands.checkVideoHandler}
					/>
				)}
				{models.isInitialLoading && <VideoListSkeleton />}
				{models.isListEmpty && <EmptyVideoList />}
			</VideoContainer>
			{models.modal}
			{models.isSelectMode && (
				<StyledActionPanel
					selectedCount={models.selectedVideos.length}
					cancelSelection={commands.cancelSelectionHandler}
				/>
			)}
		</ProfileContainer>
	);
};
