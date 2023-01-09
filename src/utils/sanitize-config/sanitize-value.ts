import { CanvasConfigValue } from '@/constants/canvas';

export const sanitizeValue = (config: CanvasConfigValue, value?: number) => {
  if (value === undefined || value === null) return config.default;
  if (value < config.min) return config.min;
  if (value > config.max) return config.max;

  return value;
};
