import { useRef } from 'react';
import { traverseAndPassPropsByElementType } from '@/methods/dom';
import CanvasContainer from '@/components/CanvasContainer';
import useAmbientConfig from '@/hooks/useAmbientConfig';
import useCanvas from '@/hooks/useCanvas';
import { CANVAS_CONFIG_VALUES } from '@/constants/canvas';
import type { AmbientImageProps } from './types';

const { SCALE, BORDER_RADIUS, BLUR, OPACITY } = CANVAS_CONFIG_VALUES;

function AmbientImage({
  scale = SCALE.DEFAULT,
  borderRadius = BORDER_RADIUS.DEFAULT,
  blur = BLUR.DEFAULT,
  opacity = OPACITY.DEFAULT,
  children,
}: AmbientImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sourceRef = useRef<HTMLImageElement | HTMLVideoElement>(null);

  const { setSourceReady } = useCanvas({
    sourceRef,
    canvasRef,
    watchSourceResize: true,
  });

  useAmbientConfig({ scale, borderRadius, blur, opacity, canvasRef });

  const imgElementProps = {
    onLoad: () => setSourceReady(true),
    ref: sourceRef,
  };

  return (
    <CanvasContainer ref={canvasRef}>
      {traverseAndPassPropsByElementType(children, 'img', {
        ...imgElementProps,
      })}
    </CanvasContainer>
  );
}

export default AmbientImage;
