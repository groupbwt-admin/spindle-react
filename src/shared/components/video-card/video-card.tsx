import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
} from '@mui/material';
import { Typography } from 'shared/components/typography/typography';
import styled from '@emotion/styled/macro';
import { Avatar } from 'shared/components/avatar/avatar';
import { Icon } from 'shared/components/icon/icon';
import { ICON_COLLECTION } from 'shared/components/icon/icon-list';
import React from 'react';
import { IVideo } from 'shared/types/video';
import { getUserAvatarURL } from 'shared/utils/get-file-url';
import { useNavigate } from 'react-router-dom';
import { VIDEO_ROUTES } from 'shared/config/routes';
import { ActionMenu } from 'shared/components/video-card/action-menu';
import { Checkbox } from 'shared/components/checkbox/checkbox';
import {css} from "@mui/material/styles";

const StyledCheckbox = styled(Checkbox)`
	position: absolute;
	top: 10px;
	left: 10px;
	padding: 8px;
	background-color: ${({ theme }) => theme.palette.common.white};
	border-radius: 10px;
	z-index: 2;
	display: none;

	label, .MuiCheckbox-root {
		margin-right: 0;
	}
`;

const StyledActionMenu = styled(ActionMenu)`
	position: absolute;
	right: 10px;
	top: 10px;
	background-color: ${({ theme }) => theme.palette.common.white};
	border-radius: 10px;
	z-index: 2;
	opacity: 0;

	&:hover {
		background-color: ${({ theme }) => theme.palette.common.white};
	}
`;

const StyledCard = styled(Card)<{ isSelectMode: boolean }>`
	position: relative;
	border-radius: 15px;
	background-color: ${({ theme }) => theme.palette.common.white};
	box-shadow: none;
	height: 100%;

	${({ isSelectMode }) =>
		isSelectMode &&
		css`
			${StyledCheckbox} {
				display: block;
			}
		`}

	&:hover, &:focus {
		${StyledCheckbox} {
			display: block;
		}

		${StyledActionMenu} {
			opacity: 1;
		}
	}

	.MuiCardActionArea-root:hover .MuiCardActionArea-focusHighlight {
		opacity: 0.2;
	}
`;

const StyledCaption = styled(Typography)`
	color: ${({ theme }) => theme.palette.text.secondary};
`;

const StyledCardActions = styled(CardActions)`
	padding: 16px;
`

const StyledTitle = styled(Typography)`
	margin-top: 4px;
	font-weight: 600;
`;

const StyledAvatar = styled(Avatar)`
	width: 24px;
	height: 24px;
	margin-right: 8px;
	border: none;
`;

const StyledViews = styled.div`
	margin-left: auto !important;
	color: ${({ theme }) => theme.palette.text.secondary};
	display: flex;
	align-items: baseline;
`;

const StyledComments = styled.div`
	color: ${({ theme }) => theme.palette.text.secondary};
	display: flex;
	align-items: center;
	margin-left: 13px !important;
`;

const StyledPreview = styled.img`
	position: absolute;
	object-fit: cover;
	width: 100%;
	height: 100%;
	top: 0;
	right: 0;
	left: 0;
`;

const StyledBadgeIcon = styled(Icon)`
	margin-left: 5px;
`;

interface VideoCardProps {
	video: IVideo;
	isSelectMode: boolean;
	checked: boolean;
	onChecked: (IVideo) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ checked, isSelectMode, video, onChecked }) => {
	const navigate = useNavigate();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChecked({video, checked: event.target.checked});
	};

	const handleClick = () => {
		if(!isSelectMode) {
			navigate(VIDEO_ROUTES.VIDEO.generate(video.id))
		} else {
			onChecked({video, checked: !checked})
		}
	}

	return (
		<StyledCard onClick={handleClick} isSelectMode={isSelectMode}>
			<CardActionArea>
				<CardMedia sx={{ height: 172, position: 'relative' }}>
					<StyledPreview
						loading="lazy"
						src={
							video.gif
								? getUserAvatarURL(video.gif)
								: 'https://virtualfoodpantry.net/images/noimage.png'
						}
					/>
				</CardMedia>
				<CardContent>
					<StyledCaption variant="subtitle2">{video.createdAt}</StyledCaption>
					<StyledTitle variant="h4">{video.title}</StyledTitle>
				</CardContent>
				<StyledCardActions>
					<StyledAvatar
						src={
							video.user.avatar
								? getUserAvatarURL(video.user.avatar)
								: video.user.avatar
						}
					/>
					<StyledCaption variant="subtitle2">
						{video.user.firstName}
					</StyledCaption>
					<StyledViews>
						{video.viewsCount}
						<StyledBadgeIcon icon={ICON_COLLECTION.views} />
					</StyledViews>
					<StyledComments>
						{video.countComment}
						<StyledBadgeIcon icon={ICON_COLLECTION.comments} />
					</StyledComments>
				</StyledCardActions>
				<StyledCheckbox
					checked={checked}
					onChange={handleChange}
					onClick={(e) => e.stopPropagation()}
				/>
				<StyledActionMenu />
			</CardActionArea>
		</StyledCard>
	);
};
