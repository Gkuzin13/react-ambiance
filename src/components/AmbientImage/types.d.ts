import type { PropsWithChildren } from 'react';
import type { CanvasConfig } from '@/constants/canvas';
import type { AmbientCanvasProps } from '@/components/AmbientCanvas/types';

export interface AmbientImageProps
  extends PropsWithChildren,
    Omit<AmbientCanvasProps, 'sourceRef'> {
  config?: Omit<CanvasConfig, 'frameRate'>;
}
