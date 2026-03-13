// src/core/fixtures/test.fixture.ts
import { test as pageTest } from './page.fixture';
import { apiFixtures, type ApiFixtures } from './api.fixture';

export const test = pageTest.extend<ApiFixtures>(apiFixtures);
export { expect } from '@playwright/test';
