import { useLayoutEffect, useRef } from 'react';
import useElementRect from '@/hooks/useElementRect/useElementRect';
import { sanitizeValue } from '@/utils/sanitize-config/sanitize-value';
import animate from '@/utils/animate/animate';
import { canvasConfigValues, canvasCssPropKeys } from '@/constants/canvas';
import { Canvas } from './styles.css';
import type { AmbientCanvasProps } from './types';

function AmbientCanvas({
  sourceRef,
  config,
  watchSourceResize = false,
}: AmbientCanvasProps) {
  const { rect, observe, unobserve } = useElementRect(sourceRef.current);

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
    <Canvas
      ref={canvasRef}
      width={rect.width}
      height={rect.height}
      data-testid="canvas-test"
      borderRadius={sanitizedRadius}
      blur={sanitizedBlur}
      opacity={sanitizedOpacity}
      scale={sanitizedScale}
    />
  );
}

export default AmbientCanvas;
