import { test, expect, Page } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import generateTestEmail from '../utils/rundomGenerator'
import RegistrationPage from '../pages/RegistrationPage';
import { Message } from '../utils/constants/messages';


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
      { field: registrationPage.name, errorMessage: Message.NAME_REQUIRED },
      { field: registrationPage.lastName, errorMessage: Message.LAST_NAME_REQUIRED },
      { field: registrationPage.email, errorMessage: Message.EMAIL_REQUIRED },
      { field: registrationPage.password, errorMessage: Message.PASSWORD_REQUIRED },
      { field: registrationPage.repeatPassword, errorMessage: Message.REPEAT_PASSWORD_REQUIRED },
    ];

    for (const { field, errorMessage } of testData) {
      await registrationPage.clickFieldAndBlur(field);
      await registrationPage.expectInvalidField(field, errorMessage, BORDER_COLOR_INVALID);
    }
  });

  test('Name field validation', async () => {
    await registrationPage.fillName('A');
    await registrationPage.clickFieldAndBlur(registrationPage.name);
    await registrationPage.expectInvalidField(registrationPage.name, Message.NAME_HAS_TO_BE_FROM_2_TO_20_CHARACTERS_LONG, BORDER_COLOR_INVALID);

    await registrationPage.fillName('A@#');
    await registrationPage.expectInvalidField(registrationPage.name, Message.NAME_IS_INVALID, BORDER_COLOR_INVALID);
  });

  test('Last name field validation', async () => {
    await registrationPage.fillLastName('A');
    await registrationPage.clickFieldAndBlur(registrationPage.lastName);
    await registrationPage.expectInvalidField(registrationPage.lastName, Message.LAST_NAME_HAS_TO_BE_FROM_2_TO_20_CHARACTERS_LONG, BORDER_COLOR_INVALID);

    await registrationPage.fillLastName('A@#');
    await registrationPage.expectInvalidField(registrationPage.lastName, Message.LAST_NAME_IS_INVALID, BORDER_COLOR_INVALID);
  });

  test('Email field validation', async () => {
    await registrationPage.fillEmail('invalid-email');
    await registrationPage.clickFieldAndBlur(registrationPage.password);

    await registrationPage.expectInvalidField(registrationPage.email, Message.EMAIL_IS_INCORRECT, BORDER_COLOR_INVALID);
  });

  test('Password field validation', async () => {
    await registrationPage.fillPassword('1234');
    await registrationPage.clickFieldAndBlur(registrationPage.password);
    await registrationPage.expectInvalidField(registrationPage.password, Message.PASSWORD_HAS_TO_BE_FROM_8_TO_15_CHARACTERS_LONG, BORDER_COLOR_INVALID);

    await registrationPage.fillPassword('12345678');
    await registrationPage.clickFieldAndBlur(registrationPage.repeatPassword);
    await registrationPage.expectInvalidField(registrationPage.password, Message.PASSWORD_HAS_TO_BE_FROM_8_TO_15_CHARACTERS_LONG, BORDER_COLOR_INVALID);
  });

  test('Repeat password field validation', async () => {
    await registrationPage.fillPassword('Qwerty123');
    await registrationPage.fillRepeatPassword('Qwerty123!');
    await registrationPage.clickFieldAndBlur(registrationPage.lastName);

    await registrationPage.expectInvalidField(registrationPage.repeatPassword, Message.PASSWORDS_DO_NOT_MATCH, BORDER_COLOR_INVALID);
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
    expect(alertList).toContain(Message.REGISTRATION_COMPLETE);
  });
});
