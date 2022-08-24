import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const originalRenderPage = ctx.renderPage;

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App: any) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component: any) => Component,
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="Formulário" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Bitter&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
          <Script
            src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.20/lodash.min.js"
            strategy="beforeInteractive"
          ></Script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
