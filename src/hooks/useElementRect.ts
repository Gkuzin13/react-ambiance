import { RefObject, useLayoutEffect, useState } from 'react';

export interface ElementRectValue extends Omit<DOMRect, 'toJSON'> {}

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

  const resizeObserver = new ResizeObserver((entries) => {
    setRect(() => entries[0].contentRect);
  });

  useLayoutEffect(() => {
    if (!ref?.current) return;

    setRect(() => getElementRect(ref.current));

    return () => setRect(() => defaultRect);
  }, [ref?.current]);

  function observe() {
    if (!ref?.current) return;

    resizeObserver.observe(ref.current);
  }

  function stop() {
    if (!ref?.current) return;

    resizeObserver.disconnect();
  }

  return { rect, observe, stop };
}

function getElementRect(element: Element | null) {
  if (!element) return defaultRect;
  return element.getBoundingClientRect();
}

export default useElementRect;
