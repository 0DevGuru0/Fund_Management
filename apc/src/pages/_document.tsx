import React from 'react';

import { ServerStyleSheets as MuiServerStyleSheets } from '@material-ui/styles';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet as SCServerStyleSheet } from 'styled-components';

export class MyDocument extends Document {
  render = () => (
    <Html dir={'ltr'}>
      <Head>
        <head dangerouslySetInnerHTML={{ __html: '<!-- mui-inject-first -->' }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );

  static async getInitialProps(ctx: DocumentContext) {
    // Render app and page and get the context of the page with collected side effects.
    const muiSheets = new MuiServerStyleSheets();
    const scSheets = new SCServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          // eslint-disable-next-line @typescript-eslint/naming-convention
          enhanceApp: (App) => (props) =>
            scSheets.collectStyles(muiSheets.collect(<App {...props} />)),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: (
          <>
            {initialProps.styles}
            {muiSheets.getStyleElement()}
            {scSheets.getStyleElement()}
          </>
        ),
      };
    } finally {
      scSheets.seal();
    }
  }
}

export default MyDocument;
