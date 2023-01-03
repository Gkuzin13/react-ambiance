import { useRef, useState } from 'react';
import useAmbientConfig from '../hooks/useAmbientConfig';
import useCanvas from '../hooks/useCanvas';
import useInterval from '../hooks/useInterval';
import CanvasContainer from './CanvasContainer';
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
  const sourceRef = useRef<HTMLImageElement | HTMLVideoElement>(null);

  const { size, setSourceReady, drawCanvasImageFromSource } = useCanvas({
    sourceRef,
    canvasRef,
  });

  useAmbientConfig({ scale, blur, opacity, borderRadius, canvasRef });

  useInterval(
    () =>
      drawCanvasImageFromSource(
        canvasRef.current,
        sourceRef.current,
        size.width,
        size.height,
      ),
    playing ? refreshRate : null,
  );

  const videoElementProps = {
    onPlaying: () => {
      setPlaying(true), setSourceReady(true);
    },
    onPause: () => setPlaying(false),
    ref: sourceRef,
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
