import type { RefObject } from 'react';
import type { CanvasConfig } from '@/constants/canvas';

export type SourceRef = RefObject<HTMLImageElement | HTMLVideoElement>;

export type AmbientCanvasProps = {
  sourceRef: SourceRef;
} & CanvasConfig;
