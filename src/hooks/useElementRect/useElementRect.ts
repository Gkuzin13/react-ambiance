import { useLayoutEffect, useState } from 'react';

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

function useElementRect(element: Element | null) {
  const [rect, setRect] = useState<ElementRectValue>(defaultRect);

  useLayoutEffect(() => {
    if (!element) return;

    setRect(element.getBoundingClientRect());

    return () => setRect(defaultRect);
  }, [element]);

  const resizeObserver = new ResizeObserver((entries) => {
    setRect(() => entries[0].contentRect);
  });

  function observe() {
    if (!element) return;

    resizeObserver.observe(element);
  }

  function unobserve() {
    if (!element) return;

    resizeObserver.unobserve(element);
  }

  return { rect, observe, unobserve };
}

export default useElementRect;
