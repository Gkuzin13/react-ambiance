import { render, renderHook, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useSource from '@/hooks/useSource/useSource';
import AmbientCanvas from './AmbientCanvas';

test('renders canvas', () => {
  const { result } = renderHook(() => useSource());

  render(
    <div>
      <img ref={result.current.sourceRef} alt="alt" />
    </div>,
  );

  act(() => {
    result.current.setSourceReady(true);
  });

  if (result.current.sourceReady) {
    render(<AmbientCanvas sourceRef={result.current.sourceRef} />);
  }

  expect(screen.getByTestId('canvas-test')).toBeInTheDocument();
  screen.debug();
});
