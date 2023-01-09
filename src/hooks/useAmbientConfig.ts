import { useLayoutEffect } from 'react';
import { canvasConfigValues, canvasCssPropKeys } from '@/constants/canvas';
import { setCssProperty } from '@/utils/dom';
import { sanitizeAmbientConfigValue } from '@/utils/number';
import type { CanvasConfig } from '@/constants/canvas';
import type { RefObject } from 'react';
export interface useConfigProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  config: CanvasConfig;
}

function useAmbientConfig({ config, canvasRef }: useConfigProps) {
  useLayoutEffect(() => {
    if (!canvasRef?.current) return;

    const sanitizedScale = sanitizeAmbientConfigValue(
      canvasConfigValues.scale,
      config.scale,
    );

    const sanitizedBlur = sanitizeAmbientConfigValue(
      canvasConfigValues.blur,
      config.blur,
    );

    const sanitizedOpacity = sanitizeAmbientConfigValue(
      canvasConfigValues.opacity,
      config.opacity,
    );

    const sanitizedRadius = sanitizeAmbientConfigValue(
      canvasConfigValues.borderRadius,
      config.borderRadius,
    );

    const canvasEl = canvasRef.current;

    setCssProperty(canvasEl, canvasCssPropKeys.scale, `${sanitizedScale}`);
    setCssProperty(canvasEl, canvasCssPropKeys.blur, `${sanitizedBlur}px`);
    setCssProperty(canvasEl, canvasCssPropKeys.opacity, `${sanitizedOpacity}`);
    setCssProperty(
      canvasEl,
      canvasCssPropKeys.borderRadius,
      `${sanitizedRadius}px`,
    );
  }, [config, canvasRef]);
}

export default useAmbientConfig;
