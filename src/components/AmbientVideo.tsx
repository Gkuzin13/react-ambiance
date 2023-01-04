import { useRef, useState } from 'react';
import useAmbientConfig from '@/hooks/useAmbientConfig';
import useCanvas from '@/hooks/useCanvas';
import useInterval from '@/hooks/useInterval';
import CanvasContainer from '@/components/CanvasContainer';
import { traverseAndPassPropsByElementType } from '@/methods/dom';
import { CANVAS_CONFIG_VALUES } from '@/constants/canvas';
import type { AmbientVideoProps } from './types';

const { SCALE, BORDER_RADIUS, BLUR, OPACITY, REFRESH_RATE } =
  CANVAS_CONFIG_VALUES;

function AmbientVideo({
  scale = SCALE.DEFAULT,
  borderRadius = BORDER_RADIUS.DEFAULT,
  blur = BLUR.DEFAULT,
  opacity = OPACITY.DEFAULT,
  refreshRate = REFRESH_RATE.DEFAULT,
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
