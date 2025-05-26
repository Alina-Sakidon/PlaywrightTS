import { test, expect } from '@playwright/test';
import { loginHelper, setCookies } from '../../helpers/loginHelper';
import LoginPage from '../../pages/LoginPage';


const BASE_URL = 'https://qauto.forstudy.space/api';
    let cookiesValue: string;
    let loginPage: LoginPage;

test.beforeAll(async () => {
    cookiesValue = await loginHelper();
});

test('Підміна response body для /api/users/profile і перевірка UI', async ({ page }) => {
    // Крок 1: Авторизація
    loginPage = new LoginPage(page);
    await loginPage.navigate();
    await setCookies(page, cookiesValue);

    // Крок 2: Підміна відповіді
    const mockedProfile = {
        status: 'ok',
        data: {
            userId: 999999,
            photoFilename: 'mock-avatar.png',
            name: 'Тест',
            lastName: 'Користувач'
        }
    };

    await page.route('**/api/users/profile', async (route, request) => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockedProfile),
        });
    });

    // Крок 3: Переходимо на сторінку профілю
    await page.goto('https://qauto.forstudy.space/panel/profile');

    // Крок 4: Перевіряємо, що відображено саме підмінені дані
    await expect(page.locator('text=Тест')).toBeVisible();
    await expect(page.locator('text=Користувач')).toBeVisible();

    // (опціонально) Перевірка аватарки, якщо є
    const avatarImg = page.locator('img'); // або уточни селектор, якщо є;
});
