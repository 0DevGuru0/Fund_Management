import gsap from 'gsap';

import { getStyles } from '$application/lib/getStyles';

export const animateMenuItem = (element: HTMLDivElement, cb: () => void): void => {
  const initialStyles = getStyles(element, ['padding', 'height', 'margin-bottom']);
  const padding = getStyles(element, ['padding-left', 'padding-right']);

  gsap.to(element, {
    duration: 0.3,
    opacity: 0,
    height: 0,
    width: 0,
    visibility: 'hidden',
    padding: `0 ${padding.left}px 0 ${padding.right}px`,
    marginBottom: 0,
    onComplete: () => {
      cb();
      gsap.to(element, {
        opacity: 1,
        width: 'auto',
        ...initialStyles,
        visibility: 'unset',
      });
    },
  });
};
