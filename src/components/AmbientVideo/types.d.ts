import type { PropsWithChildren } from 'react';
import type { CanvasConfig } from '@/constants/canvas';

export interface AmbientVideoProps extends PropsWithChildren {
  config: CanvasConfig;
}
