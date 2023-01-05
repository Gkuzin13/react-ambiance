import type { PropsWithChildren } from 'react';
import type { CanvasConfig } from '@/constants/canvas';

export interface AmbientImageProps
  extends PropsWithChildren,
    Omit<CanvasConfig, 'refreshRate'> {
  config: CanvasConfig;
}
