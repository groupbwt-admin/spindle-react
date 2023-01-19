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

	console.log(videoUrl);

	if (!videoUrl.data?.url) return <></>;

	return (
		<>
			<video
				autoPlay
				controls
				src="http://spindle-api.groupbwt.com/api/videos/streaming?videoId=1ac41b94-098b-48fd-9c81-3aa53356d975&expirationDate=2023-01-13T19%3A18%3A03.697Z&signed=cf62305d6145c586a5ad18729af8ea0517ed42c29a1e12e2562fe2582989d645"
			/>
			<VideoPlayer />
		</>
	);
};
