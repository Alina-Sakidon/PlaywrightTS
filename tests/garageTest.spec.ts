import { test, expect } from './fixtures';


test('User can add a car to the garage', async ({ userGaragePage }) => {
    const countBefore = await userGaragePage.carListLocator.count();
    expect(countBefore).toBeGreaterThanOrEqual(0);

    await userGaragePage.addCar('BMW', 'X5', '15000');

    await expect(userGaragePage.carListLocator).toHaveCount(countBefore + 1);
});

