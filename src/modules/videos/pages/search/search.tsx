import React, { useMemo, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled/macro';
import queryString from 'query-string';

import { Chip, Stack } from '@mui/material';

import { ITag } from 'shared/types/video';

import {
	SearchParamsDto,
	SearchResponseDto,
	VideoApi,
} from 'app/api/video-api/video-api';

import { USER_ROUTES } from 'shared/config/routes';
import { useEffectAfterMount } from 'shared/hooks/use-effect-after-mount';
import { useFilterRequest } from 'shared/hooks/use-filter-request';
import { getUserAvatarURL } from 'shared/utils/get-file-url';

import { Avatar } from 'shared/components/avatar/avatar';
import { NoResultsList } from 'shared/components/no-results-list/no-results-list';
import { SearchInputExtended } from 'shared/components/search-input/search-input-extended';
import { SpinnerOverlay } from 'shared/components/spinner-overlay/spinner-overlay';
import { Typography } from 'shared/components/typography/typography';
import { VideoCard } from 'shared/components/video-card/video-card';

const SearchPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

const SearchResultsContainer = styled.div`
	padding-top: 32px;
	display: flex;
	flex-direction: column;
	row-gap: 32px;
`;

const SearchContentContainer = styled.div`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	position: relative;

	.MuiBackdrop-root {
		z-index: 5;
		opacity: 0.6 !important;
		background-color: ${({ theme }) => theme.palette.background.default};
		color: ${({ theme }) => theme.palette.primary.main};
		position: absolute;
	}
`;

const StyledTypography = styled(Typography)`
	font-weight: 700;
`;

const StyledChip = styled(Chip)`
	padding: 4px 8px;
	color: ${({ theme }) => theme.palette.common.white};
	background-color: ${({ theme }) => theme.palette.primary.main};
	border-radius: 6px;
	font-weight: 700;
	font-size: 14px;
	line-height: 23px;
	margin: 0 !important;
`;

const StyledAvatar = styled(Avatar)`
	width: 42px;
	height: 42px;
	margin-right: 16px;
`;

const StyledCaption = styled(Typography)`
	color: ${({ theme }) => theme.palette.text.secondary};
`;

const StyledLink = styled(Link)`
	display: flex;
	color: ${({ theme }) => theme.palette.text.primary};
	cursor: pointer;
`;

const TagsContainer = styled.div``;

const ProfilesContainer = styled.div``;

const VideosContainer = styled.div``;

const VideoListContainer = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(5, minmax(0px, 1fr));
	grid-auto-columns: 306px;
	grid-column-gap: 24px;
	grid-row-gap: 24px;
	margin-top: 24px;
	overflow: unset !important;

	@media screen and (max-width: ${({ theme }) =>
			theme.breakpoints.values.xl}px) {
		grid-template-columns: repeat(4, minmax(0px, 1fr));
	}

	@media screen and (max-width: ${({ theme }) =>
			theme.breakpoints.values.lg}px) {
		grid-template-columns: repeat(3, minmax(0px, 1fr));
	}

	@media screen and (max-width: ${({ theme }) =>
			theme.breakpoints.values.md}px) {
		grid-template-columns: repeat(2, minmax(0px, 1fr));
	}

	@media screen and (max-width: ${({ theme }) =>
			theme.breakpoints.values.sm}px) {
		grid-template-columns: repeat(1, minmax(0px, 1fr));
	}
`;

export const SearchPage = (props) => {
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
	});

	useEffectAfterMount(() => {
		if (searchByTag) return;
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

	return (
		<SearchPageContainer>
			<SearchInputExtended
				isLoading={isSearching}
				inputValue={query}
				selectedTags={tags.map((tag) => tag.tag)}
				onInputChange={handleSearchInputChange}
				onClear={handleClear}
				onDeleteTag={handleDeleteTag}
			/>
			<SearchContentContainer>
				<SpinnerOverlay open={isSearching || isInitialLoading} />
				{hasResults.total() ? (
					<SearchResultsContainer>
						<StyledTypography variant="h4">Search results</StyledTypography>
						{hasResults.tags && (
							<TagsContainer>
								<Typography variant="h4">Tags</Typography>
								<Stack direction="row" gap={1} marginTop={3} flexWrap="wrap">
									{searchResults?.tags.map((tag) => (
										<StyledChip
											key={tag.tag}
											{...props}
											label={tag.tag}
											onClick={() => handleSearchByTag(tag)}
										/>
									))}
								</Stack>
							</TagsContainer>
						)}
						{hasResults.users && (
							<ProfilesContainer>
								<Typography variant="h4">Profiles</Typography>
								<Stack gap={2} marginTop={3}>
									{searchResults?.users.map((user) => (
										<StyledLink
											to={USER_ROUTES.USER.generate(user.id as string)}
											key={user.id}
										>
											<StyledAvatar
												src={
													user.avatar
														? getUserAvatarURL(user.avatar)
														: undefined
												}
											/>
											<div>
												<Typography variant="body1">
													{`${user.firstName} ${user.lastName}`}
												</Typography>
												<StyledCaption variant="subtitle2">
													{user.countVideo} videos
												</StyledCaption>
											</div>
										</StyledLink>
									))}
								</Stack>
							</ProfilesContainer>
						)}
						{hasResults.videos && (
							<VideosContainer>
								<Typography variant="h4">Videos</Typography>
								<VideoListContainer>
									{videos?.map((video) => (
										<VideoCard
											key={video.id}
											video={video}
											checked={false}
											isSelectMode={false}
											onChecked={() => {}}
											activeActions={{
												copy: true,
												download: true,
											}}
										/>
									))}
								</VideoListContainer>
							</VideosContainer>
						)}
					</SearchResultsContainer>
				) : (
					(!isSearching || !isInitialLoading) && (
						<NoResultsList
							text={`No results for ${
								query || `#${tags[0]?.tag}`
							}. Try something else`}
						/>
					)
				)}
			</SearchContentContainer>
		</SearchPageContainer>
	);
};
