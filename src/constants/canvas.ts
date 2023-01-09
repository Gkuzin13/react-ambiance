export const canvasCssPropKeys = Object.freeze({
  scale: '--ambient-scale',
  blur: '--ambient-blur',
  opacity: '--ambient-opacity',
  borderRadius: '--ambient-radius',
} as const);

export const canvasConfigValues = Object.freeze({
  scale: {
    min: 1,
    max: 1.5,
    default: 1,
  },
  blur: {
    min: 10,
    max: 100,
    default: 50,
  },
  opacity: {
    min: 0.1,
    max: 1,
    default: 0.5,
  },
  borderRadius: {
    min: 0,
    max: 24,
    default: 16,
  },
  frameRate: {
    min: 1,
    max: 60,
    default: 15,
  },
  fadeDelay: {
    min: 0.075,
    max: 1,
    default: 0.1,
  },
});

export type CanvasConfigKey = keyof typeof canvasConfigValues;

export type CanvasConfig = {
  [K in CanvasConfigKey]?: number;
};

export type CanvasConfigValue =
  typeof canvasConfigValues[keyof typeof canvasConfigValues];

export const canvasDefaultConfigGenerator = (omit?: CanvasConfigKey[]) => {
  return Object.entries(canvasConfigValues).reduce(
    (acc: CanvasConfig, [key, value]) => {
      if (omit?.includes(key as CanvasConfigKey)) return acc;

      acc[key as CanvasConfigKey] = value.default;

      return acc;
    },
    {},
  );
};
