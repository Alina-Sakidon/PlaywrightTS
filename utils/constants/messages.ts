
export enum Message {
    //registration form
    NAME_REQUIRED = 'Name required',
    LAST_NAME_REQUIRED = 'Last name required',
    EMAIL_REQUIRED = 'Email required',
    PASSWORD_REQUIRED = 'Password required',
    REPEAT_PASSWORD_REQUIRED = 'Re-enter password required',
    NAME_HAS_TO_BE_FROM_2_TO_20_CHARACTERS_LONG = 'Name has to be from 2 to 20 characters long',
    NAME_IS_INVALID = 'Name is invalid',
    LAST_NAME_IS_INVALID = 'Last name is invalid',
    LAST_NAME_HAS_TO_BE_FROM_2_TO_20_CHARACTERS_LONG = 'Last name has to be from 2 to 20 characters long',
    EMAIL_IS_INCORRECT = 'Email is incorrect',
    PASSWORD_HAS_TO_BE_FROM_8_TO_15_CHARACTERS_LONG = 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
    PASSWORDS_DO_NOT_MATCH = 'Passwords do not match',
    REGISTRATION_COMPLETE = 'Registration complete',

    //car
    FAILED_TO_CREATE_CAR = 'Failed to create car'
}
