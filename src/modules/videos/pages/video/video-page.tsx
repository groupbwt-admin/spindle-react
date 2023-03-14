import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from '@emotion/styled/macro';
import { format } from 'date-fns';
import { StartRecordButton } from 'modules/videos/components/start-record-button';
import { UnauthorisedCommentView } from 'modules/videos/features/comments/video-comments/components/unauthorised-comment-view';
import { VideoComments } from 'modules/videos/features/comments/video-comments/video-comments';
import { useVideo } from 'modules/videos/pages/video/use-video';
import { AccessSettingVideo } from 'shared/features/access-setting-video';
import { DeleteVideo } from 'shared/features/delete-video';
import { BoundaryError } from 'shared/models/custom-errors';

import { getUserAvatarURL } from 'shared/utils/get-file-url';

import { Avatar } from 'shared/components/avatar/avatar';
import { Button } from 'shared/components/button/button';
import { IconButton } from 'shared/components/button/icon-button';
import { EditInputField } from 'shared/components/edit-input-field/edit-input-field';
import { Icon } from 'shared/components/icon/icon';
import { ICON_COLLECTION } from 'shared/components/icon/icon-list';
import { TagsAutocomplete } from 'shared/components/tags-autocomplete/tags-autocomplete';
import { Typography } from 'shared/components/typography/typography';
import { UserInfoHoverMenu } from 'shared/components/user-info-hover-menu/user-info-hover-menu';
import { ActionMenu } from 'shared/components/video-card/action-menu';
import { VideoPageSkeleton } from 'shared/components/video-page-skeleton/video-page-skeleton';
import { VideoPlayer } from 'shared/components/video-player/video-player';

const VideoPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100%;
	margin: 0 auto 40px;
	position: relative;

	.MuiBackdrop-root {
		z-index: 5;
		opacity: 0.6 !important;
		background-color: ${({ theme }) => theme.palette.background.default};
		color: ${({ theme }) => theme.palette.primary.main};
		position: absolute;
	}
`;

const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
	padding-bottom: 60px;
`;

const DetailedInfoContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 16px;
	width: 100%;
	max-width: 890px;
	margin: 0 auto;
`;

const ActionsContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	column-gap: 12px;
	padding: 16px 0;

	.MuiButtonBase-root {
		background: ${({ theme }) => theme.palette.common.white};
		border: 1px solid ${({ theme }) => theme.palette.secondary.main};
		border-radius: 10px;
		padding: 16px 24px;
	}
`;

const Title = styled(Typography)`
	flex-shrink: 0;
`;

const ViewsCount = styled(Typography)`
	color: ${({ theme }) => theme.palette.text.secondary};
	margin-right: auto;
`;

const StyledVideo = styled(VideoPlayer)`
	width: 100%;
	height: 56.25vw;
	max-height: calc(100vh - 300px);
	min-height: 480px;
	border-radius: 10px;
	margin-bottom: 16px;
`;

const StyledIconButton = styled(IconButton)`
	background: ${({ theme }) => theme.palette.common.white};
	border: 1px solid ${({ theme }) => theme.palette.secondary.main};
	border-radius: 10px;
	padding: 15px 24px;
	margin-right: 12px;
`;

const StyledAvatar = styled(Avatar)`
	width: 42px;
	height: 42px;
	margin-right: 16px;
`;

const StyledCaption = styled(Typography)`
	color: ${({ theme }) => theme.palette.text.secondary};
`;

const StyledRecordButton = styled(StartRecordButton)`
	margin-left: auto;
`;

const StyledButtonIcon = styled(Icon)`
	width: 24px;
	height: 24px;
	margin-left: 4px;
`;

