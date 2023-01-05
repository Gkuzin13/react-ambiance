import { PropsWithChildren } from 'react';

export interface AmbientConfigProps {
  scale?: number;
  borderRadius?: number;
  blur?: number;
  opacity?: number;
  refreshRate?: number;
}

export interface AmbientVideoProps extends PropsWithChildren {
  config: AmbientConfigProps;
}

export interface AmbientImageProps
  extends PropsWithChildren,
    Omit<AmbientConfigProps, 'refreshRate'> {
  config: AmbientConfigProps;
}
