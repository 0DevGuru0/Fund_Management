export type IconSize = 'Xs' | 'Sm' | 'Md' | 'Lg';
export type ContainerSize = IconSize | 'Xl';

export interface SectionSize {
  svgSize: number;
  spacing: number;
  borderRadius: number;
}

export enum IconSizeMapper {
  Xs = 16,
  Sm = 18,
  Md = 20,
  Lg = 24,
}

export const containedIconSizeMapper = (containerSize: ContainerSize): SectionSize => {
  switch (containerSize) {
    case 'Xs':
      return { svgSize: IconSizeMapper.Xs, spacing: 2, borderRadius: 4 };
    case 'Sm':
      return { svgSize: IconSizeMapper.Sm, spacing: 3, borderRadius: 5 };
    case 'Md':
      return { svgSize: IconSizeMapper.Md, spacing: 8, borderRadius: 8 };
    case 'Lg':
      return { svgSize: IconSizeMapper.Lg, spacing: 12, borderRadius: 12 };
    case 'Xl':
      return { svgSize: IconSizeMapper.Lg, spacing: 18, borderRadius: 16 };
    default:
      return { svgSize: IconSizeMapper.Sm, spacing: 3, borderRadius: 5 };
  }
};
