import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export class LoginPage extends BasePage {
    private signUpButton: Locator;

    constructor(page: Page, baseUrl?: string) {
        super(page, baseUrl ?? '');
        this.signUpButton = page.locator('button', { hasText: 'Sign up' });
    }

    async clickSignUp(): Promise<this> {
        await this.signUpButton.click();
        return this;
    }
}

export default LoginPage;
