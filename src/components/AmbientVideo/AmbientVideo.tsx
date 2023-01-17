import { useState } from 'react';
import CanvasContainer from '@/components/AmbientContainer/AmbientContainer';
import AmbientCanvas from '@/components/AmbientCanvas/AmbientCanvas';
import useSource from '@/hooks/useSource/useSource';
import { traverseAndPassPropsByElementType } from '@/utils/traverse-dom/traverse-dom';
import { canvasDefaultConfigGenerator } from '@/constants/canvas';
import type { AmbientVideoProps } from './types';

const AmbientVideo = ({ children, ...restProps }: AmbientVideoProps) => {
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
          {...restProps}
          frameRate={playing ? restProps.frameRate : 0}
        />
      )}
    </CanvasContainer>
  );
};

AmbientVideo.defaultProps = canvasDefaultConfigGenerator(['appear']);

export default AmbientVideo;
