import { request } from 'playwright-core';
import { Page } from '@playwright/test';
import testUser from '../support/testsUser';
import { AUTH_API_URL } from '../support/config';

async function loginHelper(): Promise<string> {
    let sidValue = '';
    var client = await request.newContext();
    var response = await client.post(AUTH_API_URL, {
        data: {
            email: testUser.email,
            password: testUser.password,
            remember: true
        }
    });

    if (response.ok()) {
        const cookies = await response.headersArray();
        const sidCookie = cookies.find(cookie => cookie.value.startsWith('sid'));

        if (sidCookie) {
            sidValue = sidCookie.value.split(';')[0].split('=')[1];
            console.log(`Extracted cookie: ${sidValue}`);
        }
    } else {
        throw new Error(`Login request failed with status: ${response.status()}`);
    }

    return sidValue;
}

async function setCookies(page: Page, sidValue: string): Promise<void> {
    if (!sidValue) {
        throw new Error('SID value is empty or undefined');
    }

    await page.context().addCookies([
        {
            name: 'sid',
            value: sidValue,
            domain: '.forstudy.space',
            path: '/'
        }
    ]);

    await page.reload();
}

export { loginHelper, setCookies };