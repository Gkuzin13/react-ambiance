import type { PropsWithChildren } from 'react';

function CanvasContainer({ children }: PropsWithChildren) {
  return <div className="ambient-container">{children}</div>;
}

export default CanvasContainer;
