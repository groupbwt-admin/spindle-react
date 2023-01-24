import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { VideoApi } from 'app/api/video-api/video-api';
import { VIDEO_QUERY_KEYS } from 'shared/constants/query-keys';
import { VideoPlayer } from 'shared/components/video-player/video-player';

export const VideoPage: React.FC = () => {
	const urlParams = useParams<{ id: string }>();

	const videoUrl = useQuery({
		queryKey: [VIDEO_QUERY_KEYS.video, urlParams.id],
		queryFn: () => VideoApi.getVideoUrl({ id: urlParams.id! }),
		enabled: !!urlParams.id,
	});

	if (!videoUrl.data?.url) return <></>;

	return (
		<>
			<video
				autoPlay
				controls
				src={videoUrl.data.url}
			/>
			<VideoPlayer />
		</>
	);
};
