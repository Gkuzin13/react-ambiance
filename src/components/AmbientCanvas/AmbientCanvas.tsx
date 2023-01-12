import { useLayoutEffect, useRef } from 'react';
import useElementRect from '@/hooks/useElementRect/useElementRect';
import animate from '@/utils/animate/animate';
import { sanitizeValue } from '@/utils/sanitize-config/sanitize-value';
import { canvasConfigDefaults } from '@/constants/canvas';
import { Canvas } from './styles.css';
import type { AmbientCanvasProps } from './types';

function AmbientCanvas({ sourceRef, ...config }: AmbientCanvasProps) {
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
      canvasConfigDefaults.frameRate,
      config.frameRate,
    );

    const sanitizedInitialFrameAlpha = sanitizeValue(
      canvasConfigDefaults.initialFrameAlpha,
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

    if (config.watchSourceResize) {
      observe();
    }

    if (!config.frameRate) {
      stop();
    } else {
      start();
    }

    return () => {
      stop();

      if (config.watchSourceResize) {
        unobserve();
      }
    };
  }, [
    config.watchSourceResize,
    config.frameRate,
    config.initialFrameAlpha,
    rect.width,
    rect.height,
    animate,
  ]);

  const sanitizedBlur = sanitizeValue(canvasConfigDefaults.blur, config.blur);

  const sanitizedRadius = sanitizeValue(
    canvasConfigDefaults.borderRadius,
    config.borderRadius,
  );

  const sanitizedOpacity = sanitizeValue(
    canvasConfigDefaults.opacity,
    config.opacity,
  );

  const sanitizedScale = sanitizeValue(
    canvasConfigDefaults.scale,
    config.scale,
  );

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
