import path from 'path';
import fs from 'fs';
import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import testUser from '../support/testsUser';

const authDir = path.join(process.cwd(), 'playwright/.auth');
const storageStatePath = path.join(authDir, 'storageState.json');

test('Authorization via UI', async ({ page }) => {
  if (fs.existsSync(storageStatePath)) {
    return;
  }

  fs.mkdirSync(path.dirname(storageStatePath), { recursive: true });

  const loginPage = new LoginPage(page);

  await loginPage.navigate('/');
  await loginPage.login(testUser.email, testUser.password);
  await page.waitForURL('**/garage');
  await page.context().storageState({ path: storageStatePath });
});
