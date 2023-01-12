import { canvasConfigDefaults, CanvasConfigKey } from '@/constants/canvas';
import { isNumber, isBoolean } from '@/utils/is/is';

type StoryDocs = {
  [K in CanvasConfigKey]?: {
    description: string;
    control?: {
      type: 'boolean' | 'range';
      min?: number;
      max?: number;
      step?: number;
      default: any;
    };
  };
};

const storyDocs: StoryDocs = {
  scale: {
    description: 'Scale of the ambiance',
  },
  blur: {
    description: 'Blur level in px',
  },
  opacity: {
    description: 'Opacity level',
  },
  borderRadius: {
    description: 'Border radius level in px',
  },
  frameRate: {
    description:
      'Controls the frame rate (may affect performace if set to a low value)',
  },
  initialFrameAlpha: {
    description:
      'The initial alpha of each frame (the lower the value the smoother the transition between frames)',
  },
  appear: {
    description: 'Apply a transition on the initial render',
  },
  watchSourceResize: {
    description: 'Watch source resize',
  },
};

export function generateStoryArgTypes(omit?: CanvasConfigKey[]) {
  return Object.entries(canvasConfigDefaults).reduce(
    (acc: any, [key, value]) => {
      if (omit?.includes(key as CanvasConfigKey)) return acc;

      let argType = { ...storyDocs[key as CanvasConfigKey] };

      if (isNumber(value.default)) {
        argType['control'] = { type: 'range', step: 0.01, ...value };
      }

      if (isBoolean(value.default)) {
        argType['control'] = { type: 'boolean', default: value.default };
      }

      acc[key as CanvasConfigKey] = argType;

      return acc;
    },
    {},
  );
}
