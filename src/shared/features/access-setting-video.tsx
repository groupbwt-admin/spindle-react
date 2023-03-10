import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { VideoApi } from '../../app/api/video-api/video-api';
import { Modal } from '../components/modal';
import { AccessSettingsModal } from '../components/video/modals/access-settings-modal';
import {
	VIDEO_MODALS_NAMES,
	VideoPermissionsEnum,
} from '../constants/modal-names';
import { VIDEO_QUERY_KEYS } from '../constants/query-keys';
import { useStateModalManager } from '../context/modal-manager';
import { useCopyLink } from '../hooks/use-copy-link';
import { IVideo } from '../types/video';

const VIDEO_PERMISSIONS_OPTIONS = [
	{ title: 'Only you can view', value: VideoPermissionsEnum.ONLY_ME },
	{
		title: 'All authenticated users can view',
		value: VideoPermissionsEnum.AUTHENTICATE_USER,
	},
	{
		title: 'Anyone with the link can view',
		value: VideoPermissionsEnum.ANYONE_WITH_LINK,
	},
];
export const AccessSettingVideo = () => {
	const [videoId, setVideoId] = useState(null);
	const client = useQueryClient();

	const modalState = useStateModalManager(
		VIDEO_MODALS_NAMES.access_setting_video,
		{
			onBeforeOpen: (videoId) => {
				setVideoId(videoId);
			},
		},
	);
	const { data: video, isLoading } = useQuery({
		queryKey: [VIDEO_QUERY_KEYS.video, videoId],
		queryFn: () =>
			VideoApi.getVideoInfoById({ id: videoId as unknown as IVideo['id'] }),
		enabled: !!videoId,
	});

	const { isLinkCopied, handleCopyLink } = useCopyLink(video);

	const changePermissionsMutation = useMutation(async (viewAccess) => {
		return await VideoApi.changeVideoPermissions({
			id: video?.id,
			viewAccess,
		});
	});

	const changeCommentsPermissionMutation = useMutation(async (isComments) => {
		return await VideoApi.updateVideoById({
			id: video?.id,
			payload: { isComments: isComments },
		});
	});

	const handleClose = () => modalState.close();

	const handleChangePermissions = async (viewAccess) => {
		const res = await changePermissionsMutation.mutateAsync(viewAccess);
		client.setQueryData([VIDEO_QUERY_KEYS.video, videoId], res);
		return;
	};

	const handleChangeCommentsPermission = async (isComments) => {
		const res = await changeCommentsPermissionMutation.mutateAsync(isComments);
		client.setQueryData([VIDEO_QUERY_KEYS.video, videoId], res);
		return;
	};
	return (
		<Modal.Root
			open={modalState.open}
			onClose={handleClose}
			isClosable={!changePermissionsMutation.isLoading}
		>
			<AccessSettingsModal
				accessOptions={VIDEO_PERMISSIONS_OPTIONS}
				video={video}
				isLinkCopied={isLinkCopied}
				isVideoDataLoading={isLoading}
				isPermissionsLoading={changePermissionsMutation.isLoading}
				isCommentsPermissionsLoading={
					changeCommentsPermissionMutation.isLoading
				}
				handleChangePermissions={handleChangePermissions}
				handleChangeCommentsPermission={handleChangeCommentsPermission}
				handleCopyLink={handleCopyLink}
			/>
		</Modal.Root>
	);
};
