import { useLayoutEffect, useRef } from 'react';
import useAmbientConfig from '@/hooks/useAmbientConfig';
import useElementRect from '@/hooks/useElementRect';
import animate from '@/methods/animate';
import type { AmbientCanvasProps } from './types';

function AmbientCanvas({
  sourceRef,
  watchSourceResize,
  config,
}: AmbientCanvasProps) {
  const { rect, observe, unobserve } = useElementRect(sourceRef);

  const canvasRef = useRef(null);

  useLayoutEffect(() => {
    function drawCanvasImageFromSource(
      canvasElement: HTMLCanvasElement | null,
      sourceElement: HTMLImageElement | HTMLVideoElement | null,
      width: number,
      height: number,
    ) {
      if (!canvasElement || !sourceElement) return;
      const ctx = canvasElement.getContext('2d', { alpha: false });

      if (!ctx) return;

      if (config.frameRate) {
        ctx.save();
      }

      if (config.fadeDelay && config.fadeDelay < 1) {
        ctx.globalAlpha = config.fadeDelay;
      }

      ctx.drawImage(sourceElement, 0, 0, width, height);
      console.log('drawing');
      if (config.frameRate) {
        ctx.restore();
      }
    }

    const { start, stop } = animate(
      () => {
        drawCanvasImageFromSource(
          canvasRef.current,
          sourceRef.current,
          rect.width,
          rect.height,
        );
      },
      config.frameRate ? config.frameRate : 0,
    );

    drawCanvasImageFromSource(
      canvasRef.current,
      sourceRef.current,
      rect.width,
      rect.height,
    );

    if (watchSourceResize) {
      observe();
    }

    if (!config.frameRate) {
      stop();
    } else {
      start();
    }

    return () => {
      stop();

      if (watchSourceResize) {
        unobserve();
      }
    };
  }, [watchSourceResize, config, rect.width, rect.height, animate]);

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
