import { useLayoutEffect, useRef } from 'react';
import useElementRect from '@/hooks/useElementRect';
import animate from '@/methods/animate';
import { canvas, canvasFadeAnim } from './styles.css';
import { canvasConfigValues, canvasCssPropKeys } from '@/constants/canvas';
import { sanitizeValue } from '@/utils/number';
import type { AmbientCanvasProps } from './types';

function AmbientCanvas({
  sourceRef,
  config,
  watchSourceResize = false,
}: AmbientCanvasProps) {
  const { rect, observe, unobserve } = useElementRect(sourceRef);

  const canvasRef = useRef(null);

  useLayoutEffect(() => {
    function drawCanvasImageFromSource(
      canvasElement: HTMLCanvasElement | null,
      sourceElement: HTMLImageElement | HTMLVideoElement | null,
      width: number,
      height: number,
      frameRate?: number,
      initialFrameAlpha?: number,
    ) {
      if (!canvasElement || !sourceElement) return;
      const ctx = canvasElement.getContext('2d', { alpha: false });

      if (!ctx) return;

      if (frameRate) {
        ctx.save();
      }

      if (initialFrameAlpha && frameRate) {
        ctx.globalAlpha = initialFrameAlpha;
      }

      ctx.drawImage(sourceElement, 0, 0, width, height);

      if (frameRate) {
        ctx.restore();
      }
    }

    const sanitizedFrameRate = sanitizeValue(
      canvasConfigValues.frameRate,
      config.frameRate,
    );

    const sanitizedInitialFrameAlpha = sanitizeValue(
      canvasConfigValues.initialFrameAlpha,
      config.initialFrameAlpha,
    );

    drawCanvasImageFromSource(
      canvasRef.current,
      sourceRef.current,
      rect.width,
      rect.height,
    );

    const { start, stop } = animate(
      () => {
        drawCanvasImageFromSource(
          canvasRef.current,
          sourceRef.current,
          rect.width,
          rect.height,
          sanitizedFrameRate,
          sanitizedInitialFrameAlpha,
        );
      },
      sanitizedFrameRate ? sanitizedFrameRate : 0,
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
  }, [
    watchSourceResize,
    config.frameRate,
    config.initialFrameAlpha,
    rect.width,
    rect.height,
    animate,
  ]);

  const sanitizedBlur = sanitizeValue(canvasConfigValues.blur, config.blur);

  const sanitizedRadius = sanitizeValue(
    canvasConfigValues.borderRadius,
    config.borderRadius,
  );

  const sanitizedOpacity = sanitizeValue(
    canvasConfigValues.opacity,
    config.opacity,
  );

  const sanitizedScale = sanitizeValue(canvasConfigValues.scale, config.scale);

  return (
    <canvas
      ref={canvasRef}
      width={rect.width}
      height={rect.height}
      className={`${canvas} ${config.appear && canvasFadeAnim}`}
      style={{
        [`${canvasCssPropKeys.blur}`]: `${sanitizedBlur}px`,
        [`${canvasCssPropKeys.borderRadius}`]: `${sanitizedRadius}px`,
        [`${canvasCssPropKeys.opacity}`]: sanitizedOpacity,
        [`${canvasCssPropKeys.scale}`]: sanitizedScale,
      }}
    />
  );
}

export default AmbientCanvas;
