import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { ReactElement } from 'react';
import { ServerStyleSheet } from 'styled-components';

interface Props {
  styles: ReactElement;
}

class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(
              <>
                <App {...props} />
              </>
            ),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta charSet="UTF-8" />
          {this.props.styles}
          <meta name="description" content="대한민국 관광지 소개" />
          <meta property="og:title" content="어디갈래" />
          <meta property="og:description" content="대한민국 관광지 소개" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="http://nicetravel.kr/og.png" />
          <link rel="shortcut icon" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Gowun+Batang&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
