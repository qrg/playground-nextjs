// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import type { expect } from '@jest/globals';
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module '@jest/globals' {
  type Matchers<R = void> = TestingLibraryMatchers<
    typeof expect.stringContaining,
    R
  >;
}
