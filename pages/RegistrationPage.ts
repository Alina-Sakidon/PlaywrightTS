import { Locator, Page, expect } from '@playwright/test';
import BasePage from './BasePage';

export class RegistrationPage extends BasePage {
    private nameInput: Locator;
    private lastNameInput: Locator;
    private emailInput: Locator;
    private passwordInput: Locator;
    private repeatPasswordInput: Locator;
    private registerBtn: Locator;
    private alertList: Locator;

    constructor(page: Page, baseUrl?: string) {
        super(page, baseUrl ?? '');
        this.nameInput = page.locator('#signupName');
        this.lastNameInput = page.locator('#signupLastName');
        this.emailInput = page.locator('#signupEmail');
        this.passwordInput = page.locator('#signupPassword');
        this.repeatPasswordInput = page.locator('#signupRepeatPassword');
        this.registerBtn = page.locator('//button[text()="Register"]');
        this.alertList = page.locator('app-alert-list p');
    }

    get name() {
        return this.nameInput;
    }

    get lastName() {
        return this.lastNameInput;
    }

    get email() {
        return this.emailInput;
    }

    get password() {
        return this.passwordInput;
    }

    get repeatPassword() {
        return this.repeatPasswordInput;
    }

    get registerButton() {
        return this.registerBtn;
    }

    get alerts() {
        return this.alertList;
    }

    async fillName(value: string): Promise<this> {
        await this.nameInput.fill(value);
        return this;
    }

    async fillLastName(value: string): Promise<this> {
        await this.lastNameInput.fill(value);
        return this;
    }

    async fillEmail(value: string): Promise<this> {
        await this.emailInput.fill(value);
        return this;
    }

    async fillPassword(value: string): Promise<this> {
        await this.passwordInput.fill(value);
        return this;
    }

    async fillRepeatPassword(value: string): Promise<this> {
        await this.repeatPasswordInput.fill(value);
        return this;
    }

    async clickRegister(): Promise<this> {
        await this.registerBtn.click();
        return this;
    }

    async isRegisterButtonDisabled(): Promise<boolean> {
        return this.registerBtn.isDisabled();
    }

    async expectFieldToHaveErrorMessage(errorMessages: string[] | string): Promise<this> {
        if (Array.isArray(errorMessages)) {
            for (const msg of errorMessages) {
                await expect(this.page.getByText(msg)).toBeVisible();
            }
        } else {
            await expect(this.page.getByText(errorMessages)).toBeVisible();
        }
        return this;
    }

    async clickFieldAndBlur(field: Locator): Promise<this> {
        await field.click();
        await this.page.locator('body').click();
        return this;
    }

    async expectFieldToHaveBorderColor(field: Locator, expectedColor: string): Promise<this> {
        await expect(field).toHaveCSS('border-color', expectedColor);
        return this;
    }

    async getAlertList(): Promise<string[]> {
        await expect(this.alertList).toBeVisible();
        return this.alertList.allTextContents();
    }

    async expectInvalidField(field: Locator, errorMessage: string, borderColor: string): Promise<void> {
        await expect.soft(this.isRegisterButtonDisabled()).toBeTruthy();
        await expect.soft(this.expectFieldToHaveErrorMessage(errorMessage)).resolves.not.toThrow();
        await expect.soft(this.expectFieldToHaveBorderColor(field, borderColor)).resolves.not.toThrow();
    }
}

export default RegistrationPage;