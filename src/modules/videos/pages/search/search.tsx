import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled/macro';
import { useSearch } from 'modules/videos/pages/search/use-search';

import { Chip, Stack } from '@mui/material';

import { USER_ROUTES } from 'shared/config/routes';
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
	const { models, commands } = useSearch();

	return (
		<SearchPageContainer>
			<SearchInputExtended
				isLoading={models.isSearching}
				inputValue={models.query}
				selectedTags={models.tags.map((tag) => tag.tag)}
				onInputChange={commands.handleSearchInputChange}
				onClear={commands.handleClear}
				onDeleteTag={commands.handleDeleteTag}
			/>
			<SearchContentContainer>
				<SpinnerOverlay open={models.isSearching || models.isInitialLoading} />
				{models.hasResults.total() ? (
					<SearchResultsContainer>
						<StyledTypography variant="h4">Search results</StyledTypography>
						{models.hasResults.tags && (
							<TagsContainer>
								<Typography variant="h4">Tags</Typography>
								<Stack direction="row" gap={1} marginTop={3} flexWrap="wrap">
									{models.searchResults?.tags.map((tag) => (
										<StyledChip
											key={tag.tag}
											{...props}
											label={tag.tag}
											onClick={() => commands.handleSearchByTag(tag)}
										/>
									))}
								</Stack>
							</TagsContainer>
						)}
						{models.hasResults.users && (
							<ProfilesContainer>
								<Typography variant="h4">Profiles</Typography>
								<Stack gap={2} marginTop={3}>
									{models.searchResults?.users.map((user) => (
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
						{models.hasResults.videos && (
							<VideosContainer>
								<Typography variant="h4">Videos</Typography>
								<VideoListContainer>
									{models.videos?.map((video) => (
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
					(!models.isSearching || !models.isInitialLoading) && (
						<NoResultsList
							text={`No results for ${
								models.query || `#${models.tags[0]?.tag}`
							}. Try something else`}
						/>
					)
				)}
			</SearchContentContainer>
		</SearchPageContainer>
	);
};
