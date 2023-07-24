import gsap from 'gsap';

export const getStyles = (
  element: gsap.TweenTarget,
  styles: string[],
): Record<string, string | number> => {
  const styleObj = {};
  styles.forEach((style) => (styleObj[style] = gsap.getProperty(element, style)));
  return styleObj;
};
