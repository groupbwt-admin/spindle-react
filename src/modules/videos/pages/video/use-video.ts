import { useCallback, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecordContext } from 'modules/videos/hooks/use-record-context';
import queryString from 'query-string';
import { useModalManager } from 'shared/context/modal-manager';

import { VideoApi } from 'app/api/video-api/video-api';

import { selectUserData } from 'app/store/user/selects';

import { USER_ROUTES, VIDEO_ROUTES } from 'shared/config/routes';
import { MIME_TYPES } from 'shared/constants/media';
import { VIDEO_MODALS_NAMES } from 'shared/constants/modal-names';
import { VIDEO_QUERY_KEYS } from 'shared/constants/query-keys';
import { useCopyLink } from 'shared/hooks/use-copy-link';

export function useVideo() {
	const urlParams = useParams<{ id: string }>();
	const client = useQueryClient();
	const nav = useNavigate();
	const location = useLocation();
	const user = selectUserData();
	const modalManager = useModalManager();
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
		queryFn: async () => {
			const videoUrl = await VideoApi.getVideoUrl({ id: urlParams.id! });
			const data = await VideoApi.getVideoStreamManifest(videoUrl?.url);
			if (!data.size) {
				const baseVideo = await VideoApi.getVideoUrl({
					id: urlParams.id!,
					type: 'base',
				});

				return baseVideo;
			}
			return data;
		},
		select: useCallback((data) => {
			if (data instanceof Blob) {
				return {
					url: URL.createObjectURL(data),
					mimeType: MIME_TYPES.HLS,
				};
			}

			return {
				url: data.url,
				mimeType: MIME_TYPES.WEBM,
			};
		}, []),
		enabled: !!video,
	});

	const tags = useQuery({
		queryKey: [VIDEO_QUERY_KEYS.tags],
		queryFn: () => VideoApi.getVideoTags({ userId: user?.id }),
		enabled: !!user,
	});

	const { isLinkCopied, handleCopyLink } = useCopyLink(video);

	const downloadVideoMutation = useMutation(VideoApi.downloadVideoById);

	const updateVideoMutation = useMutation(VideoApi.updateVideoById);

	const handleDeleteVideoSuccess = async () => {
		nav(location.state?.from || VIDEO_ROUTES.MY_VIDEOS);
	};

	const handleDownload = (e) => {
		e.stopPropagation();
		downloadVideoMutation.mutate({ id: video?.id, title: video?.title });
	};

	const handleDeleteVideo = () => {
		modalManager.open(VIDEO_MODALS_NAMES.delete_video, [video]);
	};

	const handleChangeVideoSettings = () => {
		modalManager.open(VIDEO_MODALS_NAMES.access_setting_video, video?.id);
	};

	const handleUpdateVideo = async (payload) => {
		const res = await updateVideoMutation.mutateAsync({
			id: video?.id,
			payload,
		});

		client.setQueryData([VIDEO_QUERY_KEYS.video, video?.id], res);
	};

	const userId = useMemo(() => queryString.parse(location.search).user, []);

	const pageTitle = useMemo(
		() => location.state?.title || (userId ? 'Back to user' : 'My videos'),
		[],
	);

	const handleBack = () => {
		if (userId) {
			return nav(USER_ROUTES.USER.generate(userId as string));
		}
		nav(location.state?.from || VIDEO_ROUTES.MY_VIDEOS.path);
	};

	const tagsArray = useMemo(() => {
		return tags?.data?.map((tag) => tag.tag);
	}, [tags.data]);

	return {
		models: {
			user,
			recordContext,
			pageTitle,
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
			handleDeleteVideoSuccess,
		},
	};
}
