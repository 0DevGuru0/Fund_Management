import React, { useRef, useLayoutEffect, useEffect } from 'react';

interface IAnimationProps {
  children?: React.ReactNode;
  gsapHandler: (element: HTMLCollection) => void;
}
export const AnimationWrapper = ({ gsapHandler, children }: IAnimationProps) => {
  const el = useRef<HTMLSpanElement>(null);

  const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    if (el.current) {
      gsapHandler(el.current.children);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span ref={el}>{children}</span>;
};
