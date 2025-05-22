import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export class LoginPage extends BasePage {
    private signUpButton: Locator;
    private signInButton: Locator;
    private emailInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;

    constructor(page: Page, baseUrl?: string) {
        super(page, baseUrl ?? '');
        this.signUpButton = page.locator('button', { hasText: 'Sign up' });
        this.signInButton = page.locator('button', { hasText: 'Sign in' });
        this.emailInput = page.locator('#signinEmail');
        this.passwordInput = page.locator('#signinPassword');
        this.loginButton = page.locator('button', { hasText: 'Login' });
    }

    async clickSignUp(): Promise<this> {
        await this.signUpButton.click();
        return this;
    }

    async login(email: string, password: string): Promise<this> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        return this;
    }

}

export default LoginPage;
