import styled from "styled-components";
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
    // Create a Title component that'll render an <h1> tag with some styles
  const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
  `;

  // Create a Wrapper component that'll render a <section> tag with some styles
  const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
  `;

  // Use Title and Wrapper like any other React component – except they're styled!
  
  return (
    <>
      <Head>
        <title>Restaurante-PP</title>
        <meta name="description" content="Site do Restaurante PP, localizado em Bom Despacho" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Image
            src="/logo.png"
            alt="LogoPP"
            width={200}
            height={100}
            priority
        />
        <Wrapper>
          <Title>
            Hello World!
          </Title>
        </Wrapper>
      </main>
    </>
  )
}
