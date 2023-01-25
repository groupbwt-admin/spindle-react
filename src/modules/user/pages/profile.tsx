import styled from '@emotion/styled/macro';
import { Avatar } from 'shared/components/avatar/avatar';
import { Typography } from 'shared/components/typography/typography';
import { VideoCard } from 'shared/components/video-card/video-card';
import { Button } from 'shared/components/button/button';
import { Icon } from 'shared/components/icon/icon';
import { ICON_COLLECTION } from 'shared/components/icon/icon-list';
import { useEditProfileUser } from 'modules/user/hooks/use-edit-profile-user';
import { selectUserData } from 'app/store/user/selects';
import { VideoApi } from 'app/api/video-api/video-api';
import { useEffect, useState } from 'react';
import { SearchInput } from 'shared/components/search-input/search-input';

const ProfileContainer = styled.div``;

const VideoContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-auto-columns: 306px;
	grid-auto-flow: row dense;
	padding-top: 48px;
	grid-column-gap: 24px;
	grid-row-gap: 24px;
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

const ActionsPanel = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 40px;
`;

export const ProfilePage = () => {
	const { modal, handleOpen } = useEditProfileUser();
	const [videos, setVideos] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const user = selectUserData();

	const getVideoList = async () => {
		const response = await VideoApi.getMyVideos();
		setVideos(response.data);
	};

	const searchHandler = (e) => {
		setSearchQuery(e.target.value);
	};

	const clearSearchHandler = () => {
		setSearchQuery('');
	};

	useEffect(() => {
		getVideoList();
	}, []);

	return (
		<ProfileContainer>
			<ProfileInfo>
				<ProfileAvatar src={user?.avatar} alt={user?.fullName} />
				<div>
					<Typography variant="h3">{user?.fullName}</Typography>
				</div>
				<EditProfileButton
					label="Edit profile"
					startIcon={<StyledIcon icon={ICON_COLLECTION.edit_profile} />}
					size="small"
					onClick={handleOpen}
				/>
			</ProfileInfo>
			<ActionsPanel>
				<SearchInput
					value={searchQuery}
					onChange={searchHandler}
					onClear={clearSearchHandler}
				/>
			</ActionsPanel>
			<VideoContainer>
				<VideoCard />
				<VideoCard />
				<VideoCard />
				<VideoCard />
				<VideoCard />
				<VideoCard />
			</VideoContainer>
			{modal}
		</ProfileContainer>
	);
};
