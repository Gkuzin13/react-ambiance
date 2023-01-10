import { vi } from 'vitest';
import animate from './animate';

test.skip('callback is called with the frequency', () => {
  const callback = vi.fn();

  const { start, stop } = animate(callback, 10);

  start();
});
