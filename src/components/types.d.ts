import { PropsWithChildren } from "react";

export interface Props extends PropsWithChildren {
  scale?: number;
  borderRadius?: number;
  blur?: number;
}

export interface AmbientVideoProps extends Props {
  refreshRate?: number;
}