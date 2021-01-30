/* eslint-disable prefer-destructuring *//* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import QuizBackground from '../../QuizBackground';
import Widget from '../../Widget';
import QuizLogo from '../../QuizLogo';
// import db from '../../../../db.json';
import QuizContainer from '../../QuizContainer';
import Button from '../../Button';
import AlternativesForm from '../../AlternativeForm';
import BackLinkArrow from '../../BackLinkArrow';

function ResultWidget({ results }) {
  // eslint-disable-next-line no-unused-vars
  const router = useRouter();
  const nomeJogador = router.query.name;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        Tela de Resultado
        {' '}
        {`${nomeJogador}`}
      </Widget.Header>
      <Widget.Content>
        <p>
          {' '}
          Você acertou
          {' '}
          {/* {results.reduce((somatoriaAtual, resultAtual) => {
            const isAcerto = resultAtual === true;
            if (isAcerto) {
              return somatoriaAtual + 1;
            }
            return somatoriaAtual;
          }, 0)} */}
          { }
          {results.filter((x) => x).length}

        </p>
        <ul>
          {results.map((result, index) => (
            <li key={result.id}>
              #
              {index + 1}
              {' '}
              Resultado
              {`${result === true ? ' Acertou ' : ' Errou'}`}
            </li>

          ))}
        </ul>

      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>
      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}
// eslint-disable-next-line react/prop-types
function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,

}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmit, setIsQuestionSubmit] = useState(false);
  const questionId = `question_${questionIndex}`;
  const isCorret = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>

          {`${questionIndex + 1}ª Pergunta de ${totalQuestions}`}

        </h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>

        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>
        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmit(true);
            setTimeout(() => {
              addResult(isCorret);
              onSubmit();
              setIsQuestionSubmit(false);
              setSelectedAlternative(undefined);
            }, 3 * 1000);
          }}
        >

          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative_${alternativeIndex}`;
            const selectedAlternativeStatus = isCorret ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;

            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmit && selectedAlternativeStatus}
              >

                <input
                  id={alternativeId}
                  type="radio"
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}

                />
                {alternative}
              </Widget.Topic>

            );
          })}

          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmit && isCorret && <p>Voce acertou!</p>}
          {isQuestionSubmit && !isCorret && <p>Voce errou!</p>}

        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}
const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage({ externalQuestions, externalBg }) {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const totalQuestions = externalQuestions.length;
  const [currentQuestion, setCurentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const bg = externalBg;

  function addResult(result) {
    setResults([
      ...results, result,
    ]);
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;

    if (nextQuestion < totalQuestions) {
      setCurentQuestion(questionIndex + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }
  /*  function handleChange(onChange) {
    const resp = onChange.target.value;
    console.log('escolha ', resp);

  } */
  return (

    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}

          />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && (
          <ResultWidget results={results} />
        )}
      </QuizContainer>
    </QuizBackground>
  );
}
