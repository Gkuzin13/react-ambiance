import { getByRole, render, renderHook } from '@testing-library/react';
import useElementRect from './useElementRect';

test('return element rect', () => {
  const Container = render(
    <div>
      <img style={{ width: 300, height: 500 }} alt="test" />
    </div>,
  );

  const { result } = renderHook(() =>
    useElementRect(Container.getByRole('img')),
  );

  result.current.observe();
  result.current.unobserve();
});
