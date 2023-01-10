import { Container } from './styles.css';
import type { PropsWithChildren } from 'react';

function CanvasContainer({ children }: PropsWithChildren) {
  return <Container>{children}</Container>;
}

export default CanvasContainer;
