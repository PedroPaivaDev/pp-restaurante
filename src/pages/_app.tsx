import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import Header from '@/components/Header';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>Restaurante-PP</title>
        <meta name="description" content="Site do Restaurante PP, localizado em Bom Despacho" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>
      
      <main>
        <Component {...pageProps} />
      </main>
    </>
  )
}
