/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
// eslint-disable-next-line import/no-unresolved
import Head from 'next/head';
import db from '../db.json';

const GlobalStyle = createGlobalStyle`

*{
  box-sizing:border-box;
}
  body {
    margin: 0;
    padding: 0;
    
    display: flex;
    flex-direction:column;
    font-family: 'Lato', sans-serif;
    //Deixa branco no começo

    color:${({ theme }) => theme.colors.contrastText};
  }
 
  html, body {
    min-height: 100vh;
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;
const theme = db.theme;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>

        <meta property="og:image" content="https://cdn.pixabay.com/photo/2015/11/04/20/59/milky-way-1023340_960_720.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta property="og:image:alt" content="Quiz Alura By Anderson" />

        <title>AluraQuiz - by Anderson</title>

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
