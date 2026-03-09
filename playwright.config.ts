import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.RETRIESCI ? parseInt(process.env.RETRIESCI) : parseInt(process.env.RETRIESLOCAL || '0'),
  workers: process.env.WORKERSCI ? parseInt(process.env.WORKERSCI) : parseInt(process.env.WORKERSLOCAL || '4'),
  reporter: [
    ['list'],
    ['html']
  ],
  use: {
    baseURL: process.env.BASE_URL_WEB,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.BASE_URL_WEB,
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: process.env.BASE_URL_WEB,
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        baseURL: process.env.BASE_URL_WEB,
      },
    },
  ],
}); 