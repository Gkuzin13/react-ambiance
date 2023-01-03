import { Children, createElement, isValidElement } from 'react';
import type { ReactNode } from 'react';

export type MediaType = 'video' | 'img';

export const traverseAndPassPropsByElementType = (
  children: ReactNode,
  type: MediaType,
  props: {}
): ReactNode => {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) return child;

    if (child.type === type) {
      return createElement(type, { ...props, ...child.props });
    } else if (child.props.children) {
      return traverseAndPassPropsByElementType(
        child.props.children,
        type,
        props
      );
    }

    return child;
  });
};
