import type { PropsWithChildren } from 'react';
import type { CanvasConfig } from '@/constants/canvas';
import type { AmbientCanvasProps } from '@/components/AmbientCanvas/types';

export type AmbientImageProps = PropsWithChildren &
  Omit<CanvasConfig, 'frameRate' | 'initialFrameAlpha'>;
