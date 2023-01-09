import type { PropsWithChildren } from 'react';
import type { AmbientCanvasProps } from '../AmbientCanvas/types';
export interface AmbientVideoProps
  extends PropsWithChildren,
    Omit<AmbientCanvasProps, 'sourceRef'> {
  config?: Omit<CanvasConfig, 'appear'>;
}
