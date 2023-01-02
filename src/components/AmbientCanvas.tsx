import { forwardRef } from 'react';
import type { PropsWithChildren } from 'react';

const AmbientCanvas = forwardRef(
  ({ children }: PropsWithChildren, ref: any) => {
    return (
      <div className='ambient-ontainer'>
        {children}
        <canvas ref={ref} className='canvas'></canvas>
      </div>
    );
  }
);

export default AmbientCanvas;
