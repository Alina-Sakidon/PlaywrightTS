import { expect, test as baseTest, request } from '@playwright/test';
import { GaragePage } from '../pages/GaragePage';
import { LoginPage } from '../pages/LoginPage';
import testUser from '../support/testsUser';
import path from 'path';
import fs from 'fs';

const authDir = path.join(process.cwd(), 'playwright/.auth');
const storageStatePath = path.join(authDir, 'storageState.json');

// Розширена фікстура з логіном
export const test = baseTest.extend<{
    userGaragePage: GaragePage;
}>({
    userGaragePage: async ({ page }, use) => {
        if (!fs.existsSync(storageStatePath)) {
            // Створюємо директорію якщо немає
            if (!fs.existsSync(authDir)) {
                fs.mkdirSync(authDir, { recursive: true });
            }

            // Логін через UI
            const loginPage = new LoginPage(page);
            const garagePage = new GaragePage(page);

            await loginPage.navigate('/');
            await loginPage.login(testUser.email, testUser.password);

            // Зберігаємо стан
            await page.context().storageState({ path: storageStatePath });

            await garagePage.navigate();
            await use(garagePage);
        } else {
            // Використовуємо збережений session
            await page.context().addInitScript(() =>
                window.localStorage.setItem('auth', 'true') // опційно, якщо потрібно
            );
            await page.context().storageState({ path: storageStatePath });

            const garagePage = new GaragePage(page);
            await garagePage.navigate();
            await use(garagePage);
        }
    }
});

export { expect };
