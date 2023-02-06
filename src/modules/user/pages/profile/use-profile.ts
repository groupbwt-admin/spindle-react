import { useState } from 'react';
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
		isInitialLoading: isInitialLoading,
		isRefetching: isRefetchingVideos,
		isSearching: isSearching,
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
	const [selectedVideos, setSelectedVideos] = useState<IVideo[]>([]);

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

	const searchHandler = (e) => {
		setMeta((prevVal) => {
			return { ...prevVal, search: e.target.value };
		});
	};

	const clearSearchHandler = () => {
		setMeta((prevVal) => {
			return { ...prevVal, search: '' };
		});
	};

	const checkVideoHandler = (video: { video: IVideo; checked: boolean }) => {
		setSelectedVideos((prevVal) => {
			if (video.checked) {
				return [...prevVal, video.video];
			} else {
				return prevVal.filter((item) => item.id !== video.video.id);
			}
		});
	};

	const cancelSelectionHandler = () => {
		setSelectedVideos(prevVal => [])
	}

	return {
		models: {
			modal,
			meta: videosData?.meta,
			videos: videosData?.data ?? [],
			isVideoLoading: isRefetchingVideos,
			isInitialLoading,
			isSearching,
			searchQuery: meta.search,
			user,
			selectedVideos,
			isSelectMode: !!selectedVideos.length,
			isListEmpty: videosData?.meta?.itemCount === 0
		},
		commands: {
			handleOpen,
			loadNextPage,
			searchHandler,
			clearSearchHandler,
			checkVideoHandler,
			cancelSelectionHandler
		},
	};
}
