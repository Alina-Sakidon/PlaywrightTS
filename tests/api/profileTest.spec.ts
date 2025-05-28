import { test, expect } from '@playwright/test';
import { loginHelper, setCookies } from '../../helpers/loginHelper';
import LoginPage from '../../pages/LoginPage';
import { BASE_PROFILE_URL } from '../../support/config';
import { PROFILE_API_URL } from '../../support/config';
import { ProfilePage } from '../../pages/ProfilePage';


let cookiesValue: string;
let loginPage: LoginPage;
let profilePage: ProfilePage;

test.beforeAll(async () => {
    cookiesValue = await loginHelper();
});

test('Change response body for user profile via API and UI check', async ({ page }) => {
    loginPage = new LoginPage(page);
    profilePage = new ProfilePage(page);
    await loginPage.navigate();
    await setCookies(page, cookiesValue);

    const userData = {
        userId: 123,
        photoFilename: 'test-avatar.png',
        name: 'Alina',
        lastName: 'Sak'
    };

    const mockedProfile = {
        status: 'ok',
        data: {
            userId: userData.userId,
            photoFilename: userData.photoFilename,
            name: userData.name,
            lastName: userData.lastName
        },
    };

    await page.route(PROFILE_API_URL, async (route, request) => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockedProfile),
        });
    });

    await loginPage.navigate(BASE_PROFILE_URL);
    expect(await profilePage.getFullName()).toBe(`${userData.name} ${userData.lastName}`);
});
