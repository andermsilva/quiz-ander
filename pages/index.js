/* eslint-disable no-console */
/* eslint-disable func-names */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import Link from '../src/components/Link';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"

        >
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
              <Input
                name="nomeDoUsuario"
                onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                placeholder="Seu nome?"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1> Ouiz da Galera </h1>
            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.verce.app', '')
                  .split('.');
                return (

                  <li key={linkExterno}>
                    {name.length !== 0 && (

                      <Widget.Topic
                        as={Link}
                        href={`/quiz/${projectName}___${githubUser}?name=${name}`}

                      >
                        {`${githubUser}/${projectName}`}
                      </Widget.Topic>
                    )}

                    {name.length === 0 && (

                      <Widget.Topic
                        as={Link}
                        href="#"

                      >
                        {`${githubUser}/${projectName}`}
                      </Widget.Topic>
                    )}

                  </li>
                );
              })}

            </ul>

          </Widget.Content>
        </Widget>

        <Footer
          as={motion.footer}
          transition={{ delay: 0, duration: 1 }}
          variants={{
            show: { opacity: 1, x: '0' },
            hidden: { opacity: 0, x: '100%' },
          }}
          initial="hidden"
          animate="show"
        />

      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/andermsilva" />
    </QuizBackground>

  );
}
