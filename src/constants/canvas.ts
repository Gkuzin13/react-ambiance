type CanvasConfigKeys =
  | 'SCALE'
  | 'BLUR'
  | 'OPACITY'
  | 'BORDER_RADIUS'
  | 'REFRESH_RATE';

type CanvasConfig = {
  [K in CanvasConfigKeys]: CanvasConfigValue;
};

type CanvasConfigValue = {
  readonly MIN: number;
  readonly MAX: number;
  readonly DEFAULT: number;
};

export const CANVAS_CSS_PROP_KEYS = Object.freeze({
  SCALE: 'canvas-scale',
  BLUR: 'canvas-blur',
  OPACITY: 'canvas-opacity',
  BORDER_RADIUS: 'canvas-radius',
} as const);

export const CANVAS_CONFIG_VALUES: CanvasConfig = Object.freeze({
  SCALE: {
    MIN: 1,
    MAX: 1.1,
    DEFAULT: 1,
  },
  BLUR: {
    MIN: 10,
    MAX: 50,
    DEFAULT: 30,
  },
  OPACITY: {
    MIN: 0.5,
    MAX: 1,
    DEFAULT: 0.5,
  },
  BORDER_RADIUS: {
    MIN: 0,
    MAX: 24,
    DEFAULT: 16,
  },
  REFRESH_RATE: {
    MIN: 24,
    MAX: 200,
    DEFAULT: 150,
  },
});
