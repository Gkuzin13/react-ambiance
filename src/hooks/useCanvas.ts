import { RefObject, useCallback, useLayoutEffect } from 'react';
import useElementRect from '@/hooks/useElementRect';

export type useCanvasArgs = {
  sourceRef: RefObject<HTMLImageElement | HTMLVideoElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  watchSourceResize?: boolean;
};

function useCanvas({ sourceRef, canvasRef, watchSourceResize }: useCanvasArgs) {
  const drawCanvasImageFromSource = useCallback(
    (
      canvasElement: HTMLCanvasElement | null,
      sourceElement: HTMLImageElement | HTMLVideoElement | null,
      width: number,
      height: number,
    ) => {
      if (!canvasElement || !sourceElement) return;

      const ctx = canvasElement.getContext('2d');
      ctx?.drawImage(sourceElement, 0, 0, width, height);
    },
    [],
  );

  const { rect, observe, stop } = useElementRect(sourceRef);

  useLayoutEffect(() => {
    if (!sourceRef?.current || !canvasRef?.current) return;

    if (watchSourceResize) {
      observe();
    }

    const canvasElement = canvasRef.current;
    const sourceElement = sourceRef.current;

    const { height, width } = rect;

    drawCanvasImageFromSource(canvasElement, sourceElement, width, height);

    return () => {
      if (watchSourceResize) {
        stop();
      }
    };
  }, [canvasRef.current, sourceRef.current, rect.width, rect.height]);

  return {
    drawCanvasImageFromSource,
    size: {
      width: rect.width,
      height: rect.height,
    },
  };
}

export default useCanvas;
