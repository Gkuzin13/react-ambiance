import { RefObject, useLayoutEffect } from 'react';
import { CANVAS_CONFIG_VALUES, CANVAS_CSS_PROP_KEYS } from '@/constants/canvas';
import { setCssProperty } from '@/utils/dom';
import { sanitizeAmbientConfigValue } from '@/utils/number';
import type { AmbientConfigProps } from '@/components/types';

interface useConfigProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  config: AmbientConfigProps;
}

function useAmbientConfig({ config, canvasRef }: useConfigProps) {
  const { BORDER_RADIUS, BLUR, SCALE, OPACITY } = CANVAS_CSS_PROP_KEYS;

  const { scale, borderRadius, blur, opacity } = config;

  useLayoutEffect(() => {
    if (!canvasRef?.current) return;

    const sanitizedScale = sanitizeAmbientConfigValue(
      CANVAS_CONFIG_VALUES.SCALE,
      scale,
    );

    const sanitizedBlur = sanitizeAmbientConfigValue(
      CANVAS_CONFIG_VALUES.BLUR,
      blur,
    );

    const sanitizedOpacity = sanitizeAmbientConfigValue(
      CANVAS_CONFIG_VALUES.OPACITY,
      opacity,
    );

    const sanitizedRadius = sanitizeAmbientConfigValue(
      CANVAS_CONFIG_VALUES.BORDER_RADIUS,
      borderRadius,
    );

    const canvasEl = canvasRef.current;

    setCssProperty(canvasEl, SCALE, `${sanitizedScale}`);
    setCssProperty(canvasEl, BLUR, `${sanitizedBlur}px`);
    setCssProperty(canvasEl, OPACITY, `${sanitizedOpacity}`);
    setCssProperty(canvasEl, BORDER_RADIUS, `${sanitizedRadius}px`);
  }, [scale, borderRadius, blur, opacity, canvasRef]);
}

export default useAmbientConfig;
