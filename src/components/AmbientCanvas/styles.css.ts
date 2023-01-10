import styled from 'styled-components';
import {
  canvasCssPropKeys,
  canvasConfigValues,
  CanvasConfig,
} from '@/constants/canvas';

const Canvas = styled.canvas<CanvasConfig>`
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: ${(props) => props.borderRadius}px;
  transform: translate(-50%, -50%) scale(${(props) => props.scale});
  filter: blur(${(props) => props.blur}px);
  opacity: ${(props) => props.opacity};
  z-index: -1;
  ${(props) =>
    props.appear &&
    `animation: fade 0.5s cubic-bezier(0.6, 0.04, 0.98, 0.335);

    @keyframes fade {
      from {
        opacity: 0;
      }
      to {
        opacity: var(${canvasCssPropKeys.opacity});
      }
    }`}
`;

export { Canvas };
