/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-console */
/* eslint-disable func-names */
import React from 'react';
import { useRouter } from 'next/router';

import styled from 'styled-components';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  console.log('retorno do State ', name, setName);
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1> Astronomia </h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();

              router.push(`/quiz?name=${name}`);
              console.log('Fazendo uma submissão por meio do react');
            }}
            >
              <input
                onChange={function (infosDoEvento) {
                  setName(infosDoEvento.target.value);

                  console.log(name);
                }}
                placeholder="Seu nome?"
              />
              <button type="submit" disabled={name.length === 0}>
                Jogar{' '}{name}
              </button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1> O que voce sabe sobre o universo? </h1>
            <p> lourem dolor ipc .....</p>

          </Widget.Content>
        </Widget>

        <Footer />

      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/andermsilva" />
    </QuizBackground>

  );
}
