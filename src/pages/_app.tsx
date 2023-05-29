import type { AppProps } from 'next/app';
import Head from 'next/head';

// import '@/styles/globals.css';
import {ThemeProvider} from 'styled-components';
import GlobalStyles from '@/styles/global';
import theme from '../styles/theme';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MarmitaContext from '@/contexts/MarmitaContext';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <ThemeProvider theme={theme}>
        <MarmitaContext>
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
        </MarmitaContext>
      </ThemeProvider>
    </>
  )
}
