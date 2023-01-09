import { traverseAndPassPropsByElementType } from '@/methods/dom';
import AmbientContainer from '@/components/AmbientContainer/AmbientContainer';
import AmbientCanvas from '@/components/AmbientCanvas/AmbientCanvas';
import useSource from '@/hooks/useSource';
import type { AmbientImageProps } from './types';
import { canvasDefaultConfigGenerator } from '@/constants/canvas';

function AmbientImage({
  config = canvasDefaultConfigGenerator(['frameRate']),
  watchSourceResize,
  children,
}: AmbientImageProps) {
  const { sourceRef, sourceReady, setSourceReady } = useSource();

  const imgElementProps = {
    onLoad: () => setSourceReady(true),
    ref: sourceRef,
  };
  return (
    <AmbientContainer>
      {traverseAndPassPropsByElementType(children, 'img', {
        ...imgElementProps,
      })}
      {sourceReady && (
        <AmbientCanvas
          sourceRef={sourceRef}
          watchSourceResize={watchSourceResize}
          config={{ ...config, fadeDelay: 1 }}
        />
      )}
    </AmbientContainer>
  );
}

export default AmbientImage;
