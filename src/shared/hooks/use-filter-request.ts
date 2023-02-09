import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';

export type UseFilterRequestRequestParams<P = object> = P & {
	signal?: AbortSignal;
};

interface UseFilterRequestParams<R, P = object, F = object> {
	enabled?: boolean;
	request: (params: UseFilterRequestRequestParams<P>) => Promise<R>;
	searchRequest?: (params: F) => Promise<R>;
	manualTriggering?: boolean;
	searchFuncDependencies?: Array<any>;
}

export function useFilterRequest<R, P = object, F = object>({
	enabled = true,
	request,
	searchRequest,
	manualTriggering,
	searchFuncDependencies = [],
}: UseFilterRequestParams<R, P, F>) {
	const [isRefetching, setIsRefetching] = useState(false);
	const [isInitialLoading, setIsInitialLoading] = useState(false);
	const [isInitialRequestSent, setInitialRequestSent] = useState(false);
	const [isSearching, setIsSearching] = useState(false);
	const [data, setData] = useState<R | undefined>();
	const abortController = useRef<AbortController>();

	useEffect(() => {
		if (manualTriggering || !enabled) return;

		(async () => {
			const result = await getData();
			setData(result);
		})();
	}, [enabled]);

	const searchMemoized = useCallback(
		debounce(async (getParams?: () => F, onSuccess?: () => void) => {
			try {
				setIsSearching(true);

				const params = getParams ? getParams() : {};
				const result = await getData(params as object, true);

				setIsSearching(false);
				setData(result);
				onSuccess && onSuccess();

				return result;
			} catch (e) {
				setIsSearching(false);
			}
		}, 300),
		[...searchFuncDependencies],
	);

	async function refetchData(
		params?: object,
		config: { silently: boolean } = { silently: false },
	) {
		try {
			!config.silently && setIsRefetching(true);

			const result = await getData(params);

			!config?.silently && setIsRefetching(false);

			return result;
		} catch (e) {
			!config?.silently && setIsRefetching(false);
			return Promise.reject(e);
		}
	}

	async function getData(params = {}, isSearching?: boolean) {
		if (!isInitialRequestSent && !isSearching) {
			setIsInitialLoading(true);
		}

		if (abortController.current) {
			abortController.current.abort();
		}
		abortController.current = new AbortController();

		const response = (isSearching && searchRequest
			? await searchRequest({
					...(params as F),
					signal: abortController.current?.signal,
			  })
			: await request({
					signal: abortController.current?.signal,
					...(params as P),
			  })) as unknown as Promise<R>;

		if (!isInitialRequestSent && !isSearching) {
			setIsInitialLoading(false);
			setInitialRequestSent(true);
		}

		return response;
	}

	const fetchData = (params?: object) => {
		return getData(params);
	};

	const updateState = setData;

	return {
		data,
		isRefetching,
		isInitialLoading,
		isInitialRequestSent,
		isSearching,
		searchData: searchMemoized,
		fetchData,
		refetchData,
		updateState,
	};
}
