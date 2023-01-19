import { traverseAndPassPropsByElementType } from '@/utils/traverse/traverse-elements';
import AmbientContainer from '@/components/AmbientContainer/AmbientContainer';
import AmbientCanvas from '@/components/AmbientCanvas/AmbientCanvas';
import useSource from '@/hooks/useSource/useSource';
import { canvasDefaultConfigGenerator } from '@/constants/canvas';
import type { PropsWithChildren } from 'react';
import type { CanvasConfig } from '@/constants/canvas';

export type AmbientImageProps = PropsWithChildren &
  Omit<CanvasConfig, 'frameRate' | 'initialFrameAlpha'>;

const AmbientImage = ({ children, ...restProps }: AmbientImageProps) => {
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
          {...restProps}
          frameRate={0}
          initialFrameAlpha={1}
        />
      )}
    </AmbientContainer>
  );
};

AmbientImage.defaultProps = canvasDefaultConfigGenerator([
  'frameRate',
  'initialFrameAlpha',
]);

export default AmbientImage;
