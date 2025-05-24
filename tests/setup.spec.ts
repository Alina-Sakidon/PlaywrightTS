import path from 'path';
import fs from 'fs';
import LoginPage from '../pages/LoginPage';
import GaragePage from '../pages/GaragePage';
import { test as setup, expect } from '@playwright/test';
import testUser from '../support/testsUser';

let loginPage: LoginPage;
let garagePage: GaragePage;
const authDir = path.join(process.cwd(), 'playwright/.auth');
const storageStatePath = path.join(authDir, 'storageState.json');

setup('Authorization via UI', async ({ page }) => {
    if (fs.existsSync(storageStatePath)) {
        return;
    }

    fs.mkdirSync(path.dirname(storageStatePath), { recursive: true });

    loginPage = new LoginPage(page);

    await loginPage.navigate('/');
    await loginPage.login(testUser.email, testUser.password);
    await page.waitForURL('**/garage');
    await page.context().storageState({ path: storageStatePath });
}
);
