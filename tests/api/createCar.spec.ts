import { test, expect } from '@playwright/test';
import { createCar, deleteCar } from '../../helpers/carHelper';
import { Message } from '../../utils/constants/messages';

test.describe('Create Car API Tests', () => {
    test('Create a car with valid data', async ({ request }) => {
        const carData = {
            carBrandId: '1',
            carModelId: '1',
            mileage: 250
        };

        const createdCar = await createCar(request, carData);

        expect(createdCar.carBrandId).toBe(carData.carBrandId);
        expect(createdCar.carModelId).toBe(carData.carModelId);
        expect(createdCar.mileage).toBe(carData.mileage);

        //post-creation cleanup
        await deleteCar(request, createdCar.id);
    });

    test('Create a car with invalid mileage values', async ({ request }) => {
        const invalidMileages = [999999999, -100];

        for (const mileage of invalidMileages) {
            const carData = {
                carBrandId: '1',
                carModelId: '1',
                mileage: mileage
            };

            const response = await createCar(request, carData).catch(e => e);

            expect(response).toBeInstanceOf(Error);
            expect(response.message).toContain(Message.FAILED_TO_CREATE_CAR);
        }
    });

    test('Create a car with missing required fields', async ({ request }) => {
        const carData = {
            carBrandId: '',
            carModelId: '1',
            mileage: 100
        };

        const response = await createCar(request, carData).catch(e => e);
        expect(response).toBeInstanceOf(Error);
        expect(response.message).toContain(Message.FAILED_TO_CREATE_CAR);
    });
});