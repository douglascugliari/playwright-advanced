// src/core/fixtures/test.fixture.ts
import { test as pageTest } from './page.fixture';
import { apiFixtures } from './api.fixture';

export const test = pageTest.extend(apiFixtures);
export { expect } from '@playwright/test';
