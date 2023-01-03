import { RefObject, useLayoutEffect, useState } from 'react';
import { drawCanvasFromMedia } from '../methods/canvas';
import useElementRect from './useElementRect';

export type useCanvasArgs = {
  originRef: RefObject<HTMLImageElement | HTMLVideoElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  watchOriginResize?: boolean;
};

function useCanvas({ originRef, canvasRef, watchOriginResize }: useCanvasArgs) {
  const [mediaLoaded, setMediaLoaded] = useState(false);

  const { rect, observe, stop } = useElementRect(originRef);

  useLayoutEffect(() => {
    if (!mediaLoaded) return;
    if (!originRef?.current || !canvasRef?.current) return;

    if (watchOriginResize) {
      observe();
    }

    canvasRef.current.height = rect.height;
    canvasRef.current.width = rect.width;

    drawCanvasFromMedia(
      canvasRef.current,
      originRef.current,
      rect.width,
      rect.height
    );

    return () => {
      if (watchOriginResize) {
        stop();
      }
    };
  }, [mediaLoaded, canvasRef?.current, originRef?.current]);

  return { setMediaLoaded, mediaLoaded };
}

export default useCanvas;
