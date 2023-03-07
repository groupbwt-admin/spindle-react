import { useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import queryString from 'query-string';

import { ITag } from 'shared/types/video';

import {
	SearchParamsDto,
	SearchResponseDto,
	VideoApi,
} from 'app/api/video-api/video-api';

import { useEffectAfterMount } from 'shared/hooks/use-effect-after-mount';
import { useFilterRequest } from 'shared/hooks/use-filter-request';

export function useSearch() {
	const location = useLocation();
	const params: { search?: string; criteriaTags?: string } = queryString.parse(
		location.search,
	);
	const [, setSearchParams] = useSearchParams();
	const [tags, setTags] = useState<ITag[]>(() => {
		if (!params?.criteriaTags) return [];
		const [id, tagName] = params.criteriaTags.split('_');
		return [{ id: id, tag: tagName }];
	});
	const [searchByTag, setSearchByTag] = useState(!!tags.length);
	const [query, setQuery] = useState(params.search || '');
	const [meta] = useState({
		tags: { page: 1, take: 50 },
		users: { page: 1, take: 50 },
		videos: { page: 1, take: 50 },
	});

	const {
		data: searchResults,
		searchData,
		fetchData,
		updateState,
		isInitialLoading,
		isSearching,
	} = useFilterRequest<SearchResponseDto, SearchParamsDto, SearchParamsDto>({
		request: (params) => {
			if (searchByTag)
				return VideoApi.getVideos({
					search: query,
					criteriaTags: tags.map((tag) => tag.id),
					...params,
				});
			return VideoApi.search({ search: query, ...params });
		},
		searchRequest: ({ searchByTag, ...params }) => {
			if (searchByTag) return VideoApi.getVideos(params);
			return VideoApi.search({ ...params, meta });
		},
		manualTriggering: true,
	});

	useEffect(() => {
		if (!query && !tags.length) return;
		fetchData().then((res) => {
			updateState(res);
		});
	}, []);

	useEffectAfterMount(() => {
		if (searchByTag) return;
		if (!query.trim()) {
			updateState(undefined);
			return;
		}
		searchData(
			() => ({ search: query }),
			() => {
				setSearchParams(() => {
					return queryString.stringify(
						{
							search: query,
						},
						{ skipNull: true, skipEmptyString: true },
					);
				});
			},
		);
	}, [query]);

	const handleSearchInputChange = (value) => {
		setQuery(value);
		searchData(
			() => ({
				searchByTag: true,
				criteriaTags: tags.map((tag) => tag.id),
				search: value,
			}),
			() => {
				setSearchParams(() => {
					return queryString.stringify(
						{
							criteriaTags: tags.map((tag) => `${tag.id}_${tag.tag}`),
							search: value,
						},
						{ skipNull: true, skipEmptyString: true },
					);
				});
			},
		);
	};

	const handleSearchByTag = (tag) => {
		setSearchByTag(true);
		setTags(() => [tag]);
		searchData(
			() => ({ searchByTag: true, criteriaTags: [tag.id] }),
			() => {
				setSearchParams(() => {
					return queryString.stringify(
						{
							criteriaTags: [`${tag.id}_${tag.tag}`],
						},
						{ skipNull: true, skipEmptyString: true },
					);
				});
			},
		);
		setQuery('');
	};

	const handleDeleteTag = () => {
		setTags([]);
		setSearchByTag(false);
		if (!query) {
			updateState(undefined);
			return setSearchParams({});
		}

		searchData(
			() => ({ search: query }),
			() => {
				setSearchParams(() => {
					return queryString.stringify(
						{
							search: query,
						},
						{ skipNull: true, skipEmptyString: true },
					);
				});
			},
		);
	};

	const handleClear = () => {
		setSearchByTag(false);
		setTags([]);
		setQuery('');
		updateState(undefined);
		setSearchParams({});
	};

	const hasResults = useMemo((): {
		tags: boolean;
		users: boolean;
		videos: boolean;
		total: () => boolean;
	} => {
		return searchByTag
			? {
					videos: !!searchResults?.data?.length,
					tags: false,
					users: false,
					total() {
						return !!searchResults?.data?.length;
					},
			  }
			: {
					tags: !!searchResults?.tags?.length,
					users: !!searchResults?.users?.length,
					videos: !!searchResults?.videos?.length,
					total() {
						return this.users || this.tags || this.videos;
					},
			  };
	}, [searchResults]);

	const videos = useMemo(
		() => (searchByTag ? searchResults?.data : searchResults?.videos),
		[searchResults, searchByTag],
	);

	return {
		models: {
			isSearching,
			isInitialLoading,
			query,
			tags,
			hasResults,
			searchResults,
			videos,
		},
		commands: {
			handleSearchInputChange,
			handleClear,
			handleDeleteTag,
			handleSearchByTag,
		},
	};
}
