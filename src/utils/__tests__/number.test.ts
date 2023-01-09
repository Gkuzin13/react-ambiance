import { CanvasConfigValue } from '@/constants/canvas';
import { describe, expect, it } from 'vitest';
import { sanitizeAmbientConfigValue } from '@/utils/number';

describe('sanitizeAmbientConfigValue', () => {
  const testConfig: CanvasConfigValue = {
    min: 1,
    max: 10,
    default: 5,
  };

  it('returns default if value is undefined', () => {
    expect(sanitizeAmbientConfigValue(testConfig, undefined)).toEqual(
      testConfig.default,
    );
  });

  it('returns min if value is less than min', () => {
    expect(sanitizeAmbientConfigValue(testConfig, 0)).toEqual(testConfig.min);
  });

  it('returns max if value is more than max', () => {
    expect(sanitizeAmbientConfigValue(testConfig, 20)).toEqual(testConfig.max);
  });

  it('returns correct value', () => {
    expect(sanitizeAmbientConfigValue(testConfig, 5)).toEqual(5);
  });
});
