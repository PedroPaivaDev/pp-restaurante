import type { AppProps } from 'next/app';
import Head from 'next/head';

// import '@/styles/globals.css';
import {ThemeProvider} from 'styled-components';
import theme from '../styles/theme';
import GlobalStyles from '@/styles/global';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Restaurante-PP</title>
          <meta name="description" content="Site do Restaurante PP, localizado em Bom Despacho" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <GlobalStyles/>        
        <Header/>        
        <main>
          <Component {...pageProps} />
        </main>
        <Footer/>
      </ThemeProvider>
    </>
  )
}
