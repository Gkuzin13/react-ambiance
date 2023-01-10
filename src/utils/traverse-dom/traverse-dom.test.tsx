import { test, vi } from 'vitest';
import { traverseAndPassPropsByElementType } from './traverse-dom';
import type { PropsWithChildren } from 'react';

test('passes props to element', () => {
  const propsToPass = {
    title: 'Test Title',
    onLoad: vi.fn(),
  };

  const Children = () => {
    return (
      <div>
        <img src="test" alt="test" />
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

  const [title, onLoad] = Object.keys(propsToPass);

  expect(childrenWithPassedProps.props.children[0].props).toHaveProperty(
    title,
    propsToPass.title,
  );

  expect(childrenWithPassedProps.props.children[0].props).toHaveProperty(
    onLoad,
    propsToPass.onLoad,
  );

  expect(childrenWithPassedProps).toMatchSnapshot();
});
