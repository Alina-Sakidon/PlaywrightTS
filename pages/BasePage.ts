import { Page } from "playwright-core";

class BasePage {
    protected page: Page;
    protected baseUrl: string;

    constructor(page: Page, baseUrl: string) {
        this.page = page;
        this.baseUrl = process.env.PLAYWRIGHT_BASE_URL || '';
    }

    async navigate(url: string = '/'): Promise<this> {
        const fullUrl = this.baseUrl + url;
        await this.page.goto(fullUrl);
        return this;
    }
}

export default BasePage;