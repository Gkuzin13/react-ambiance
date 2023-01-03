import { forwardRef } from 'react';
import type { PropsWithChildren } from 'react';

const CanvasContainer = forwardRef(
  ({ children }: PropsWithChildren, ref: any) => {
    return (
      <div className='ambient-container'>
        {children}
        <canvas ref={ref} className='canvas'></canvas>
      </div>
    );
  }
);

export default CanvasContainer;
