import { useRef, useEffect, useCallback, RefObject } from 'react';

import { getRefElement } from '../getRefElement';

const isSSR: boolean = !(typeof window !== 'undefined' && window.document?.createElement);

export type RefElement = RefObject<Element> | Document | Window | null;

interface UseEventListener {
  type: keyof WindowEventMap;
  listener: EventListener;
  element?: RefElement;
  options?: AddEventListenerOptions;
}

export const useEventListener = ({
  type,
  listener,
  element = isSSR ? undefined : window,
  options,
}: UseEventListener): void => {
  const savedListener = useRef<EventListener>();

  useEffect(() => {
    savedListener.current = listener;
  }, [listener]);

  const handleEventListener = useCallback((event: Event) => {
    savedListener.current?.(event);
  }, []);

  useEffect(() => {
    const target = getRefElement(element);

    target?.addEventListener(type, handleEventListener, options);

    return () => target?.removeEventListener(type, handleEventListener);
  }, [type, element, options, handleEventListener]);
};
