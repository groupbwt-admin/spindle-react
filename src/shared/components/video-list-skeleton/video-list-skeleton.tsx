import styled from '@emotion/styled/macro';
import { Card, CardActions, CardContent, Skeleton } from '@mui/material';

const StyledCard = styled(Card)`
	border-radius: 15px;
	background-color: ${({ theme }) => theme.palette.common.white};
	box-shadow: none;
	height: 100%;
`;

const VideoContainer = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(5, minmax(0px, 1fr));
	grid-auto-columns: 306px;
	grid-column-gap: 24px;
	grid-row-gap: 24px;
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

const MediaSkeleton = styled(Skeleton)`
	width: 100%;
	height: 172px;
	margin-bottom: 16px;
`;

export const VideoListSkeleton = () => {
	return (
		<VideoContainer>
			{Array.from(new Array(20)).map((item, id) => {
				return (
					<StyledCard key={id}>
						<MediaSkeleton variant="rectangular" width="100%" height="172px" />
						<CardContent>
							<Skeleton width="40%" height="18px" />
							<Skeleton
								animation="wave"
								height={10}
								style={{ marginBottom: 6 }}
							/>
							<Skeleton animation="wave" height={10} width="80%" />
						</CardContent>
						<CardActions>
							<Skeleton
								animation="wave"
								variant="circular"
								width={40}
								height={40}
							/>
						</CardActions>
					</StyledCard>
				);
			})}
		</VideoContainer>
	);
};
