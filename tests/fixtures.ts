import path from 'path';
import fs from 'fs';
import { expect, test as baseTest } from '@playwright/test';
import GaragePage from '../pages/GaragePage';

const storageStatePath = path.join(process.cwd(), 'playwright/.auth/storageState.json');

export const test = baseTest.extend<{
  userGaragePage: GaragePage;
}>({
  userGaragePage: async ({ browser }, use) => {
    if (!fs.existsSync(storageStatePath)) {
      throw new Error('StorageState not found. Запусти спочатку тест авторизації (setup.spec.ts)');
    }
    const context = await browser.newContext({ storageState: storageStatePath });
    const page = await context.newPage();

    const garagePage = new GaragePage(page);
    await garagePage.navigate('');

    await use(garagePage);

    await context.close();
  },
});

export { expect };
