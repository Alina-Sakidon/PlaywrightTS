import BasePage from "./BasePage";
import { Locator, Page } from '@playwright/test';

export class ProfilePage extends BasePage {
    private profileHeader: Locator;
    private profilePicture: Locator;
    private editProfileButton: Locator;
    private logoutButton: Locator;

    constructor(page: Page, baseUrl?: string) {
        super(page, baseUrl ?? '');
        this.profileHeader = page.locator('h1', { hasText: 'Profile' });
        this.profilePicture = page.locator('.profile-picture');
        this.editProfileButton = page.locator('button', { hasText: 'Edit Profile' });
        this.logoutButton = page.locator('button', { hasText: 'Logout' });
    }

    async isProfileVisible(): Promise<boolean> {
        return await this.profileHeader.isVisible();
    }

    async clickEditProfile(): Promise<this> {
        await this.editProfileButton.click();
        return this;
    }

    async clickLogout(): Promise<this> {
        await this.logoutButton.click();
        return this;
    }
}