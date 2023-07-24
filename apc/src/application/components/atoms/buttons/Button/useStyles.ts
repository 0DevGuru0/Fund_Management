import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
  const buttonTheme = theme.cmp?.button;

  return createStyles({
    title: {
      fontSize: (props: any) => props.font,
      fontWeight: 'bold',
      lineHeight: 'normal',
      color: buttonTheme?.default.contained?.default.title,
      width: 'fit-content',
      whiteSpace: 'nowrap',
    },
    root: (props: any) => ({
      padding: props.padding,
      height: 'fit-content',
      borderRadius: props.radius,
      width: 'fit-content',
      [theme.breakpoints.down('xs')]: {
        borderRadius: '65px',
      },
      // [theme.breakpoints.down('sm')]: {
      //   borderRadius: props.customSize === 'lg' ? 12 : props.radius,
      // },
      // [theme.breakpoints.down('xs')]: {
      //   borderRadius: props.customSize === 'lg' ? 60 : props.radius,
      // },
    }),
    contained: {
      backgroundColor: `${buttonTheme?.default.contained?.default.background?.default}`,
      border: (props: any) =>
        `1px solid ${
          !props.focused
            ? buttonTheme?.default.contained?.default.border?.default
            : buttonTheme?.default.contained?.default.border?.focused
        }`,
      '& > span *': {
        color: buttonTheme?.default.contained?.default.title,
        '&:last-child > span': {
          backgroundColor: theme.palette.grey[500],
        },
      },
      '&:hover': {
        boxShadow: `0 2px 9px 0 ${buttonTheme?.default.contained?.hover?.boxShadow} !important`,
        backgroundColor: buttonTheme?.default.contained?.hover?.background,
        border: `1px solid ${buttonTheme?.default.contained?.hover?.border}`,
      },
      '&:active': {
        boxShadow: 'none',
        border: `1px solid ${buttonTheme?.default.contained?.active?.border}`,
        backgroundColor: buttonTheme?.default.contained?.active?.background ?? 'inherit',
        '& > span *': {
          color: buttonTheme?.default.contained?.active?.title,
        },
      },
      '&:focus': {
        boxShadow: 'none',
      },
      '&:disabled': {
        backgroundColor: buttonTheme?.default.contained?.disabled?.background,
        border: `1px solid ${buttonTheme?.default.contained?.disabled?.border}`,
        opacity: 0.5,
        '& > span *': {
          color: buttonTheme?.default.contained?.disabled?.title,
          opacity: 0.5,
        },
      },
    },
    outlined: {
      backgroundColor: buttonTheme?.default.outlined?.default.background?.default,
      border: (props: any) =>
        `1px solid ${
          !props.focused
            ? buttonTheme?.default.outlined?.default.border?.default
            : buttonTheme?.default.outlined?.default.border?.focused
        } `,
      '& > span *': {
        color: buttonTheme?.default.outlined?.default.title,
        '&:last-child > span': {
          backgroundColor: theme.palette.grey[400],
        },
      },
      '&:hover': {
        boxShadow: 'none',
        backgroundColor: buttonTheme?.default.outlined?.hover?.background,
        border: `1px solid ${buttonTheme?.default.outlined?.hover?.border}`,
      },
      '&:active': {
        boxShadow: 'none',
        border: `1px solid ${buttonTheme?.default.outlined?.active?.border}`,
        backgroundColor: buttonTheme?.default.outlined?.active?.background ?? 'inherit',
        '& > span *': {
          color: buttonTheme?.default.outlined?.active?.title ?? 'inherit',
        },
      },
      '&:focus': {
        boxShadow: 'none',
        '& > span *': {
          color: buttonTheme?.default.outlined?.disabled?.title ?? 'inherit',
        },
      },
      '&:disabled': {
        backgroundColor: buttonTheme?.default.outlined?.disabled?.background,
        border: `1px solid ${buttonTheme?.default.outlined?.disabled?.border}`,
        opacity: 0.5,
        '& > span *': {
          color: buttonTheme?.default.outlined?.disabled?.title,
          opacity: 0.5,
        },
      },
    },
    containedPrimary: {
      backgroundColor: buttonTheme?.primary.contained?.default.background?.default,
      border: `1px solid ${buttonTheme?.primary.contained?.default.border?.default} !important`,
      boxShadow: (props: any) =>
        props.focused
          ? `0 2px 12px 0 ${buttonTheme?.primary.contained?.focus?.boxShadow}, 0 0 0 3px ${buttonTheme?.primary.contained?.default.border?.focused}`
          : 'none',
      '& > span *': {
        color: buttonTheme?.primary.contained?.default.title,
        '&:last-child > span': {
          backgroundColor: theme.palette.primary.dark,
        },
      },
      '&:hover': {
        backgroundColor: buttonTheme?.primary.contained?.hover?.background,
        border: `1px solid ${buttonTheme?.primary.contained?.hover?.border} !important`,
        boxShadow: `0 2px 9px 0 ${buttonTheme?.primary.contained?.hover?.boxShadow}`,
        '&:active': {
          border: `1px solid ${buttonTheme?.primary.contained?.active?.border} !important`,
        },
      },
      '&:active': {
        backgroundColor: buttonTheme?.primary.contained?.active?.background ?? 'inherit',
        border: `1px solid ${buttonTheme?.primary.contained?.active?.border} !important`,
        '& > span *': {
          color: buttonTheme?.primary.contained?.active?.title,
        },
      },
      '&:disabled': {
        backgroundColor: buttonTheme?.primary.contained?.disabled?.background,
        opacity: 0.5,
        '& > span *': {
          color: buttonTheme?.primary.contained?.disabled?.title,
          opacity: 0.5,
        },
      },
    },
    outlinedPrimary: {
      backgroundColor: buttonTheme?.primary.outlined?.default.background?.default,
      border: (props: any) =>
        `1px solid ${
          !props.focused
            ? buttonTheme?.primary.outlined?.default.border?.default
            : buttonTheme?.primary.outlined?.default.border?.focused
        } !important`,
      '& > span *': {
        color: `${buttonTheme?.primary.outlined?.default.title} !important`,
        '&:last-child > span': {
          backgroundColor: theme.palette.primary.dark,
        },
      },
      '&:hover': {
        border: `1px solid ${buttonTheme?.primary.outlined?.hover?.border} !important`,
        backgroundColor: buttonTheme?.primary.outlined?.hover?.background,
        boxShadow: 'none',
        '& > span *': {
          color: `${buttonTheme?.primary.outlined?.hover?.title} !important`,
        },
      },
      '&:active': {
        border: `1px solid ${buttonTheme?.primary.outlined?.active?.border} !important`,
        backgroundColor: buttonTheme?.primary.outlined?.active?.background ?? 'inherit',
        '& > span *': {
          color: buttonTheme?.primary.outlined?.active?.title,
        },
      },
      '&:focus': {
        boxShadow: 'none',
      },
      '&:disabled': {
        backgroundColor: `${buttonTheme?.primary.outlined?.disabled?.background}`,
        border: `1px solid ${buttonTheme?.primary.outlined?.disabled?.border}`,
        opacity: 0.5,
        '& > span *': {
          color: buttonTheme?.primary.outlined?.disabled?.title,
          opacity: 0.5,
        },
      },
    },
    containedSecondary: {
      backgroundColor: buttonTheme?.secondary.contained?.default.background?.default,
      border: (props: any) =>
        `1px solid ${
          !props.focused
            ? buttonTheme?.secondary.contained?.default.border?.default
            : buttonTheme?.secondary.contained?.default.border?.focused
        } !important`,
      boxShadow: (props: any) =>
        props.focused && buttonTheme?.secondary.contained?.default.boxShadow
          ? `0 2px 9px 0 ${buttonTheme?.secondary.contained?.default.boxShadow?.firstColor}, 0 0 0 3px ${buttonTheme?.secondary.contained?.default.boxShadow?.secondColor}`
          : 'none',
      '& > span *': {
        color: buttonTheme?.secondary.contained?.default.title,
        '&:last-child > span': {
          backgroundColor: theme.palette.secondary.dark,
        },
      },
      '&:hover': {
        backgroundColor: `${buttonTheme?.secondary.contained?.hover?.background} !important`,
        border: `1px solid ${buttonTheme?.secondary.contained?.hover?.border} !important`,
        boxShadow:
          buttonTheme?.secondary.contained?.hover?.boxShadow &&
          `0 2px 9px 0 ${buttonTheme?.secondary.contained?.hover?.boxShadow}`,
        '& > span *': {
          color: buttonTheme?.secondary.contained?.hover?.title ?? 'inherit',
        },
        '&:active': {
          border: `1px solid ${buttonTheme?.secondary.contained?.hover?.border} !important`,
        },
      },
      '&:active': {
        backgroundColor: buttonTheme?.secondary.contained?.active?.background,
        border: `1px solid ${buttonTheme?.secondary.contained?.active?.border} !important`,
        '& > span *': {
          color: buttonTheme?.secondary.contained?.active?.title ?? 'inherit',
        },
      },
      '&:focus': {
        backgroundColor: `${buttonTheme?.secondary.contained?.focus?.background}`,
        '& > span *': {
          color: buttonTheme?.secondary.contained?.focus?.title,
        },
      },
      focus: {},
      '&:disabled': {
        backgroundColor: buttonTheme?.secondary.contained?.disabled?.background,
        opacity: 0.5,
        '& > span *': {
          color: buttonTheme?.secondary.contained?.disabled?.title,
          opacity: 0.5,
        },
      },
    },
    outlinedSecondary: {
      backgroundColor: (props: any) =>
        `${
          !props.focused
            ? buttonTheme?.secondary.outlined?.default.background?.default
            : buttonTheme?.secondary.outlined?.default.background?.focused
        } !important`,

      border: `1px solid ${buttonTheme?.secondary.outlined?.default.border?.default} !important`,

      boxShadow: (props: any) =>
        props.focused &&
        `0 2px 12px 0 ${buttonTheme?.secondary.outlined?.default.boxShadow?.firstColor}, 0 0 0 3px  ${buttonTheme?.secondary.outlined?.default.border?.focused}`,

      '& > span *': {
        color: `${buttonTheme?.secondary.outlined?.default.title} !important`,
        '&:last-child > span': {
          backgroundColor: theme.palette.secondary[300],
        },
      },
      '&:hover': {
        border: `1px solid ${buttonTheme?.secondary.outlined?.hover?.border} !important`,
        backgroundColor: `${buttonTheme?.secondary.outlined?.hover?.background} !important`,
        boxShadow:
          buttonTheme?.secondary.outlined?.hover?.boxShadow &&
          `0 2px 12px 0 ${buttonTheme?.secondary.outlined?.hover?.boxShadow}`,
        '& > span *': {
          color: `${buttonTheme?.secondary.outlined?.hover?.title} !important`,
        },
        '&:active': {
          border: `1px solid ${buttonTheme?.secondary.outlined?.hover?.border} !important`,
        },
      },
      '&:focus': {
        border: `1px solid ${buttonTheme?.secondary.outlined?.focus?.border}`,
        backgroundColor: buttonTheme?.secondary.outlined?.focus?.background,
        '& > span *': {
          color: `${buttonTheme?.secondary.outlined?.focus?.title} !important`,
        },
        boxShadow:
          buttonTheme?.secondary.outlined?.focus?.boxShadow &&
          `0 2px 12px 0 ${buttonTheme?.secondary.outlined?.focus?.boxShadow}`,
      },
      '&:active': {
        backgroundColor:
          `${buttonTheme?.secondary.outlined?.active?.background} !important` ??
          'inherit',
        boxShadow: buttonTheme?.secondary.outlined?.active?.boxShadow,
        border: `1px solid ${buttonTheme?.secondary.outlined?.active?.border} !important`,
        '& > span *': {
          color: `${buttonTheme?.secondary.outlined?.active?.title} !important`,
        },
      },
      '&:disabled': {
        backgroundColor: buttonTheme?.secondary.outlined?.disabled?.background,
        border: `1px solid ${buttonTheme?.secondary.outlined?.disabled?.border}`,
        opacity: 0.5,
        '& > span *': {
          color: buttonTheme?.secondary.outlined?.disabled?.title,
          opacity: 0.5,
        },
      },
    },
    icon: (props: any) => ({
      width: props.icon,
      height: props.icon,
      color: buttonTheme?.icon.color,
    }),
    left: {
      marginRight: 6,
    },
    right: {
      marginLeft: 6,
    },
    mdClass: {
      [theme.breakpoints.down('sm')]: {
        padding: `${theme.spacing(1, 2)} !important`,
      },
      [theme.breakpoints.down('xs')]: {
        borderRadius: '35px !important',
      },
    },
  });
});

export default useStyles;
