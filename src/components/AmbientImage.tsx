import { useLayoutEffect, useRef, useState } from 'react';
import { drawCanvasFromMedia } from '../methods/canvas';
import { getCssPropertyKey } from '../utils/string';
import { traverseAndPassPropsByElementType } from '../methods/dom';
import CanvasContainer from './CanvasContainer';
import type { Props } from './types';

function AmbientImage({
  scale = 1.05,
  borderRadius = 8,
  blur = 30,
  children,
}: Props) {
  const [mediaLoaded, setMediaLoaded] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);

  useLayoutEffect(() => {
    if (!mediaLoaded) return;
    if (!mediaRef.current || !canvasRef.current) return;

    const { width, height } = mediaRef.current.getBoundingClientRect();

    canvasRef.current.height = height;
    canvasRef.current.width = width;

    drawCanvasFromMedia(canvasRef.current, mediaRef.current, width, height);
  }, [mediaLoaded, canvasRef.current, mediaRef.current]);

  canvasRef.current?.style.setProperty(
    getCssPropertyKey('canvas-radius'),
    `${borderRadius}px`
  );
  canvasRef.current?.style.setProperty(
    getCssPropertyKey('canvas-scale'),
    `${scale}`
  );
  canvasRef.current?.style.setProperty(
    getCssPropertyKey('canvas-blur'),
    `${blur}px`
  );

  const imgElementProps = {
    onLoad: () => setMediaLoaded(true),
    ref: mediaRef,
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
