import { Children, createElement, isValidElement } from 'react';
import type { ReactNode, MutableRefObject, DOMAttributes } from 'react';
import type { SourceRef } from '@/components/AmbientCanvas/AmbientCanvas';

export type MediaType = 'video' | 'img';

export type MediaProps = {
  ref: MutableRefObject<any>;
} & DOMAttributes<SourceRef['current']>;

export const traverseAndPassPropsByElementType = (
  children: ReactNode,
  type: MediaType,
  props: MediaProps,
): ReactNode => {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) return child;

    if (child.type === type) {
      return createElement(type, { ...props, ...child.props });
    } else if (child.props.children) {
      return traverseAndPassPropsByElementType(
        child.props.children,
        type,
        props,
      );
    }

    return child;
  });
};
