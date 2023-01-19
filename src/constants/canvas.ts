export type CanvasConfig = {
  scale?: number;
  blur?: number;
  opacity?: number;
  borderRadius?: number;
  frameRate?: number;
  initialFrameAlpha?: number;
  appear?: boolean;
  watchSourceResize?: boolean;
};

export type CanvasConfigKey = keyof CanvasConfig;

export type CanvasConfigDefaultValue = {
  min?: number;
  max?: number;
  default: boolean | number;
};

export type CanvasConfigDefaults = {
  [K in CanvasConfigKey]: CanvasConfigDefaultValue;
};

export const canvasConfigDefaults: CanvasConfigDefaults = Object.freeze({
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
    max: 500,
    default: 16,
  },
  frameRate: {
    min: 0,
    max: 60,
    default: 15,
  },
  initialFrameAlpha: {
    min: 0.05,
    max: 1,
    default: 0.1,
  },
  appear: {
    default: true,
  },
  watchSourceResize: {
    default: false,
  },
});

export const canvasDefaultConfigGenerator = (omit?: CanvasConfigKey[]) => {
  return Object.entries(canvasConfigDefaults).reduce(
    (acc: CanvasConfig, [key, value]) => {
      if (omit?.includes(key as CanvasConfigKey)) return acc;

      acc[key as CanvasConfigKey] = value.default as any;

      return acc;
    },
    {},
  );
};
