import { expect, test as baseTest } from '@playwright/test';
import GaragePage from '../pages/GaragePage';

export const test = baseTest.extend<{
  userGaragePage: GaragePage;
}>({
  userGaragePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page);
    await garagePage.navigate('');
    await use(garagePage);
  },
});

export { expect };
