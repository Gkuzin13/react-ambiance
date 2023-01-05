import { traverseAndPassPropsByElementType } from '@/methods/dom';
import AmbientContainer from '@/components/AmbientContainer';
import AmbientCanvas from '@/components/AmbientCanvas';
import useSource from '@/hooks/useSource';
import { CANVAS_CONFIG_VALUES } from '@/constants/canvas';
import type { AmbientImageProps } from './types';

const { SCALE, BORDER_RADIUS, BLUR, OPACITY } = CANVAS_CONFIG_VALUES;

function AmbientImage({
  config: {
    scale = SCALE.DEFAULT,
    borderRadius = BORDER_RADIUS.DEFAULT,
    blur = BLUR.DEFAULT,
    opacity = OPACITY.DEFAULT,
  },
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
          config={{ scale, blur, opacity, borderRadius }}
        />
      )}
    </AmbientContainer>
  );
}

export default AmbientImage;
