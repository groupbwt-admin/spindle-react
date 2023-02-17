import React from 'react';
import styled from '@emotion/styled/macro';
import { format } from 'date-fns';
import { useVideo } from 'modules/videos/pages/video/use-video';

import { getUserAvatarURL } from 'shared/utils/get-file-url';

import { Avatar } from 'shared/components/avatar/avatar';
import { Button } from 'shared/components/button/button';
import { IconButton } from 'shared/components/button/icon-button';
import { EditInputField } from 'shared/components/edit-input-field/edit-input-field';
import { ReactComponent as IconRecord } from 'shared/components/icon/collection/record.svg';
import { Icon } from 'shared/components/icon/icon';
import { ICON_COLLECTION } from 'shared/components/icon/icon-list';
import { TagsAutocomplete } from 'shared/components/tags-autocomplete/tags-autocomplete';
import { Typography } from 'shared/components/typography/typography';
import { ActionMenu } from 'shared/components/video-card/action-menu';

const VideoPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100%;
	margin-bottom: 40px;
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
		background: #ffffff;
		border: 1px solid #eeeff1;
		border-radius: 10px;
		padding: 16px 24px;
	}
`;

const Title = styled(Typography)`
	flex-shrink: 0;
`;

const VideoTitle = styled(Typography)`
	flex-shrink: 0;
	cursor: pointer;
	border-radius: 10px;
	padding: 8px;
	transition: box-shadow 0.3s ${({ theme }) => theme.transitions.easing.easeIn};

	&:hover {
		box-shadow: 0 0 0 1px ${({ theme }) => theme.palette.primary.main};
	}
`;

const ViewsCount = styled(Typography)`
	color: ${({ theme }) => theme.palette.text.secondary};
	margin-right: auto;
`;

const StyledVideo = styled.video`
	width: 100%;
	aspect-ratio: 2/0.92;
	border-radius: 10px;
	margin-bottom: 16px;
`;

const StyledIconButton = styled(IconButton)`
	background: #ffffff;
	border: 1px solid #eeeff1;
	border-radius: 10px;
	padding: 15px 24px;
	margin-right: 12px;
`;

const StyledAvatar = styled(Avatar)`
	width: 42px;
	height: 42px;
	border: none;
`;

const StyledCaption = styled(Typography)`
	color: ${({ theme }) => theme.palette.text.secondary};
`;

const RecordButton = styled(Button)`
	max-width: 190px;
	color: #ffffff;
	justify-self: flex-start;
	margin-left: auto;
`;

const StyledButtonIcon = styled(Icon)`
	width: 24px;
	height: 24px;
	margin-left: 4px;
`;

export const VideoPage: React.FC = () => {
	const { models, commands } = useVideo();

	if (!models.videoUrl.data?.url || !models.video) return <></>;

	return (
		<VideoPageContainer>
			<HeaderContainer>
				<StyledIconButton onClick={commands.handleBack}>
					<Icon icon={ICON_COLLECTION.arrow_left} />
				</StyledIconButton>
				<Title variant="h1">{models.pageTitle}</Title>
				<RecordButton label="Start Recording" startIcon={<IconRecord />} />
			</HeaderContainer>
			<StyledVideo
				controls
				src={models.videoUrl.data.url}
				controlsList="nodownload"
			/>
			{/*<VideoPlayer />*/}
			{/*<VideoTitle variant="h1">{models.video.title}</VideoTitle>*/}
			<EditInputField
				value={models.video.title}
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
				<ActionMenu
					isLinkCopied={false}
					onDownload={commands.handleDownload}
					onCopyLink={commands.handleCopyLink}
					onDelete={commands.handleDeleteVideo}
				/>
			</ActionsContainer>
			<DetailedInfoContainer>
				<StyledAvatar
					src={
						models.video.user.avatar
							? getUserAvatarURL(models.video.user.avatar)
							: undefined
					}
				/>
				<div>
					<Typography variant="body1">
						{models.video.user.firstName + models.video.user.lastName}
					</Typography>
					<StyledCaption variant="subtitle2">
						{format(new Date(models.video.createdAt), 'MMMM d, yyyy')}
					</StyledCaption>
				</div>
				<TagsAutocomplete
					options={models.tags}
					initialTags={models.video.tags}
					onUpdateTags={(value) => commands.handleUpdateVideo({ tags: value })}
				/>
			</DetailedInfoContainer>
			{models.deleteVideoModal}
		</VideoPageContainer>
	);
};
