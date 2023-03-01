import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecordContext } from 'modules/videos/hooks/use-record-context';

import { VideoApi } from 'app/api/video-api/video-api';

import { selectUserData } from 'app/store/user/selects';

import { VIDEO_ROUTES } from 'shared/config/routes';
import { VIDEO_QUERY_KEYS } from 'shared/constants/query-keys';
import { useChangeAccessSettings } from 'shared/hooks/use-change-access-settings';
import { useCopyLink } from 'shared/hooks/use-copy-link';
import { useDeleteVideo } from 'shared/hooks/use-delete-video';

export function useVideo() {
	const urlParams = useParams<{ id: string }>();
	const client = useQueryClient();
	const nav = useNavigate();
	const location = useLocation();
	const user = selectUserData();

	const recordContext = useRecordContext();

	const {
		data: video,
		isLoading: isVideoDataLoading,
		error: videoError,
	} = useQuery({
		queryKey: [VIDEO_QUERY_KEYS.video, urlParams.id],
		queryFn: () => VideoApi.getVideoInfoById({ id: urlParams.id! }),
		enabled: !!urlParams.id,
		retry: 1,
	});

	const videoUrl = useQuery({
		queryKey: [VIDEO_QUERY_KEYS.video_stream_url, urlParams.id],
		queryFn: () => VideoApi.getVideoUrl({ id: urlParams.id! }),
		enabled: !!video,
	});

	const tags = useQuery({
		queryKey: [VIDEO_QUERY_KEYS.tags],
		queryFn: () => VideoApi.getVideoTags({ userId: user?.id }),
		enabled: !!user,
	});
	console.log(video);

	const { isLinkCopied, handleCopyLink } = useCopyLink(video);

	const downloadVideoMutation = useMutation(VideoApi.downloadVideoById);

	const updateVideoMutation = useMutation(VideoApi.updateVideoById);

	const onVideosDeleted = async () => {
		nav(location.state?.from || VIDEO_ROUTES.MY_VIDEOS);
	};

	const { modal: deleteVideoModal, startDeleteVideos } = useDeleteVideo({
		onVideosDeleted,
	});

	const handleDownload = (e) => {
		e.stopPropagation();
		downloadVideoMutation.mutate({ id: video?.id, title: video?.title });
	};

	const handleDeleteVideo = () => {
		startDeleteVideos([video]);
	};

	const { modal: accessSettingsModal, startChangeSettings } =
		useChangeAccessSettings();

	const handleChangeVideoSettings = () => {
		startChangeSettings(video?.id);
	};

	const handleUpdateVideo = async (payload) => {
		const res = await updateVideoMutation.mutateAsync({
			id: video?.id,
			payload,
		});
		client.setQueryData([VIDEO_QUERY_KEYS.video, video?.id], res);
	};

	const handleBack = () => {
		nav(location.state?.from || VIDEO_ROUTES.MY_VIDEOS.path);
	};

	const tagsArray = useMemo(() => {
		return tags?.data?.map((tag) => tag.tag);
	}, [tags.data]);

	return {
		models: {
			user,
			recordContext,
			pageTitle: location.state?.title || 'My videos',
			deleteVideoModal,
			accessSettingsModal,
			videoUrl,
			video,
			videoError,
			tags: tagsArray,
			isLinkCopied,
			isVideoDataLoading,
			isEditable: user?.id === video?.user.id,
		},
		commands: {
			handleCopyLink,
			handleDownload,
			handleDeleteVideo,
			handleUpdateVideo,
			handleBack,
			handleChangeVideoSettings,
		},
	};
}
