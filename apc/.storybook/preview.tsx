import { withNextRouter } from 'storybook-addon-next-router';
import { breakPoints } from '$viewPorts';
import { initializeWorker, mswDecorator as withMSW } from 'msw-storybook-addon';
import { StoryComponentDecorator } from './StoryComponentDecorator';

initializeWorker();

export const decorators = [
  StoryComponentDecorator,
  withMSW,
  withNextRouter({
    path: '/', // defaults to `/`
    asPath: '/', // defaults to `/`
    query: {}, // defaults to `{}`
    push() {}, // defaults to using addon actions integration, can override any method in the router
  }),
  // TODO: IW-293
  // withThemesProvider(map(getThemes())),
];

const ordering = ['Atoms', 'Molecules', 'Organisms', 'Templates', 'Pages', 'Samples'];
const getDirectoryDepth = (path) => path.match(/\//g)?.length ?? 0;
export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  options: {
    storySort: ([, a], [, b]) => {
      if (a.kind === b.kind) {
        return 0;
      }
      // orders root categories
      const aKind = a.kind.match(/(\w*)(\s*)|/)[1];
      const bKind = b.kind.match(/(\w*)(\s*)|/)[1];
      if (aKind !== bKind) {
        return ordering.indexOf(aKind) - ordering.indexOf(bKind);
      }
      // sorts folders on top of everything
      if (getDirectoryDepth(a.kind) > getDirectoryDepth(b.kind)) {
        return -1;
      }
      return a.kind.localeCompare(b.kind);
    },
  },
  defaultLocale: 'en',
  locales: {
    en: { dir: 'ltr', name: 'English' },
    fa: { dir: 'rtl', name: 'Persian' },
  },
  viewport: {
    viewports: {
      mobile1: {
        name: 'Small mobile',
        styles: {
          height: '568px',
          width: `${breakPoints.mobileS - 1}px`,
        },
        type: 'mobile',
      },
      mobile2: {
        name: 'Large mobile',
        styles: {
          height: '896px',
          width: `${breakPoints.mobileL - 1}px`,
        },
        type: 'mobile',
      },
      tablet: {
        name: 'Tablet',
        styles: {
          height: '1112px',
          width: `${breakPoints.tablet - 1}px`,
        },
        type: 'tablet',
      },
    },
  },
};
