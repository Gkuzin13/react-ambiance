import { fireEvent, render, renderHook } from '@testing-library/react';
import useSource from './useSource';

test('sets source ref', () => {
  const { result } = renderHook(() => useSource());

  const Container = render(
    <div>
      <img
        ref={result.current.sourceRef}
        onLoad={() => result.current.setSourceReady(true)}
        alt="test"
      />
      ,
    </div>,
  );

  fireEvent.load(Container.getByRole('img'));

  expect(result.current.sourceRef.current).toBeInTheDocument();
  expect(result.current.sourceReady).toBe(true);
});
