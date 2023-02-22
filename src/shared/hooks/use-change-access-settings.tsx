import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { IVideo } from 'shared/types/video';

import { VideoApi } from 'app/api/video-api/video-api';

import { VIDEO_QUERY_KEYS } from 'shared/constants/query-keys';
import { useCopyLink } from 'shared/hooks/use-copy-link';

import { Modal } from 'shared/components/modal';
import { AccessSettingsModal } from 'shared/components/video/modals/access-settings-modal';

export enum VideoPermissionsEnum {
	ONLY_ME = 'ONLY ME',
	AUTHENTICATE_USER = 'AUTHENTICATE USER',
	ANYONE_WITH_LINK = 'ANYONE WITH LINK',
}

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

export function useChangeAccessSettings({ onSettingsChanged }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [videoId, setVideoId] = useState(null);
	const client = useQueryClient();

	const { data: video, isLoading } = useQuery({
		queryKey: [VIDEO_QUERY_KEYS.video, videoId],
		queryFn: () =>
			VideoApi.getVideoInfoById({ id: videoId as unknown as IVideo['id'] }),
		enabled: !!videoId,
	});

	const { isLinkCopied, handleCopyLink } = useCopyLink(video);

	const changePermissionsMutation = useMutation(async (viewAccess) => {
		const res = await VideoApi.changeVideoPermissions({
			id: video?.id,
			viewAccess,
		});
		await onSettingsChanged();
		return res;
	});

	const changeCommentsPermissionMutation = useMutation(async (isComments) => {
		const res = await VideoApi.updateVideoById({
			id: video?.id,
			payload: { isComments: isComments },
		});
		await onSettingsChanged();
		return res;
	});

	const handleClose = () => setIsModalOpen(false);

	const startChangeSettings = async (id) => {
		setVideoId(id);
		setIsModalOpen(true);
	};

	const handleChangePermissions = async (viewAccess) => {
		const res = await changePermissionsMutation.mutateAsync(viewAccess);
		client.setQueryData(
			[VIDEO_QUERY_KEYS.video, videoId],
			(prevValue: IVideo | undefined) => res,
		);
		return;
	};

	const handleChangeCommentsPermission = async (isComments) => {
		const res = await changeCommentsPermissionMutation.mutateAsync(isComments);
		client.setQueryData(
			[VIDEO_QUERY_KEYS.video, videoId],
			(prevValue: IVideo | undefined) => res,
		);
		return;
	};

	const modal = (
		<Modal.Root
			open={isModalOpen}
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

	return { modal, startChangeSettings };
}
