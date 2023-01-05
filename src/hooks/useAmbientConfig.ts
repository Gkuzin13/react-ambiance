import { useLayoutEffect } from 'react';
import { CANVAS_CONFIG_VALUES, CANVAS_CSS_PROP_KEYS } from '@/constants/canvas';
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
      CANVAS_CONFIG_VALUES.scale,
      config.scale,
    );

    const sanitizedBlur = sanitizeAmbientConfigValue(
      CANVAS_CONFIG_VALUES.blur,
      config.blur,
    );

    const sanitizedOpacity = sanitizeAmbientConfigValue(
      CANVAS_CONFIG_VALUES.opacity,
      config.opacity,
    );

    const sanitizedRadius = sanitizeAmbientConfigValue(
      CANVAS_CONFIG_VALUES.borderRadius,
      config.borderRadius,
    );

    const canvasEl = canvasRef.current;

    setCssProperty(canvasEl, CANVAS_CSS_PROP_KEYS.scale, `${sanitizedScale}`);
    setCssProperty(canvasEl, CANVAS_CSS_PROP_KEYS.blur, `${sanitizedBlur}px`);
    setCssProperty(
      canvasEl,
      CANVAS_CSS_PROP_KEYS.opacity,
      `${sanitizedOpacity}`,
    );
    setCssProperty(
      canvasEl,
      CANVAS_CSS_PROP_KEYS.borderRadius,
      `${sanitizedRadius}px`,
    );
  }, [config, canvasRef]);
}

export default useAmbientConfig;
