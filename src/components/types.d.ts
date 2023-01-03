import { PropsWithChildren, RefObject } from 'react';

export interface AmbientConfigProps {
  scale?: number;
  borderRadius?: number;
  blur?: number;
  opacity?: number;
  refreshRate?: number;
  canvasRef?: RefObject<HTMLCanvasElement>;
}

export interface AmbientVideoProps
  extends AmbientConfigProps,
    PropsWithChildren {}

export interface AmbientImageProps
  extends AmbientConfigProps,
    PropsWithChildren,
    Omit<AmbientConfigProps, 'refreshRate'> {}
