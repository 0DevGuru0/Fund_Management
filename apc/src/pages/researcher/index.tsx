import React from 'react';

import { NextPage } from 'next';
import Router from 'next/router';

const Home: NextPage = () => {
  return <div />;
};

Home.getInitialProps = async ({ res }) => {
  if (res) {
    res.writeHead(302, {
      Location: '/researcher/overview',
      'Content-Type': 'text/html; charset=utf-8',
    });
    res.end();
    return {};
  }

  Router.push('/researcher/overview');
  return {};
};

export default Home;
