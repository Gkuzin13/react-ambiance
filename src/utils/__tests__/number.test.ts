import { CanvasConfigValue } from '@/constants/canvas';
import { describe, expect, it } from 'vitest';
import { sanitizeValue } from '@/utils/number';

describe('sanitizeValue', () => {
  const testConfig: CanvasConfigValue = {
    min: 1,
    max: 10,
    default: 5,
  };

  it('returns default if value is undefined', () => {
    expect(sanitizeValue(testConfig, undefined)).toEqual(testConfig.default);
  });

  it('returns min if value is less than min', () => {
    expect(sanitizeValue(testConfig, 0)).toEqual(testConfig.min);
  });

  it('returns max if value is more than max', () => {
    expect(sanitizeValue(testConfig, 20)).toEqual(testConfig.max);
  });

  it('returns correct value', () => {
    expect(sanitizeValue(testConfig, 5)).toEqual(5);
  });
});
