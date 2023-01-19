import { useLayoutEffect, useRef } from 'react';
import useElementRect from '@/hooks/useElementRect/useElementRect';
import animate from '@/utils/animate/animate';
import { Canvas } from './styles.css';
import type { CanvasConfig } from '@/constants/canvas';
import type { RefObject } from 'react';

export type SourceRef = RefObject<HTMLImageElement | HTMLVideoElement>;

export type AmbientCanvasProps = {
  sourceRef: SourceRef;
} & CanvasConfig;

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

    drawCanvasImageFromSource(
      canvasRef.current,
      sourceRef.current,
      rect.width,
      rect.height,
    );

    const { start, stop } = animate(() => {
      drawCanvasImageFromSource(
        canvasRef.current,
        sourceRef.current,
        rect.width,
        rect.height,
        config.frameRate,
        config.initialFrameAlpha,
      );
    }, config.frameRate ?? 0);

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

  return (
    <Canvas
      ref={canvasRef}
      width={rect.width}
      height={rect.height}
      data-testid="canvas-test"
      borderRadius={config.borderRadius}
      blur={config.blur}
      opacity={config.opacity}
      scale={config.scale}
    />
  );
}

export default AmbientCanvas;
