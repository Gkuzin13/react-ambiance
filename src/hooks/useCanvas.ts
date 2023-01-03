import { RefObject, useCallback, useLayoutEffect, useState } from 'react';
import useElementRect from './useElementRect';

export type useCanvasArgs = {
  sourceRef: RefObject<HTMLImageElement | HTMLVideoElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  watchSourceResize?: boolean;
};

function useCanvas({ sourceRef, canvasRef, watchSourceResize }: useCanvasArgs) {
  const [sourceReady, setSourceReady] = useState(false);

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

  const { rect, observe, stop } = useElementRect(sourceRef, [sourceReady]);

  useLayoutEffect(() => {
    if (!sourceReady || !sourceRef?.current || !canvasRef?.current) return;

    function setCanvasSize(
      canvasElement: HTMLCanvasElement,
      height: number,
      width: number,
    ) {
      canvasElement.height = height;
      canvasElement.width = width;
    }

    if (watchSourceResize) {
      observe();
    }

    const canvasElement = canvasRef.current;
    const sourceElement = sourceRef.current;

    const { height, width } = rect;

    setCanvasSize(canvasElement, height, width);

    drawCanvasImageFromSource(canvasElement, sourceElement, width, height);

    return () => {
      if (watchSourceResize) {
        stop();
      }
    };
  }, [
    sourceReady,
    canvasRef.current,
    sourceRef.current,
    rect.width,
    rect.height,
  ]);

  return {
    setSourceReady,
    drawCanvasImageFromSource,
    size: {
      width: rect.width,
      height: rect.height,
    },
  };
}

export default useCanvas;
