import { DependencyList, EffectCallback, useEffect } from 'react';

import { useFirstRender } from 'shared/hooks/use-first-render';

export function useEffectAfterMount(
	effect: EffectCallback,
	deps?: DependencyList,
) {
	const firstRender = useFirstRender();

	useEffect(() => {
		if (!firstRender) {
			return effect();
		}
	}, deps);
}
