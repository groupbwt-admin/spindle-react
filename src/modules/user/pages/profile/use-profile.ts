import { useMemo, useState } from 'react';
import { useEditProfileUser } from 'modules/user/hooks/use-edit-profile-user';
import { useFilterRequest } from 'shared/hooks/use-filter-request';
import { useEffectAfterMount } from 'shared/hooks/use-effect-after-mount';
import { IVideo } from 'shared/types/video';
import {
	VideoApi,
	VideoListParamsDto,
	VideoListResponseDto,
} from 'app/api/video-api/video-api';
import { selectUserData } from 'app/store/user/selects';

export function useProfile() {
	const { modal, handleOpen } = useEditProfileUser();
	const [meta, setMeta] = useState<VideoListResponseDto['meta']>({
		page: 1,
		hasPreviousPage: false,
		hasNextPage: false,
		itemCount: 1,
		pageCount: 1,
		take: 30,
		search: '',
	});
	const user = selectUserData();

	const {
		data: videosData,
		refetchData: refetchVideos,
		searchData: searchVideos,
		isInitialLoading,
		isRefetching: isRefetchingVideos,
		isSearching,
	} = useFilterRequest<
		VideoListResponseDto,
		VideoListParamsDto,
		VideoListParamsDto
	>({
		onUpdateState: (prevState, result) => {
			return {
				data: prevState?.data.concat(result.data) ?? result.data,
				meta: result.meta,
			};
		},
		request: (params) => {
			return VideoApi.getVideosByUserId(getFindVideosParams(params));
		},
		searchRequest: (params) => {
			return VideoApi.getVideosByUserId(getFindVideosParams(params));
		},
	});
	const [selectedVideos, setSelectedVideos] = useState<object | null>(null);

	useEffectAfterMount(() => {
		refetchVideos();
	}, [meta.page]);

	useEffectAfterMount(() => {
		searchVideos(() => ({ search: meta.search, page: 1 }));
	}, [meta.search]);

	const getFindVideosParams = (params) => {
		return {
			userId: user?.id,
			take: meta.take,
			page: meta.page,
			search: meta.search,
			...params,
		};
	};

	const loadNextPage = () => {
		setMeta((prevVal) => {
			return { ...prevVal, page: prevVal.page + 1 };
		});
	};

	const handleSearch = (e) => {
		setMeta((prevVal) => {
			return { ...prevVal, search: e.target.value, page: 1 };
		});
	};

	const handleClearSearch = () => {
		setMeta((prevVal) => {
			return { ...prevVal, search: '', page: 1 };
		});
	};

	const handleCheckVideo = (video: { video: IVideo; checked: boolean }) => {
		setSelectedVideos((prevVal) => {
			const updatedList = prevVal || {};
			if (video.checked) {
				updatedList[video.video.id] = video.video;
			} else {
				delete updatedList[video.video.id];
			}
			return updatedList;
		});
	};

	const handleCancelSelection = () => {
		setSelectedVideos([]);
	};

	const selectedCount = useMemo(
		() => (selectedVideos ? Object.keys(selectedVideos).length : 0),
		[selectedVideos],
	);

	return {
		models: {
			modal,
			user,
			videos: videosData?.data ?? [],
			meta: videosData?.meta,
			searchQuery: meta.search,
			selectedCount,
			selectedVideos,
			isInitialLoading,
			isSearching,
			isVideoLoading: isRefetchingVideos,
			isSelectMode: !!selectedVideos,
			isListEmpty: videosData?.meta?.itemCount === 0,
		},
		commands: {
			handleOpen,
			loadNextPage,
			handleSearch,
			handleClearSearch,
			handleCheckVideo,
			handleCancelSelection,
		},
	};
}
