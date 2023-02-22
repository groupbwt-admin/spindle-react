import { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Dayjs } from 'dayjs';
import { useEditProfileUser } from 'modules/user/hooks/use-edit-profile-user';
import queryString from 'query-string';

import { IVideo } from 'shared/types/video';

import {
	VideoApi,
	VideoListParamsDto,
	VideoListResponseDto,
} from 'app/api/video-api/video-api';

import { selectUserData } from 'app/store/user/selects';

import { VIDEO_ROUTES } from 'shared/config/routes';
import { VIDEO_QUERY_KEYS } from 'shared/constants/query-keys';
import { RequestSortType } from 'shared/constants/request-sort-type';
import { useChangeAccessSettings } from 'shared/hooks/use-change-access-settings';
import { useDeleteVideo } from 'shared/hooks/use-delete-video';
import { useEffectAfterMount } from 'shared/hooks/use-effect-after-mount';
import { useFilterRequest } from 'shared/hooks/use-filter-request';

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
	dateFrom: Dayjs | null;
	dateTo: Dayjs | null;
	order: RequestSortType.ASC | RequestSortType.DESC;
	sortField: 'created_at' | 'title';
}

export function useProfile() {
	const { modal, handleOpen } = useEditProfileUser();

	const onSettingsChanged = () => {};

	const { modal: accessSettingsModal, startChangeSettings } =
		useChangeAccessSettings({ onSettingsChanged });
	const location = useLocation();
	const [meta, setMeta] = useState<VideoListResponseDto['meta']>(() => {
		const params = queryString.parse(location.search);
		const { page, search, ...rest } = params;
		return {
			page: page ? +page : 1,
			hasPreviousPage: false,
			hasNextPage: false,
			itemCount: 1,
			pageCount: 1,
			take: 30,
			search: (search as string) || '',
		};
	});
	const [filterOptions, setFilterOptions] = useState<IFilterOptions>(() => {
		const params = queryString.parse(location.search);
		const { page, search, ...rest } = params;
		return {
			criteriaTags: [],
			dateFrom: null,
			dateTo: null,
			order: RequestSortType.DESC,
			sortField: 'created_at',
			...rest,
		};
	});
	const [searchParams, setSearchParams] = useSearchParams();
	const [isLinksCopied, setIsLinksCopied] = useState(false);
	const copyLinkTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
	const user = selectUserData();

	useEffect(() => {
		return () => {
			clearTimeout(copyLinkTimeoutRef.current);
		};
	}, []);

	const onVideosDeleted = async () => {
		setMeta((prevState) => ({ ...prevState, page: 1 }));
		refetchVideos({ page: 1 }).then((data) => {
			updateState(() => {
				return {
					data: data.data,
					meta: data.meta,
				};
			});
		});
		handleCancelSelection();
	};

	const { modal: deleteVideoModal, startDeleteVideos } = useDeleteVideo({
		onVideosDeleted,
	});

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
			setSearchParams((prev) =>
				queryString.stringify(
					{
						...prev,
						search: meta.search,
						page: meta.page,
						...filterOptions,
					},
					{ skipNull: true, skipEmptyString: true },
				),
			);
		});
	}, [filterOptions]);

	useEffectAfterMount(() => {
		searchVideos(
			() => ({ search: meta.search, page: 1 }),
			() =>
				setSearchParams((prev) => {
					return queryString.stringify(
						{
							...filterOptions,
							search: meta.search,
							page: 1,
						},
						{ skipNull: true, skipEmptyString: true },
					);
				}),
		);
	}, [meta.search]);

	const tags = useQuery({
		queryKey: [VIDEO_QUERY_KEYS.tags],
		queryFn: () => VideoApi.getVideoTags({ userId: user?.id }),
		enabled: !!user,
	});

	const getFindVideosParams = (params) => {
		return {
			userId: user?.id,
			take: meta.take,
			page: meta.page,
			search: meta.search,
			...filterOptions,
			dateFrom:
				filterOptions.dateFrom && filterOptions.dateFrom.format('YYYY-MM-DD'),
			dateTo: filterOptions.dateTo && filterOptions.dateTo.format('YYYY-MM-DD'),
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
					setSearchParams((prev) =>
						queryString.stringify(
							{
								...prev,
								...filterOptions,
								page: newPage,
							},
							{ skipNull: true, skipEmptyString: true },
						),
					);
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

	const selectedVideosArray = useMemo(
		() => Object.values(selectedVideos),
		[selectedVideos],
	);

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

	const handleApplyFilters = (filterOptions) => {
		setMeta((prevState) => ({ ...prevState, page: 1 }));
		setFilterOptions(filterOptions);
	};

	const handleDeleteVideo = (video: IVideo) => {
		startDeleteVideos([video]);
	};

	const handleChangeVideoSettings = (video: IVideo) => {
		startChangeSettings(video.id);
	};

	const handleDeleteSelectedVideos = () => {
		startDeleteVideos(selectedVideosArray);
	};

	const handleCopySelectedLinks = async () => {
		if (!navigator.clipboard || isLinksCopied) return;

		const linksToCopy = selectedVideosArray.reduce((acc, cur) => {
			return acc + `${VIDEO_ROUTES.VIDEO.generateExternalPath(cur.id)}\n`;
		}, '');
		await navigator.clipboard.writeText(linksToCopy);
		setIsLinksCopied(true);
		copyLinkTimeoutRef.current = setTimeout(() => {
			setIsLinksCopied(false);
		}, 1500);
	};

	return {
		models: {
			modal,
			deleteVideoModal,
			accessSettingsModal,
			user,
			videos: videosData?.data ?? [],
			meta: videosData?.meta,
			tags: tags.data,
			filterOptions,
			searchQuery: meta.search,
			selectedVideosId: selectedVideosArray,
			selectedVideos,
			isInitialLoading,
			isSearching,
			isVideoLoading: isRefetchingVideos,
			isSelectMode: !!selectedVideosArray.length,
			isListEmpty: videosData?.meta?.itemCount === 0,
			isLinksCopied,
			SORT_OPTIONS,
		},
		commands: {
			handleOpen,
			loadNextPage,
			handleSearch,
			handleClearSearch,
			handleCheckVideo,
			handleCancelSelection,
			handleChangeSortField,
			handleApplyFilters,
			handleDeleteVideo,
			handleChangeVideoSettings,
			handleDeleteSelectedVideos,
			handleCopySelectedLinks,
		},
	};
}
