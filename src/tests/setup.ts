import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

const ResizeObserverMock = vi.fn(() => ({
  observe: (target: Element) => vi.fn(),
  unobserve: vi.fn(),
  disconnect: (target: Element) => vi.fn(),
}));

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

afterEach(() => {
  cleanup();
});
