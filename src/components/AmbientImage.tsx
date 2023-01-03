import { useRef } from 'react';
import { traverseAndPassPropsByElementType } from '../methods/dom';
import CanvasContainer from './CanvasContainer';
import useAmbientConfig from '../hooks/useAmbientConfig';
import useCanvas from '../hooks/useCanvas';
import type { AmbientImageProps } from './types';
import useElementRect from '../hooks/useElementRect';

function AmbientImage({
  scale = 1.05,
  borderRadius = 8,
  blur = 30,
  opacity = 0.5,
  children,
}: AmbientImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originRef = useRef<HTMLImageElement | HTMLVideoElement>(null);

  const { setMediaLoaded } = useCanvas({ originRef, canvasRef });

  useAmbientConfig({ scale, borderRadius, blur, opacity, canvasRef });

  const imgElementProps = {
    onLoad: () => setMediaLoaded(true),
    ref: originRef,
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
