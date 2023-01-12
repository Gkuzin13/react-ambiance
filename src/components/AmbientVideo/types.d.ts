import type { CanvasConfig } from '@/constants/canvas';
import type { PropsWithChildren } from 'react';

export type AmbientVideoProps = PropsWithChildren &
  Omit<CanvasConfig, 'appear'>;
