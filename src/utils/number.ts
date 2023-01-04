import { CanvasConfigValue } from '@/constants/canvas';

export const sanitizeAmbientConfigValue = (
  range: CanvasConfigValue,
  value?: number,
) => {
  if (value === undefined || value === null) return range.DEFAULT;
  if (value < range.MIN) return range.MIN;
  if (value > range.MAX) return range.MAX;

  return value;
};
