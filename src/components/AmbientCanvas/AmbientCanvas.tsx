import { useCallback, useLayoutEffect, useRef } from 'react';
import useAmbientConfig from '@/hooks/useAmbientConfig';
import useElementRect from '@/hooks/useElementRect';
import useInterval from '@/hooks/useInterval';
import type { AmbientCanvasProps } from './types';

function AmbientCanvas({
  sourceRef,
  watchSourceResize,
  config,
}: AmbientCanvasProps) {
  const canvasRef = useRef(null);

  const { rect, observe, stop } = useElementRect(sourceRef);

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

  useInterval(
    () =>
      drawCanvasImageFromSource(
        canvasRef.current,
        sourceRef.current,
        rect.width,
        rect.height,
      ),
    config.refreshRate ? config.refreshRate : null,
  );

  useLayoutEffect(() => {
    if (!sourceRef?.current || !canvasRef?.current) return;

    if (watchSourceResize) {
      observe();
    }

    if (!config?.refreshRate) {
      drawCanvasImageFromSource(
        canvasRef.current,
        sourceRef.current,
        rect.width,
        rect.height,
      );
    }

    return () => {
      if (watchSourceResize) {
        stop();
      }
    };
  }, [canvasRef.current, sourceRef.current, rect.width, rect.height]);

  useAmbientConfig({ config, canvasRef });

  return (
    <canvas
      ref={canvasRef}
      width={rect.width}
      height={rect.height}
      className="ambient-canvas"
    />
  );
}

export default AmbientCanvas;