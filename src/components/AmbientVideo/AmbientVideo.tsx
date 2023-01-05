import { useState } from 'react';
import CanvasContainer from '@/components/AmbientContainer/AmbientContainer';
import AmbientCanvas from '../AmbientCanvas/AmbientCanvas';
import useSource from '@/hooks/useSource';
import { traverseAndPassPropsByElementType } from '@/methods/dom';
import { CANVAS_CONFIG_DEFAULTS } from '@/constants/canvas';
import type { AmbientVideoProps } from './types';

function AmbientVideo({
  config = CANVAS_CONFIG_DEFAULTS(),
  watchSourceResize,
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
          watchSourceResize={watchSourceResize}
          config={{
            ...config,
            refreshRate: playing ? config.refreshRate : undefined,
          }}
        />
      )}
    </CanvasContainer>
  );
}

export default AmbientVideo;
