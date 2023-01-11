import { CanvasConfigKey, canvasConfigValues } from '@/constants/canvas';

export function generateStoryArgTypes(omit?: CanvasConfigKey[]) {
  return Object.entries(canvasConfigValues).reduce((acc: any, [key, value]) => {
    if (omit?.includes(key as CanvasConfigKey)) return acc;

    const argType = {
      control: { type: 'range', step: 0.01, ...value },
    };

    acc[key as CanvasConfigKey] = argType;

    return acc;
  }, {});
}
