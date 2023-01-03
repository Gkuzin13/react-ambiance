import { forwardRef } from 'react';
import type { PropsWithChildren, ForwardedRef } from 'react';

const CanvasContainer = forwardRef(function CanvasContainer(
  { children }: PropsWithChildren,
  ref: ForwardedRef<HTMLCanvasElement>,
) {
  return (
    <div className="ambient-container">
      {children}
      <canvas ref={ref} className="canvas"></canvas>
    </div>
  );
});

export default CanvasContainer;
