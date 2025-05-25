import BasePage from "./BasePage";
import { Locator, Page } from "@playwright/test";

export class GaragePage extends BasePage {
    private carList: Locator;
    private addCarButton: Locator;
    private brandInput: Locator;
    private modelInput: Locator;
    private mileageInput: Locator;
    private addButton: Locator;

    constructor(page: Page, baseUrl?: string) {
        super(page, baseUrl ?? '');
        this.carList = page.locator('.car-item');
        this.addCarButton = page.locator('button', { hasText: 'Add Car' });
        this.brandInput = page.locator('#addCarBrand');
        this.modelInput = page.locator('#addCarModel');
        this.mileageInput = page.locator('#addCarMileage');
        this.addButton = page.locator('//button[text()="Add"]');
    }

    get carListLocator() {
        return this.carList;
    }

    async clickAddCar() {
        await this.addCarButton.click();
    }

    async addCar(brand: string, model: string, mileage: string) {
        await this.clickAddCar();
        await this.brandInput.selectOption( brand );
        await this.modelInput.selectOption( model );
        await this.mileageInput.fill(mileage);
        await this.addButton.click();
    }
}
export default GaragePage;