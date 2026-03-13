import * as dotenv from 'dotenv';

dotenv.config();

export const env = {
    baseUrl: process.env.BASE_URL_WEB,
    apiUrl: process.env.BASE_URL_API,
    browser: process.env.BROWSER,
    workersLocal: process.env.WORKERSLOCAL,
    retriesLocal: process.env.RETRIESLOCAL,
    workersCI: process.env.WORKERSCI,
    retriesCI: process.env.RETRIESCI
};