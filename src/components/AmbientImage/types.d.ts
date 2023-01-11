import type { PropsWithChildren } from 'react';
import type { CanvasConfig } from '@/constants/canvas';
import type { AmbientCanvasProps } from '@/components/AmbientCanvas/types';

type AmbientImageConfigProps = Omit<
  CanvasConfig,
  'frameRate' | 'initialFrameAlpha'
>;
export interface AmbientImageProps
  extends PropsWithChildren,
    AmbientImageConfigProps,
    Omit<AmbientCanvasProps, 'sourceRef'> {
  config?: AmbientImageConfigProps;
}
