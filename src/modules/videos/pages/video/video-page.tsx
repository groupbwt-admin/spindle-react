import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled/macro';
import { format } from 'date-fns';

import { VideoApi } from 'app/api/video-api/video-api';

import { VIDEO_QUERY_KEYS } from 'shared/constants/query-keys';
import { getUserAvatarURL } from 'shared/utils/get-file-url';

import { Avatar } from 'shared/components/avatar/avatar';
import { Button } from 'shared/components/button/button';
import { ReactComponent as IconRecord } from 'shared/components/icon/collection/record.svg';
import { TagsAutocomplete } from 'shared/components/tags-autocomplete/tags-autocomplete';
import { Typography } from 'shared/components/typography/typography';
import { ActionMenu } from 'shared/components/video-card/action-menu';

const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding-bottom: 60px;
`;

const DetailedInfoContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	max-width: 890px;
`;

const ActionsContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	column-gap: 12px;
	padding: 16px 0;

	.MuiButtonBase-root {
		background: #ffffff;
		border: 1px solid #eeeff1;
		border-radius: 10px;
		padding: 16px 24px;
	}
`;

const Title = styled(Typography)`
	flex-shrink: 0;
`;

const ViewsCount = styled(Typography)`
	color: ${({ theme }) => theme.palette.text.secondary};
	margin-right: auto;
`;

const StyledVideo = styled.video`
	width: 100%;
	aspect-ratio: 2/1;
	border-radius: 10px;
`;

const StyledAvatar = styled(Avatar)`
	width: 42px;
	height: 42px;
	margin-right: 16px;
	border: none;
`;

const StyledCaption = styled(Typography)`
	color: ${({ theme }) => theme.palette.text.secondary};
`;

const RecordButton = styled(Button)`
	max-width: 190px;
	color: #ffffff;
	justify-self: flex-start;
`;

export const VideoPage: React.FC = () => {
	const urlParams = useParams<{ id: string }>();

	const videoUrl = useQuery({
		queryKey: [VIDEO_QUERY_KEYS.video_stream_url, urlParams.id],
		queryFn: () => VideoApi.getVideoUrl({ id: urlParams.id! }),
		enabled: !!urlParams.id,
	});

	const { data: video } = useQuery({
		queryKey: [VIDEO_QUERY_KEYS.video, urlParams.id],
		queryFn: () => VideoApi.getVideoInfoById({ id: urlParams.id! }),
		enabled: !!urlParams.id,
	});

	if (!videoUrl.data?.url || !video) return <></>;

	return (
		<>
			<HeaderContainer>
				<Title variant="h1">My videos</Title>
				<RecordButton label="Start Recording" startIcon={<IconRecord />} />
			</HeaderContainer>
			<StyledVideo autoPlay controls src={videoUrl.data.url} />
			{/*<VideoPlayer />*/}
			<Title variant="h1">Figma project one - august 2022</Title>
			<ActionsContainer>
				<ViewsCount variant="body1">4 views</ViewsCount>
				<Button label="Copy link" color="secondary" variant="outlined" />
				<Button label="Download" color="secondary" variant="outlined" />
				<ActionMenu
					isLinkCopied={false}
					onDownload={() => {}}
					onCopyLink={() => {}}
					onDelete={() => {}}
				/>
			</ActionsContainer>
			<DetailedInfoContainer>
				<StyledAvatar
					src={
						video.user.avatar ? getUserAvatarURL(video.user.avatar) : undefined
					}
				/>
				<div>
					<Typography variant="body1">
						{video.user.firstName + video.user.lastName}
					</Typography>
					<StyledCaption variant="subtitle2">
						{format(new Date(video.createdAt), 'MMMM d, yyyy')}
					</StyledCaption>
				</div>
				<TagsAutocomplete />
			</DetailedInfoContainer>
		</>
	);
};
