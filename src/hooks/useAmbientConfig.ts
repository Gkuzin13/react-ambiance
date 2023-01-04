import { useLayoutEffect } from 'react';
import { CANVAS_CONFIG_VALUES, CANVAS_CSS_PROP_KEYS } from '@/constants/canvas';
import { setCssProperty } from '@/utils/string';
import { sanitizeAmbientConfigValue } from '@/utils/number';
import type { AmbientConfigProps } from '@/components/types';

const { BORDER_RADIUS, BLUR, SCALE, OPACITY } = CANVAS_CSS_PROP_KEYS;

function useAmbientConfig({
  scale,
  borderRadius,
  blur,
  opacity,
  canvasRef,
}: AmbientConfigProps) {
  useLayoutEffect(() => {
    if (!canvasRef?.current) return;

    const canvasEl = canvasRef.current;

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

    setCssProperty(canvasEl, SCALE, `${sanitizedScale}`);
    setCssProperty(canvasEl, BLUR, `${sanitizedBlur}px`);
    setCssProperty(canvasEl, OPACITY, `${sanitizedOpacity}`);
    setCssProperty(canvasEl, BORDER_RADIUS, `${sanitizedRadius}px`);
  }, [scale, borderRadius, blur, opacity, canvasRef]);
}

export default useAmbientConfig;
