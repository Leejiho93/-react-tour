import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { ReactElement } from 'react';
import Helmet, { HelmetData } from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';

interface Props {
  helmet: HelmetData;
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
        helmet: Helmet.renderStatic(),
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
    const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
    const htmlAttrs = htmlAttributes.toComponent();
    const bodyAttrs = bodyAttributes.toComponent();

    return (
      <Html {...htmlAttrs} lang="ko">
        <Head>
          {this.props.styles}
          {/* {Object.values(helmet).map((el) => el.toComponent())} */}
          <title>어디갈래</title>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" />
          <meta name="description" content="대한민국 관광지 소개" />
          <meta
            name="viewport"
            content='content="width=device-width, initial-scale=0.86, maximum-scale=5.0, minimum-scale=0.86"'
          />
          <meta property="og:title" content="어디갈래" />
          <meta property="og:description" content="대한민국 관광지 소개" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="http://wdywg.site/favicon.ico" />
          <link rel="shortcut icon" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Gowun+Batang&display=swap"
          />
        </Head>
        <body {...bodyAttrs}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
