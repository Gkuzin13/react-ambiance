import { test, vi } from 'vitest';
import { traverseAndPassPropsByElementType } from './traverse-elements';
import { renderHook } from '@testing-library/react';
import useSource from '@/hooks/useSource/useSource';
import type { PropsWithChildren } from 'react';

test('passes props to element', () => {
  const { result } = renderHook(() => useSource());

  const propsToPass = {
    ref: result.current.sourceRef,
    onLoad: vi.fn(),
  };

  const Children = () => {
    return (
      <div>
        <img src="test" alt="test" ref={result.current.sourceRef} />
      </div>
    );
  };

  const Wrapper = ({ children }: PropsWithChildren) => {
    return (
      <div>
        {traverseAndPassPropsByElementType(children, 'img', propsToPass)}
      </div>
    );
  };

  const childrenWithPassedProps = Wrapper({ children: Children() });

  expect(childrenWithPassedProps.props.children[0]).toHaveProperty(
    'ref',
    propsToPass.ref,
  );

  expect(childrenWithPassedProps.props.children[0].props).toHaveProperty(
    'onLoad',
    propsToPass.onLoad,
  );
});
