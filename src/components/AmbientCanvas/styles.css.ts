import { css } from '@linaria/core';
import { canvasCssPropKeys, canvasConfigValues } from '@/constants/canvas';

const { scale, blur, opacity, borderRadius } = canvasConfigValues;

const canvas = css`
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: var(
    ${canvasCssPropKeys.borderRadius},
    ${borderRadius.default}px
  );
  transform: translate(-50%, -50%)
    scale(var(${canvasCssPropKeys.scale}, ${scale.default}));
  /* filter: blur(var(${canvasCssPropKeys.blur}, ${blur.default}px));
  opacity: var(${canvasCssPropKeys.opacity}, ${opacity.default}); */
  z-index: -1;
`;

const canvasFadeAnim = css`
  animation: fade 0.5s cubic-bezier(0.6, 0.04, 0.98, 0.335);

  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: var(${canvasCssPropKeys.opacity});
    }
  }
`;

export { canvas, canvasFadeAnim };
