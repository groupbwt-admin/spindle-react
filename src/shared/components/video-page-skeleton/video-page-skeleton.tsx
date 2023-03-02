import styled from '@emotion/styled/macro';

import { Skeleton, Stack } from '@mui/material';

const SkeletonContainer = styled.div`
	position: relative;
`;

const VideoSkeleton = styled(Skeleton)`
	width: 100%;
	height: 56.25vw;
	max-height: calc(100vh - 300px);
	min-height: 480px;
	border-radius: 10px;
	margin-bottom: 16px;
`;

const StyledSkeleton = styled(Skeleton)`
	border-radius: 10px;
`;

export const VideoPageSkeleton = () => {
	return (
		<SkeletonContainer>
			<VideoSkeleton variant="rectangular" />
			<StyledSkeleton
				width={282}
				height="32px"
				style={{ marginBottom: 23, borderRadius: 32 }}
				variant="rounded"
			/>
			<Stack gap={3} direction="row" alignItems="center" marginBottom={2}>
				<StyledSkeleton
					height={8}
					width={80}
					style={{ borderRadius: 32 }}
					variant="rounded"
				/>
				<StyledSkeleton
					height={54}
					width={150}
					style={{ marginLeft: 'auto' }}
					variant="rounded"
				/>
				<StyledSkeleton height={54} width={150} variant="rounded" />
				<StyledSkeleton height={54} width={56} variant="rounded" />
			</Stack>
			<Stack gap={3} direction="row" alignItems="center">
				<Skeleton variant="circular" width={40} height={40} />
				<div>
					<StyledSkeleton
						width={282}
						height={18}
						style={{ marginBottom: 12, borderRadius: 32 }}
						variant="rounded"
					/>
					<StyledSkeleton
						width={80}
						height={8}
						style={{ borderRadius: 32 }}
						variant="rounded"
					/>
				</div>
			</Stack>
		</SkeletonContainer>
	);
};
