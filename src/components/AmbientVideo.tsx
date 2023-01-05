import { useState } from 'react';
import CanvasContainer from '@/components/AmbientContainer';
import useSource from '@/hooks/useSource';
import AmbientCanvas from './AmbientCanvas';
import { traverseAndPassPropsByElementType } from '@/methods/dom';
import { CANVAS_CONFIG_VALUES } from '@/constants/canvas';
import type { AmbientVideoProps } from './types';

const { SCALE, BORDER_RADIUS, BLUR, OPACITY, REFRESH_RATE } =
  CANVAS_CONFIG_VALUES;

function AmbientVideo({
  config: {
    scale = SCALE.DEFAULT,
    borderRadius = BORDER_RADIUS.DEFAULT,
    blur = BLUR.DEFAULT,
    opacity = OPACITY.DEFAULT,
    refreshRate = REFRESH_RATE.DEFAULT,
  },
  children,
}: AmbientVideoProps) {
  const [playing, setPlaying] = useState(false);

  const { sourceRef, sourceReady, setSourceReady } = useSource();

  const videoElementProps = {
    onPlaying: () => {
      setPlaying(true), setSourceReady(true);
    },
    onPause: () => setPlaying(false),
    ref: sourceRef,
  };

  return (
    <CanvasContainer>
      {traverseAndPassPropsByElementType(children, 'video', {
        ...videoElementProps,
      })}
      {sourceReady && (
        <AmbientCanvas
          sourceRef={sourceRef}
          config={{
            scale,
            blur,
            borderRadius,
            opacity,
            refreshRate: playing ? refreshRate : undefined,
          }}
        />
      )}
    </CanvasContainer>
  );
}

export default AmbientVideo;
