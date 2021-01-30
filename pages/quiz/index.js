/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import db from '../../db.json';
import QuizPage from '../../src/components/screens/Quiz';

export default function QuizIndex() {
  return (

    <QuizPage
      externalQuestions={db.questions}
      externalBg={db.bg}
    />
  );
}
