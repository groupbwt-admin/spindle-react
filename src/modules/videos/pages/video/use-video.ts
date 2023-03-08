import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecordContext } from 'modules/videos/hooks/use-record-context';
import queryString from 'query-string';
import { useModalManager } from 'shared/context/modal-manager';

import { VideoApi } from 'app/api/video-api/video-api';

import { selectUserData } from 'app/store/user/selects';

import { USER_ROUTES, VIDEO_ROUTES } from 'shared/config/routes';
import { VIDEO_MODALS_NAMES } from 'shared/constants/modal-names';
import { VIDEO_QUERY_KEYS } from 'shared/constants/query-keys';
import { useChangeAccessSettings } from 'shared/hooks/use-change-access-settings';
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
		queryFn: () => VideoApi.getVideoUrl({ id: urlParams.id! }),
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
			handleDeleteVideoSuccess,
		},
	};
}
