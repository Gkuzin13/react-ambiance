import { CanvasConfigKey, canvasConfigValues } from '@/constants/canvas';

type StoryDocs = {
  [K in CanvasConfigKey]?: {
    description: string;
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
};

export function generateStoryArgTypes(omit?: CanvasConfigKey[]) {
  return Object.entries(canvasConfigValues).reduce((acc: any, [key, value]) => {
    if (omit?.includes(key as CanvasConfigKey)) return acc;

    const argType = {
      control: { type: 'range', step: 0.01, ...value },
      ...storyDocs[key as CanvasConfigKey],
    };

    acc[key as CanvasConfigKey] = argType;

    return acc;
  }, {});
}
