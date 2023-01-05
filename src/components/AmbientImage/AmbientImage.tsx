import { traverseAndPassPropsByElementType } from '@/methods/dom';
import AmbientContainer from '@/components/AmbientContainer/AmbientContainer';
import AmbientCanvas from '@/components/AmbientCanvas/AmbientCanvas';
import useSource from '@/hooks/useSource';
import { CANVAS_CONFIG_DEFAULTS } from '@/constants/canvas';
import type { AmbientImageProps } from './types';

function AmbientImage({
  config = CANVAS_CONFIG_DEFAULTS(['refreshRate']),
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
          config={config}
        />
      )}
    </AmbientContainer>
  );
}

export default AmbientImage;
