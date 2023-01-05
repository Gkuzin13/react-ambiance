export type CanvasConfigKey =
  | 'scale'
  | 'blur'
  | 'opacity'
  | 'borderRadius'
  | 'refreshRate';

export type CanvasConfig = {
  [K in CanvasConfigKey]?: number;
};

export type CanvasCssPropKey = {
  readonly [K in Exclude<CanvasConfigKey, 'refreshRate'>]: string;
};

export type CanvasConfigValue = {
  min: number;
  max: number;
  default: number;
};

export type CanvasConfigValues = {
  [K in CanvasConfigKey]: CanvasConfigValue;
};

export type CanvasConfigDefaults = {
  [K in CanvasConfigKey]?: number;
};

export const CANVAS_CSS_PROP_KEYS: CanvasCssPropKey = Object.freeze({
  scale: 'canvas-scale',
  blur: 'canvas-blur',
  opacity: 'canvas-opacity',
  borderRadius: 'canvas-radius',
});

export const CANVAS_CONFIG_VALUES: CanvasConfigValues = Object.freeze({
  scale: {
    min: 1,
    max: 1.1,
    default: 1,
  },
  blur: {
    min: 10,
    max: 50,
    default: 30,
  },
  opacity: {
    min: 0.5,
    max: 1,
    default: 0.5,
  },
  borderRadius: {
    min: 0,
    max: 24,
    default: 16,
  },
  refreshRate: {
    min: 24,
    max: 200,
    default: 150,
  },
});

export const CANVAS_CONFIG_DEFAULTS = (omit?: CanvasConfigKey[]) => {
  return Object.entries(CANVAS_CONFIG_VALUES).reduce(
    (acc: CanvasConfigDefaults, [key, value]) => {
      if (omit?.includes(key as CanvasConfigKey)) return acc;

      acc[key as keyof CanvasConfig] = value.default;

      return acc;
    },
    {},
  );
};
