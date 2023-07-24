import { ConfigType, ObjectRecord, SectionColor } from './iconButton.config';
import { ColorVariant } from './iconButtonTypes';

const isString = (item: string | ObjectRecord | SectionColor): item is string => {
  return typeof item === 'string';
};

const isObjectRecord = (item: string | ObjectRecord): item is ObjectRecord => {
  return typeof item === 'object';
};

const isSectionColor = (item: string | SectionColor): item is SectionColor => {
  return typeof item === 'object';
};

const defaultValues = {
  iconColor: '#000',
  hoverColor: '#000',
  pressedColor: '#000',
  backgroundColor: '#000',
  hoverBackgroundColor: '#000',
  pressedBackgroundColor: '#000',
};

const iconButtonColorMapper = (
  config: ConfigType,
  colorVariant: ColorVariant,
  isLight?: boolean,
): any => {
  let iconColor: string | undefined;
  let hoverColor: string | undefined;
  let pressedColor: string | undefined;
  let backgroundColor: string | undefined;
  let hoverBackgroundColor: string | undefined;
  let pressedBackgroundColor: string | undefined;

  if (
    isObjectRecord(config.hovered) &&
    isObjectRecord(config.default) &&
    isObjectRecord(config.pressed)
  ) {
    switch (colorVariant) {
      case 'Primary':
        if (isSectionColor(config.hovered.primary)) {
          hoverColor = config.hovered.primary.icon;
          hoverBackgroundColor = config.hovered.primary.container;
        } else {
          hoverColor = config.hovered.primary;
        }
        if (isSectionColor(config.default.primary)) {
          iconColor = config.default.primary.icon;
          backgroundColor = config.default.primary.container;
        } else if (isString(config.default.normal)) {
          iconColor = config.default.normal;
        }
        if (isSectionColor(config.pressed.primary)) {
          pressedColor = config.pressed.primary.icon;
          pressedBackgroundColor = config.pressed.primary.container;
        }
        if (!isSectionColor(config.pressed.primary)) {
          pressedColor = config.pressed.primary;
        }
        break;
      case 'Secondary':
        if (isSectionColor(config.hovered.secondary)) {
          hoverColor = config.hovered.secondary.icon;
          hoverBackgroundColor = config.hovered.secondary.container;
        } else {
          hoverColor = config.hovered.secondary;
        }
        if (isSectionColor(config.default.secondary)) {
          iconColor = config.default.secondary.icon;
          backgroundColor = config.default.secondary.container;
        } else if (isString(config.default.normal)) {
          iconColor = config.default.normal;
        }
        if (isSectionColor(config.pressed.secondary)) {
          pressedColor = config.pressed.secondary.icon;
          pressedBackgroundColor = config.pressed.secondary.container;
        }
        if (!isSectionColor(config.pressed.secondary)) {
          pressedColor = config.pressed.secondary;
        }
        break;
      case 'Negative':
        if (isSectionColor(config.default.negative)) {
          iconColor = config.default.negative.icon;
          backgroundColor = config.default.negative.container;
        } else if (isString(config.default.normal)) {
          iconColor = config.default.normal;
        }
        if (isSectionColor(config.hovered.negative)) {
          hoverColor = config.hovered.negative.icon;
          hoverBackgroundColor = config.hovered.negative.container;
        } else {
          hoverColor = config.hovered.negative;
        }
        if (isSectionColor(config.pressed.negative)) {
          pressedColor = config.pressed.negative.icon;
          pressedBackgroundColor = config.pressed.negative.container;
        }
        if (!isSectionColor(config.pressed.negative)) {
          pressedColor = config.pressed.negative;
        }
        break;
      case 'Tertiary':
        if (isSectionColor(config.default.tertiary)) {
          iconColor = config.default.tertiary.icon;
          backgroundColor = config.default.tertiary.container;
        }
        if (isSectionColor(config.hovered.tertiary)) {
          hoverColor = config.hovered.tertiary.icon;
          hoverBackgroundColor = config.hovered.tertiary.container;
        }
        if (isSectionColor(config.pressed.tertiary)) {
          pressedColor = config.pressed.tertiary.icon;
          pressedBackgroundColor = config.pressed.tertiary.container;
        }
        break;
      case 'Fourth':
        if (isSectionColor(config.default.fourth)) {
          iconColor = config.default.fourth.icon;
          backgroundColor = config.default.fourth.container;
        }
        if (isSectionColor(config.hovered.fourth)) {
          hoverColor = config.hovered.fourth.icon;
          hoverBackgroundColor = config.hovered.fourth.container;
        }
        if (isSectionColor(config.pressed.fourth)) {
          pressedColor = config.pressed.fourth.icon;
          pressedBackgroundColor = config.pressed.fourth.container;
        }
        break;
      case 'ToolPrimary':
        if (isSectionColor(config.default.normal)) {
          iconColor = config.default.normal.icon;
          backgroundColor = config.default.normal.container;
        }
        if (isSectionColor(config.hovered.primaryTool)) {
          hoverColor = config.hovered.primaryTool.icon;
          hoverBackgroundColor = config.hovered.primaryTool.container;
        }
        if (isSectionColor(config.pressed.primary)) {
          pressedColor = config.pressed.primary.icon;
          pressedBackgroundColor = config.pressed.primary.container;
        }
        break;
      case 'ToolSecondary':
        if (isSectionColor(config.default.normal)) {
          iconColor = config.default.normal.icon;
          backgroundColor = config.default.normal.container;
        }
        if (isSectionColor(config.hovered.secondaryTool)) {
          hoverColor = config.hovered.secondaryTool.icon;
          hoverBackgroundColor = config.hovered.secondaryTool.container;
        }
        if (isSectionColor(config.pressed.secondary)) {
          pressedColor = config.pressed.secondary.icon;
          pressedBackgroundColor = config.pressed.secondary.container;
        }
        break;
      case 'ToolNegative':
        if (isSectionColor(config.default.normal)) {
          iconColor = config.default.normal.icon;
          backgroundColor = config.default.normal.container;
        }
        if (isSectionColor(config.hovered.negativeTool)) {
          hoverColor = config.hovered.negativeTool.icon;
          hoverBackgroundColor = config.hovered.negativeTool.container;
        }
        if (isSectionColor(config.pressed.negative)) {
          pressedColor = config.pressed.negative.icon;
          pressedBackgroundColor = config.pressed.negative.container;
        }
        break;
      default:
        if (isSectionColor(config.default.normal)) {
          iconColor = config.default.normal.icon;
          backgroundColor = config.default.normal.container;
        }
        if (isString(config.default.normal)) {
          iconColor = config.default.normal;
        }
        if (isString(config.default.normal) && isString(config.default.other)) {
          iconColor = isLight ? config.default.other : config.default.normal;
        }
        if (isSectionColor(config.hovered.normal)) {
          hoverColor = config.hovered.normal.icon;
          hoverBackgroundColor = config.hovered.normal.container;
        }
        if (isString(config.hovered.normal) && isString(config.hovered.other)) {
          hoverColor = isLight ? config.hovered.other : config.hovered.normal;
        }
        if (isSectionColor(config.pressed.normal)) {
          pressedColor = config.pressed.normal.icon;
          pressedBackgroundColor = config.pressed.normal.container;
        }
        if (!isSectionColor(config.pressed.normal)) {
          pressedColor = config.pressed.normal;
        }
        break;
    }
  }

  return {
    iconColor: iconColor ?? defaultValues.iconColor,
    hoverColor: hoverColor ?? defaultValues.hoverColor,
    pressedColor: pressedColor ?? defaultValues.pressedColor,
    backgroundColor: backgroundColor ?? defaultValues.backgroundColor,
    hoverBackgroundColor: hoverBackgroundColor ?? defaultValues.hoverBackgroundColor,
    pressedBackgroundColor:
      pressedBackgroundColor ?? defaultValues.pressedBackgroundColor,
  };
};

export default iconButtonColorMapper;
