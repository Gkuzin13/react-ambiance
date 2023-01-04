import { CanvasConfigValue } from '@/constants/canvas';
import { describe, expect, it } from 'vitest';
import { sanitizeAmbientConfigValue } from '../number';

describe('sanitizeAmbientConfigValue', () => {
  const TEST_CONFIG: CanvasConfigValue = {
    MIN: 1,
    MAX: 10,
    DEFAULT: 5,
  };

  it('returns default if value is undefined', () => {
    expect(sanitizeAmbientConfigValue(TEST_CONFIG, undefined)).toEqual(
      TEST_CONFIG.DEFAULT,
    );
  });

  it('returns min if value is less than min', () => {
    expect(sanitizeAmbientConfigValue(TEST_CONFIG, 0)).toEqual(TEST_CONFIG.MIN);
  });

  it('returns max if value is more than max', () => {
    expect(sanitizeAmbientConfigValue(TEST_CONFIG, 20)).toEqual(
      TEST_CONFIG.MAX,
    );
  });

  it('returns correct value', () => {
    expect(sanitizeAmbientConfigValue(TEST_CONFIG, 5)).toEqual(5);
  });
});
