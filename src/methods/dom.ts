import { Children, createElement, isValidElement } from 'react';
import type { ReactNode } from 'react';
type Type = 'video' | 'img';

export const traverseAndPassPropsByElementType = (
  children: ReactNode,
  type: Type,
  props: {}
): ReactNode => {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) return child;

    if (child.type === type) {
      return createElement(type, { ...props, ...child.props });
    }

    if (child.props.children) {
      return traverseAndPassPropsByElementType(
        child.props.children,
        type,
        props
      );
    }

    return child;
  });
};
