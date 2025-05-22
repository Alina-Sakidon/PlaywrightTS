import { test, expect } from './fixtures';

test('User can add a car to the garage', async ({ userGaragePage }) => {
    const garagePage = userGaragePage;

    const countBefore = await garagePage.carListLocator.count();
    await garagePage.addCar('Toyota', 'Corolla', '15000');
    const countAfter = await garagePage.carListLocator.count();

    expect(countAfter).toBeGreaterThan(countBefore);
});
