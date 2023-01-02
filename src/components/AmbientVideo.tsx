import { useLayoutEffect, useRef, useState } from 'react';
import useInterval from '../hooks/useInterval';
import { drawCanvasFromMedia } from '../methods/canvas';
import { traverseAndPassPropsByElementType } from '../methods/dom';
import { getCssPropertyKey } from '../utils/string';
import CanvasContainer from './CanvasContainer';
import type { AmbientVideoProps } from './types';

function AmbientVideo({
  scale = 1.05,
  borderRadius = 8,
  blur = 30,
  refreshRate = 150,
  children,
}: AmbientVideoProps) {
  const [playing, setPlaying] = useState(false);
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

  useInterval(
    () =>
      drawCanvasFromMedia(
        canvasRef.current,
        mediaRef.current,
        mediaRef.current?.getBoundingClientRect().width || 0,
        mediaRef.current?.getBoundingClientRect().height || 0
      ),
    playing ? refreshRate : null
  );

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

  const videoElementProps = {
    onPlaying: () => {
      setPlaying(true), setMediaLoaded(true);
    },
    onPause: () => setPlaying(false),
    ref: mediaRef,
  };

  return (
    <CanvasContainer ref={canvasRef}>
      {traverseAndPassPropsByElementType(children, 'video', {
        ...videoElementProps,
      })}
    </CanvasContainer>
  );
}

export default AmbientVideo;
