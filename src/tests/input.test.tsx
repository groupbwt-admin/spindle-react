import { expect, test } from '@playwright/experimental-ct-react';

import { Input } from '../shared/components/input/input';

test.use({ viewport: { width: 500, height: 500 } });

test('should work input', async ({ mount }) => {
	const component = await mount(<Input placeholder="in" />);
	const input = await component.getByPlaceholder('in');
	await input.fill('John');
	await expect(input).toHaveValue('John');
});
