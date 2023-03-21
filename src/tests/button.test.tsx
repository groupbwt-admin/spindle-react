import { expect, test } from '@playwright/experimental-ct-react';

import { Button } from '../shared/components/button/button';

test.use({ viewport: { width: 500, height: 500 } });

test('button test', async ({ mount }) => {
	const button = await mount(<Button label={'test'} />);
	await expect(button);
});
