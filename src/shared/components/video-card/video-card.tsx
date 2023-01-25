import {Card, CardActionArea, CardActions, CardContent, CardMedia} from "@mui/material";
import {Typography} from "shared/components/typography/typography";
import styled from "@emotion/styled/macro";
import {Avatar} from "shared/components/avatar/avatar";
import {Icon} from "shared/components/icon/icon";
import {ICON_COLLECTION} from "shared/components/icon/icon-list";

const StyledCard = styled(Card)`
	border-radius: 15px;
	background-color: ${({theme}) => theme.palette.common.white};
	box-shadow: none;
`

const StyledCaption = styled(Typography)`
	color: ${({theme}) => theme.palette.text.secondary};
`

const StyledTitle = styled(Typography)`
	margin-top: 4px;
	font-weight: 600;
`

const StyledAvatar = styled(Avatar)`
	width: 24px;
	height: 24px;
	margin-right: 8px;
	border: none;
`

const StyledViews = styled.div`
	margin-left: auto !important;
	color: ${({theme}) => theme.palette.text.secondary};
	display: flex;
	align-items: baseline;
`

const StyledComments = styled.div`
	color: ${({theme}) => theme.palette.text.secondary};
	display: flex;
	align-items: center;
	margin-left: 13px !important;
`

const StyledBadgeIcon = styled(Icon)`
	margin-left: 5px;
`

export const VideoCard = () => {
	return <StyledCard>
		<CardActionArea>
			<CardMedia
				sx={{ height: 172 }}
				image="https://hips.hearstapps.com/hmg-prod/images/wednesday-s1-e4-00-34-26-18r-1671050474.jpg"
				title="green iguana"
			/>
			<CardContent>
				<StyledCaption variant="subtitle2">
					August 16, 2022
				</StyledCaption>
				<StyledTitle variant="h4">
					Figma project one - august 2022
				</StyledTitle>
			</CardContent>
			<CardActions>
				<StyledAvatar/>
				<StyledCaption variant="subtitle2">
					Kristin Watson
				</StyledCaption>
				<StyledViews>
					10
					<StyledBadgeIcon icon={ICON_COLLECTION.views}/>
				</StyledViews>
				<StyledComments>
					4
					<StyledBadgeIcon icon={ICON_COLLECTION.comments}/>
				</StyledComments>
			</CardActions>
		</CardActionArea>
	</StyledCard>
}
