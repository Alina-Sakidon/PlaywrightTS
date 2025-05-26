import { APIRequestContext } from '@playwright/test';
import { CARS_API_URL } from '../support/config';
import { loginHelper, setCookies } from '../helpers/loginHelper'
import { Message } from '../utils/constants/messages';


let cookiesValue: string | undefined;

export async function createCar(
    request: APIRequestContext,
    carData = {
        carBrandId: '1',
        carModelId: '1',
        mileage: 123
    }
) {
    if (!cookiesValue) {
        cookiesValue = `sid=${await loginHelper()}`;
    }

    const response = await request.post(CARS_API_URL, {
        headers: {
            cookie: cookiesValue,
        },
        data: carData,
    });

    if (!response.ok()) {
        throw new Error(Message.FAILED_TO_CREATE_CAR + `: ${response.status()}`);
    }

    const responseBody = await response.json();
    return responseBody.data;
}

