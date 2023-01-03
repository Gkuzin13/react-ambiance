import { useLayoutEffect } from 'react';
import { CANVAS_CSS_PROP_KEYS } from '../constants/canvas';
import { getCssPropertyKey } from '../utils/string';
import type { AmbientConfigProps } from '../components/types';

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

    canvasEl.style.setProperty(
      getCssPropertyKey(BORDER_RADIUS),
      `${borderRadius}px`,
    );

    canvasEl.style.setProperty(getCssPropertyKey(SCALE), `${scale}`);
    canvasEl.style.setProperty(getCssPropertyKey(BLUR), `${blur}px`);
    canvasEl.style.setProperty(getCssPropertyKey(OPACITY), `${opacity}`);
  }, [scale, borderRadius, blur, opacity, canvasRef]);
}

export default useAmbientConfig;
