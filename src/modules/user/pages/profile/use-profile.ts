import { useEffect, useMemo, useState } from 'react';
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
import { useQuery } from 'react-query';
import { VIDEO_QUERY_KEYS } from 'shared/constants/query-keys';
import { RequestSortType } from 'shared/constants/request-sort-type';
import { SortOption } from 'shared/components/sort-dropdown/sort-dropdown';

const SORT_OPTIONS: SortOption[] = [
	{
		value: 'created_at',
		label: 'Creation date',
	},
	{
		value: 'title',
		label: 'Name',
	},
];

export interface IFilterOptions {
	criteriaTags?: string[];
	dateFrom?: string | null;
	dateTo?: string | null;
	order: RequestSortType.ASC | RequestSortType.DESC;
	sortField: 'created_at' | 'title';
}

export function useProfile() {
	const { modal, handleOpen } = useEditProfileUser();
	const [meta, setMeta] = useState<VideoListResponseDto['meta']>({
		page: 1,
		hasPreviousPage: false,
		hasNextPage: false,
		itemCount: 1,
		pageCount: 1,
		take: 12,
		search: '',
	});
	const [filterOptions, setFilterOptions] = useState<IFilterOptions>({
		criteriaTags: [],
		dateFrom: null,
		dateTo: null,
		order: RequestSortType.ASC,
		sortField: 'created_at',
	});
	const user = selectUserData();

	const {
		data: videosData,
		refetchData: refetchVideos,
		searchData: searchVideos,
		fetchData: fetchVideos,
		updateState,
		isInitialLoading,
		isRefetching: isRefetchingVideos,
		isSearching,
	} = useFilterRequest<
		VideoListResponseDto,
		VideoListParamsDto,
		VideoListParamsDto
	>({
		manualTriggering: true,
		request: (params) => {
			return VideoApi.getVideosByUserId(getFindVideosParams(params));
		},
		searchRequest: (params) => {
			return VideoApi.getVideosByUserId(getFindVideosParams(params));
		},
	});
	const [selectedVideos, setSelectedVideos] = useState<
		Record<IVideo['id'], IVideo>
	>({});

	useEffect(() => {
		fetchVideos().then((data) => {
			updateState((prevState) => {
				return {
					data: prevState?.data.concat(data.data) ?? data.data,
					meta: data.meta,
				};
			});
		});
	}, []);

	useEffectAfterMount(() => {
		refetchVideos().then((data) => {
			updateState(() => {
				return {
					data: data.data,
					meta: data.meta,
				};
			});
		});
	}, [filterOptions]);

	useEffectAfterMount(() => {
		searchVideos(() => ({ search: meta.search, page: 1 }));
	}, [meta.search]);

	const tags = useQuery({
		queryKey: [VIDEO_QUERY_KEYS.tags],
		queryFn: () => VideoApi.getVideoTags(),
	});

	const getFindVideosParams = (params) => {
		return {
			userId: user?.id,
			take: meta.take,
			page: meta.page,
			search: meta.search,
			...filterOptions,
			...params,
		};
	};

	const loadNextPage = () => {
		const newPage = meta.page + 1;

		setMeta((prevVal) => {
			return { ...prevVal, page: newPage };
		});

		setTimeout(
			() =>
				refetchVideos({ page: newPage }).then((data) => {
					updateState((prevState) => {
						return {
							data: prevState?.data.concat(data.data) ?? data.data,
							meta: data.meta,
						};
					});
				}),
			0,
		);
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
			const updatedList = { ...prevVal } || {};
			if (video.checked) {
				updatedList[video.video.id] = video.video;
			} else {
				delete updatedList[video.video.id];
			}
			return updatedList;
		});
	};

	const handleCancelSelection = () => {
		setSelectedVideos({});
	};

	const selectedVideosCount = useMemo(
		() => Object.keys(selectedVideos).length,
		[selectedVideos],
	);

	const handleChangeFilterOption = (item, optionName) => {
		setFilterOptions((prevVal) => {
			const updatedFilters = { ...prevVal };
			if (Array.isArray(updatedFilters[optionName])) {
				updatedFilters[optionName].push(item);
			} else if (updatedFilters[optionName]) {
				updatedFilters[optionName] = item;
			}
			return updatedFilters;
		});
	};

	const handleChangeSortField = (sortFieldType) => {
		setMeta((prevState) => ({ ...prevState, page: 1 }));
		setFilterOptions((prevVal) => {
			if (prevVal.sortField === sortFieldType) {
				const newOrder =
					prevVal.order === RequestSortType.ASC
						? RequestSortType.DESC
						: RequestSortType.ASC;
				return { ...prevVal, order: newOrder };
			}
			return {
				...prevVal,
				sortField: sortFieldType,
				order: RequestSortType.ASC,
			};
		});
	};

	return {
		models: {
			modal,
			user,
			videos: videosData?.data ?? [],
			meta: videosData?.meta,
			tags: tags.data,
			filterOptions,
			searchQuery: meta.search,
			selectedVideosCount,
			selectedVideos,
			isInitialLoading,
			isSearching,
			isVideoLoading: isRefetchingVideos,
			isSelectMode: !!selectedVideosCount,
			isListEmpty: videosData?.meta?.itemCount === 0,
			SORT_OPTIONS,
		},
		commands: {
			handleOpen,
			loadNextPage,
			handleSearch,
			handleClearSearch,
			handleCheckVideo,
			handleCancelSelection,
			handleChangeFilterOption,
			handleChangeSortField,
		},
	};
}