export const VideoPage: React.FC = () => {
	const { models, commands } = useVideo();

	return (
		<VideoPageContainer>
			<Helmet>
				<title>{models.video?.title}</title>
				<meta
					name="description"
					content="Use Spindle to record quick videos of your screen and cam. Explain anything clearly and easily – and skip the meeting. An essential tool for hybrid workplaces."
				/>
				<meta
					property="og:title"
					content="Spindle | Video Name"
					data-rh="true"
				/>
				<meta
					property="og:description"
					content="Use Spindle to record quick videos of your screen and cam. Explain anything clearly and easily – and skip the meeting. An essential tool for hybrid workplaces."
					data-rh="true"
				/>
				<meta
					property="og:image"
					content=" https://d2uolguxr56s4e.cloudfront.net/img/kartrapages/video_player_placeholder.gif"
					data-rh="true"
				/>
			</Helmet>

			{models.user && (
				<HeaderContainer>
					<StyledIconButton onClick={commands.handleBack}>
						<Icon icon={ICON_COLLECTION.arrow_left} />
					</StyledIconButton>
					<Title variant="h1">{models.pageTitle}</Title>
					<StyledRecordButton
						isRecording={models.recordContext.isRecording}
						onStartRecording={models.recordContext.startRecording}
						isConnected={models.recordContext.isConnected}
					/>
				</HeaderContainer>
			)}
			{models.isVideoDataLoading && <VideoPageSkeleton />}
			{models.videoError instanceof BoundaryError && models.videoError.message}
			{models.videoUrl && models.video && (
				<>
					<StyledVideo
						src={models.videoUrl.data}
						videoType={models.videoType}
					/>
					<EditInputField
						value={models.video.title}
						isEditable={models.isEditable}
						onSubmit={(value) => commands.handleUpdateVideo({ title: value })}
					/>
					<ActionsContainer>
						<ViewsCount variant="body1">
							{models.video.viewsCount === 1
								? `${models.video.viewsCount} view`
								: `${models.video.viewsCount} views`}
						</ViewsCount>
						<Button
							label={models.isLinkCopied ? 'Copied' : 'Copy link'}
							color="secondary"
							variant="outlined"
							endIcon={<StyledButtonIcon icon={ICON_COLLECTION.copy_link} />}
							onClick={commands.handleCopyLink}
						/>
						<Button
							label="Download"
							color="secondary"
							variant="outlined"
							endIcon={<StyledButtonIcon icon={ICON_COLLECTION.download} />}
							onClick={commands.handleDownload}
						/>
						{models.isEditable && (
							<ActionMenu
								activeActions={{
									delete: true,
									settings: true,
								}}
								isLinkCopied={models.isLinkCopied}
								onDownload={commands.handleDownload}
								onCopyLink={commands.handleCopyLink}
								onDelete={commands.handleDeleteVideo}
								onChangeSettings={commands.handleChangeVideoSettings}
							/>
						)}
					</ActionsContainer>
					<DetailedInfoContainer>
						<UserInfoHoverMenu
							user={models.video.user}
							disabled={!models.user}
							isCurrentUser={models.isEditable}
						>
							<StyledAvatar
								src={
									models.video.user.avatar
										? getUserAvatarURL(models.video.user.avatar)
										: undefined
								}
							/>
							<div>
								<Typography variant="body1">
									{`${models.video.user.firstName} ${models.video.user.lastName}`}
								</Typography>
								<StyledCaption variant="subtitle2">
									{format(new Date(models.video.createdAt), 'MMMM d, yyyy')}
								</StyledCaption>
							</div>
						</UserInfoHoverMenu>
						<TagsAutocomplete
							options={models.tags}
							initialTags={models.video.tags}
							isEditable={models.isEditable}
							onUpdateTags={(value) =>
								commands.handleUpdateVideo({ tags: value })
							}
						/>
						{models.user && models.video.isComments && (
							<VideoComments video={models.video} />
						)}
						{!models.user && <UnauthorisedCommentView />}
					</DetailedInfoContainer>
				</>
			)}
			<AccessSettingVideo />
			<DeleteVideo onVideosDeleted={commands.handleDeleteVideoSuccess} />
		</VideoPageContainer>
	);
};
