import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <title>TheEnd.page - Create Your Dramatic Exit</title>
      </Head>
      <Toaster />
      <Component {...pageProps} />
    </>
  )
}
