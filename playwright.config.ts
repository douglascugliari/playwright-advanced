import { defineConfig, devices } from '@playwright/test';
import { env } from './config/env';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: env.retriesCI ? parseInt(env.retriesCI) : parseInt(env.retriesLocal),
  workers: env.workersCI ? parseInt(env.workersCI) : parseInt(env.workersLocal),
  reporter: [
    ['list'],
    ['html']
  ],
  use: {
    baseURL: env.baseUrl,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    storageState: 'storageState.json'
  },

  globalSetup: require.resolve('./src/utils/globalSetup'),

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: env.baseUrl
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: env.baseUrl
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        baseURL: env.baseUrl
      },
    },
  ],
}); 