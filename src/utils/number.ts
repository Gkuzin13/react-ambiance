import { CanvasConfigValue } from '@/constants/canvas';

export const sanitizeAmbientConfigValue = (
  range: CanvasConfigValue,
  value?: number,
) => {
  if (value === undefined || value === null) return range.default;
  if (value < range.min) return range.min;
  if (value > range.max) return range.max;

  return value;
};
