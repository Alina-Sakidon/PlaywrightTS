import dotenv from 'dotenv';

dotenv.config();

const testUser = {
    email: process.env.TEST_USER_EMAIL || '',
    password: process.env.TEST_USER_PASSWORD || '',
};

if (!testUser.email || !testUser.password) {
    throw new Error('TEST_USER_EMAIL or TEST_USER_PASSWORD is missing in .env file');
}

export default testUser;
