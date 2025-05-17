import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="description" content="TheEnd.page - Create a dramatic exit page for any situation" />
        <meta property="og:title" content="TheEnd.page - Create Your Dramatic Exit" />
        <meta property="og:description" content="Because if it's the end, make it dramatic, make it clickable, make it yours." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://theend.page" />
        <meta property="og:image" content="https://theend.page/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
