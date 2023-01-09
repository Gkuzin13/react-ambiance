import { container } from './styes.css';
import type { PropsWithChildren } from 'react';

function CanvasContainer({ children }: PropsWithChildren) {
  return <div className={container}>{children}</div>;
}

export default CanvasContainer;
