import type { RefObject } from 'react';
import type { CanvasConfig } from '@/constants/canvas';

export type AmbientCanvasProps = {
  sourceRef: RefObject<HTMLImageElement | HTMLVideoElement>;
  watchSourceResize?: boolean;
  config: CanvasConfig;
};
