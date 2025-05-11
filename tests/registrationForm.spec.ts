import { test, expect, Page } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import generateTestEmail from '../utils/rundomGenerator'
import RegistrationPage from '../pages/RegistrationPage';


test.describe('Registration Form Validation', () => {
  let loginPage: LoginPage;
  let registrationPage: RegistrationPage;
  const BORDER_COLOR_INVALID = 'rgb(220, 53, 69)';

  test.beforeEach(async ({ page }: { page: Page }) => {
    loginPage = new LoginPage(page);
    registrationPage = new RegistrationPage(page);

    await loginPage.navigate('/');
    await loginPage.clickSignUp();
  });

  test('All fields are required validation', async () => {
    const testData: Array<{ field: typeof registrationPage.name; errorMessage: string }> = [
      { field: registrationPage.name, errorMessage: 'Name required' },
      { field: registrationPage.lastName, errorMessage: 'Last name required' },
      { field: registrationPage.email, errorMessage: 'Email required' },
      { field: registrationPage.password, errorMessage: 'Password required' },
      { field: registrationPage.repeatPassword, errorMessage: 'Re-enter password required' }
    ];

    for (const { field, errorMessage } of testData) {
      await registrationPage.clickFieldAndBlur(field);
      await expect.soft(registrationPage.isRegisterButtonDisabled()).toBeTruthy();
      await expect.soft(registrationPage.expectFieldToHaveErrorMessage(errorMessage)).resolves.not.toThrow();
      await expect.soft(registrationPage.expectFieldToHaveBorderColor(field, BORDER_COLOR_INVALID)).resolves.not.toThrow();
    }
  });

  test('Name field validation', async () => {
    await registrationPage.fillName('A');
    await registrationPage.clickFieldAndBlur(registrationPage.name);

    await expect.soft(registrationPage.isRegisterButtonDisabled()).toBeTruthy();
    await expect.soft(registrationPage.expectFieldToHaveErrorMessage('Name has to be from 2 to 20 characters long')).resolves.not.toThrow();
    await expect.soft(registrationPage.expectFieldToHaveBorderColor(registrationPage.name, BORDER_COLOR_INVALID)).resolves.not.toThrow();

    await registrationPage.fillName('A@#');
    await expect.soft(registrationPage.isRegisterButtonDisabled()).toBeTruthy();
    await expect.soft(registrationPage.expectFieldToHaveErrorMessage('Name is invalid')).resolves.not.toThrow();
    await expect.soft(registrationPage.expectFieldToHaveBorderColor(registrationPage.name, BORDER_COLOR_INVALID)).resolves.not.toThrow();
  });

  test('Last name field validation', async () => {
    await registrationPage.fillLastName('A');
    await registrationPage.clickFieldAndBlur(registrationPage.lastName);

    await expect.soft(registrationPage.isRegisterButtonDisabled()).toBeTruthy();
    await expect.soft(registrationPage.expectFieldToHaveErrorMessage('Last name has to be from 2 to 20 characters long')).resolves.not.toThrow();
    await expect.soft(registrationPage.expectFieldToHaveBorderColor(registrationPage.lastName, BORDER_COLOR_INVALID)).resolves.not.toThrow();

    await registrationPage.fillLastName('A@#');
    await expect.soft(registrationPage.isRegisterButtonDisabled()).toBeTruthy();
    await expect.soft(registrationPage.expectFieldToHaveErrorMessage('Last name is invalid')).resolves.not.toThrow();
    await expect.soft(registrationPage.expectFieldToHaveBorderColor(registrationPage.lastName, BORDER_COLOR_INVALID)).resolves.not.toThrow();
  });

  test('Email field validation', async () => {
    await registrationPage.fillEmail('invalid-email');
    await registrationPage.clickFieldAndBlur(registrationPage.password);

    await expect.soft(registrationPage.isRegisterButtonDisabled()).toBeTruthy();
    await expect.soft(registrationPage.expectFieldToHaveErrorMessage('Email is incorrect')).resolves.not.toThrow();
    await expect.soft(registrationPage.expectFieldToHaveBorderColor(registrationPage.email, BORDER_COLOR_INVALID)).resolves.not.toThrow();
  });

  test('Password field validation', async () => {
    await registrationPage.fillPassword('1234');
    await registrationPage.clickFieldAndBlur(registrationPage.password);

    await expect.soft(registrationPage.isRegisterButtonDisabled()).toBeTruthy();
    await expect.soft(
      registrationPage.expectFieldToHaveErrorMessage(
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      )
    ).resolves.not.toThrow();
    await expect.soft(registrationPage.expectFieldToHaveBorderColor(registrationPage.password, BORDER_COLOR_INVALID)).resolves.not.toThrow();

    await registrationPage.fillPassword('12345678');
    await registrationPage.clickFieldAndBlur(registrationPage.repeatPassword);

    await expect.soft(registrationPage.isRegisterButtonDisabled()).toBeTruthy();
    await expect.soft(
      registrationPage.expectFieldToHaveErrorMessage(
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      )
    ).resolves.not.toThrow();
    await expect.soft(registrationPage.expectFieldToHaveBorderColor(registrationPage.repeatPassword, BORDER_COLOR_INVALID)).resolves.not.toThrow();
  });

  test('Repeat password field validation', async () => {
    await registrationPage.fillPassword('Qwerty123');
    await registrationPage.fillRepeatPassword('Qwerty123!');
    await registrationPage.clickFieldAndBlur(registrationPage.lastName);

    await expect.soft(registrationPage.isRegisterButtonDisabled()).toBeTruthy();
    await expect.soft(registrationPage.expectFieldToHaveErrorMessage('Passwords do not match')).resolves.not.toThrow();
    await expect.soft(registrationPage.expectFieldToHaveBorderColor(registrationPage.repeatPassword, BORDER_COLOR_INVALID)).resolves.not.toThrow();
  });

  test('Successful registration', async () => {
    const email = generateTestEmail();

    await registrationPage.fillName('AlinaSmith');
    await registrationPage.fillLastName('SAk');
    await registrationPage.fillEmail(email);
    await registrationPage.fillPassword('Qwerty123');
    await registrationPage.fillRepeatPassword('Qwerty123');
    await registrationPage.clickRegister();

    await expect(registrationPage.registerButton).toBeDisabled();
    const alertList = await registrationPage.getAlertList();
    expect(alertList).toContain('Registration complete');
  });
});
