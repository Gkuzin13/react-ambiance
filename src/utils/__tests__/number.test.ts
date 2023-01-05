import { CanvasConfigValue } from '@/constants/canvas';
import { describe, expect, it } from 'vitest';
import { sanitizeAmbientConfigValue } from '@/utils/number';

describe('sanitizeAmbientConfigValue', () => {
  const TEST_CONFIG: CanvasConfigValue = {
    min: 1,
    max: 10,
    default: 5,
  };

  it('returns default if value is undefined', () => {
    expect(sanitizeAmbientConfigValue(TEST_CONFIG, undefined)).toEqual(
      TEST_CONFIG.default,
    );
  });

  it('returns min if value is less than min', () => {
    expect(sanitizeAmbientConfigValue(TEST_CONFIG, 0)).toEqual(TEST_CONFIG.min);
  });

  it('returns max if value is more than max', () => {
    expect(sanitizeAmbientConfigValue(TEST_CONFIG, 20)).toEqual(
      TEST_CONFIG.max,
    );
  });

  it('returns correct value', () => {
    expect(sanitizeAmbientConfigValue(TEST_CONFIG, 5)).toEqual(5);
  });
});
