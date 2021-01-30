/* eslint-disable react/prop-types *//* eslint-disable linebreak-style */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/components/screens/Quiz';

// eslint-disable-next-line react/prop-types
export default function QuizDaGaleraPage({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>

      <QuizScreen
        externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg}

      >
        {/* <pre style={{color:'black'}}>
          {JSON.stringify(dbExterno.questions, null, 4)}
        </pre> */}
      </QuizScreen>
    </ThemeProvider>

  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');

  try {
    const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
      .then((respostaDoServidor) => {
        if (respostaDoServidor.ok) {
          return respostaDoServidor.json();
        }
        throw new Error('Falha em pegar os dados');
      })
      .then((respostaConvertidaEmObjeto) => (respostaConvertidaEmObjeto))
      // eslint-disable-next-line arrow-body-style
      .catch((err) => {
        return err;
      });

    return {
      props: {
        dbExterno,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}
