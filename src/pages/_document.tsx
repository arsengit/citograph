import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { CssBaseline } from '@nextui-org/react';

import { getCssText } from '@/config/stitches';

function MyDocument(props) {
  return (
    <Html lang='en'>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          rel='preload'
          as='font'
          href='/assets/fonts/inconsolata/Inconsolata.ttf'
          crossOrigin=''
        />
        <link
          rel='preload'
          as='font'
          href='/assets/fonts/inter/Inter.ttf'
          crossOrigin=''
        />
        <Script src='https://identity.netlify.com/v1/netlify-identity-widget.js' />
        <style
          id='stitches'
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

async function getInitialProps(ctx) {
  const initialProps = await Document.getInitialProps(ctx);
  return {
    ...initialProps,
    styles: React.Children.toArray([initialProps.styles]),
  };
}

export default MyDocument;
