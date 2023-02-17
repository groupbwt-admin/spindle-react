import { useEffect, useRef, useState } from 'react';

import { VIDEO_ROUTES } from 'shared/config/routes';

export function useCopyLink(video) {
	const copyLinkTimerRef = useRef<ReturnType<typeof setTimeout>>();
	const [isLinkCopied, setIsLinkCopied] = useState(false);

	useEffect(() => {
		return () => {
			clearTimeout(copyLinkTimerRef.current);
		};
	}, []);

	const handleCopyLink = async (e) => {
		e.stopPropagation();
		if (isLinkCopied || !navigator.clipboard) return;

		await navigator.clipboard.writeText(
			VIDEO_ROUTES.VIDEO.generateExternalPath(video.id),
		);
		setIsLinkCopied(true);
		copyLinkTimerRef.current = setTimeout(() => {
			setIsLinkCopied(false);
		}, 1500);
	};

	return {
		isLinkCopied,
		handleCopyLink,
	};
}
