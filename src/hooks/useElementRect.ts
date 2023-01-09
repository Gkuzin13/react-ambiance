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

function useElementRect(ref: RefObject<Element>) {
  const [rect, setRect] = useState<ElementRectValue>(defaultRect);

  useLayoutEffect(() => {
    if (!ref.current) return;

    setRect(ref.current.getBoundingClientRect());

    return () => setRect(defaultRect);
  }, [ref.current]);

  const resizeObserver = new ResizeObserver((entries) => {
    setRect(() => entries[0].contentRect);
  });

  function observe() {
    if (!ref.current) return;

    resizeObserver.observe(ref.current);
  }

  function unobserve() {
    if (!ref.current) return;

    resizeObserver.unobserve(ref.current);
  }

  return { rect, observe, unobserve };
}

export default useElementRect;
