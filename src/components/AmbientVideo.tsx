import { useRef, useState } from 'react';
import useAmbientConfig from '../hooks/useAmbientConfig';
import useCanvas from '../hooks/useCanvas';
import useInterval from '../hooks/useInterval';
import CanvasContainer from './CanvasContainer';
import { drawCanvasFromMedia } from '../methods/canvas';
import { traverseAndPassPropsByElementType } from '../methods/dom';
import type { AmbientVideoProps } from './types';

function AmbientVideo({
  scale = 1.05,
  borderRadius = 8,
  blur = 30,
  opacity = 0.5,
  refreshRate = 150,
  children,
}: AmbientVideoProps) {
  const [playing, setPlaying] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originRef = useRef<HTMLImageElement | HTMLVideoElement>(null);

  const { setMediaLoaded } = useCanvas({
    originRef,
    canvasRef,
    watchOriginResize: true,
  });

  useAmbientConfig({ scale, blur, opacity, borderRadius, canvasRef });

  useInterval(
    () =>
      drawCanvasFromMedia(
        canvasRef.current,
        originRef.current,
        originRef.current?.getBoundingClientRect().width || 0,
        originRef.current?.getBoundingClientRect().height || 0
      ),
    playing ? refreshRate : null
  );

  const videoElementProps = {
    onPlaying: () => {
      setPlaying(true), setMediaLoaded(true);
    },
    onPause: () => setPlaying(false),
    ref: originRef,
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
