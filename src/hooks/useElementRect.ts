import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';

export type ElementRectValue = Omit<DOMRect, 'toJSON'>;

const defaultRect: ElementRectValue = {
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

function useElementRect(ref: RefObject<Element>, deps: any[] = []) {
  const [rect, setRect] = useState<ElementRectValue>(defaultRect);

  useLayoutEffect(() => {
    if (!ref.current) return;

    setRect(ref.current.getBoundingClientRect());

    return () => setRect(defaultRect);
  }, [ref.current, ...deps]);

  const resizeObserver = new ResizeObserver((entries) => {
    setRect(() => entries[0].contentRect);
  });

  function observe() {
    if (!ref.current) return;

    resizeObserver.observe(ref.current);
  }

  function stop() {
    if (!ref.current) return;

    resizeObserver.disconnect();
  }

  return { rect, observe, stop };
}

export default useElementRect;
