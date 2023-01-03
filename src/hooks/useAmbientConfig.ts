import { useEffect } from 'react';
import { AmbientConfigProps } from '../components/types';
import { CANVAS_CSS_PROP_KEYS } from '../constants/canvas';
import { getCssPropertyKey } from '../utils/string';

const { BORDER_RADIUS, BLUR, SCALE, OPACITY } = CANVAS_CSS_PROP_KEYS;

function useAmbientConfig({
  scale = 1.05,
  borderRadius = 8,
  blur = 30,
  opacity = 0.5,
  canvasRef,
}: AmbientConfigProps) {
  useEffect(() => {
    if (!canvasRef?.current) return;

    const canvasEl = canvasRef.current;

    canvasEl.style.setProperty(
      getCssPropertyKey(BORDER_RADIUS),
      `${borderRadius}px`
    );

    canvasEl.style.setProperty(getCssPropertyKey(SCALE), `${scale}`);
    canvasEl.style.setProperty(getCssPropertyKey(BLUR), `${blur}px`);
    canvasEl.style.setProperty(getCssPropertyKey(OPACITY), `${opacity}`);
  }, [scale, borderRadius, blur, opacity, canvasRef]);
}

export default useAmbientConfig;
