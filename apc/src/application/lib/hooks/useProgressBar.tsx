import { useEffect } from 'react';

import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { css } from 'styled-components';

const startProgressBar = () => NProgress.start();
const endProgressBar = () => NProgress.done();

export const useProgressBar = () => {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', startProgressBar);
    router.events.on('routeChangeComplete', endProgressBar);
    router.events.on('routeChangeError', endProgressBar);
    return () => {
      router.events.off('routeChangeStart', startProgressBar);
      router.events.off('routeChangeComplete', endProgressBar);
      router.events.off('routeChangeError', endProgressBar);
    };
  });
};

const progressBar = {
  color: '#29d',
  height: '5px',
};

export const progressBarStyle = css`
  #nprogress {
    .bar {
      background: ${progressBar.color} !important;
      height: ${progressBar.height};
    }
    .preg {
      box-shadow: 0 0 10px ${progressBar.color}, 0 0 5px ${progressBar.color} !important;
    }
    .spinner-icon {
      border-top-color: ${progressBar.color};
      border-left-color: ${progressBar.color};
    }
  }
`;
