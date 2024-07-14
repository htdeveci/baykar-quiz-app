import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import classes from "@/styles/GameOverview.module.css";
import AnswerGroup from "@/components/answerGroup";
import Question from "@/components/question";
import { useHttpClient } from "@/hooks/http-hook";
import { ANSWER_NOT_ALLOWED_TIMER, QUESTION_TIMER } from "@/globals/timers";
import Card from "@/components/card";
import Results from "@/components/results";

export default function GameController({ userId }) {
  const [key, setKey] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]);
  const [playerAllowedToAnswer, setPlayerAllowedToAnswer] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const responseData = await sendRequest();
        parseQuestionsAndAnswersByUserId(responseData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchQuestions();
  }, [sendRequest]);

  const changeQuestion = (selectedValue = null) => {
    setSelectedAnswers((prev) => [...prev, selectedValue]);
    setCurrentQuestionIndex((prev) => prev + 1);
    setPlayerAllowedToAnswer(false);
    setKey((prev) => prev + 1);
  };

  const parseQuestionsAndAnswersByUserId = (data) => {
    const parsedQuestionsAndAnswers = data.filter((element) => {
      return element.userId === userId;
    });

    parseQuestionsByUserId(parsedQuestionsAndAnswers);
    parseAllAnswersByUserId(parsedQuestionsAndAnswers);
  };

  const parseQuestionsByUserId = (data) => {
    const parsedQuestions = data.map((element) => element.title);
    setQuestions(parsedQuestions);
  };

  const parseAllAnswersByUserId = (data) => {
    const parsedAllAnswers = data.map((element) => element.body);
    setAllAnswers(parsedAllAnswers);
  };

  const answerSelectHandler = (selectedValue) => {
    changeQuestion(selectedValue);
  };

  return (
    <>
      {questions.length === 0 && <></>}

      {questions.length !== 0 && (
        <div className={classes.outerDiv}>
          <Card fullWidth>
            {currentQuestionIndex < questions.length &&
              currentQuestionIndex < allAnswers.length && (
                <>
                  <Container className={classes.container}>
                    <Row>
                      <div className="flex-center">
                        <CountdownCircleTimer
                          key={key}
                          size={100}
                          isPlaying
                          duration={QUESTION_TIMER}
                          colors={[
                            "#ffc400",
                            "#ffc400",
                            "#0fb800",
                            "#0fb800",
                            "#A30000",
                            "#A30000",
                          ]}
                          colorsTime={[
                            QUESTION_TIMER,
                            QUESTION_TIMER - ANSWER_NOT_ALLOWED_TIMER,
                            QUESTION_TIMER - ANSWER_NOT_ALLOWED_TIMER,
                            3,
                            3,
                            0,
                          ]}
                          onComplete={() => {
                            changeQuestion();
                            return { shouldRepeat: true, delay: 0 };
                          }}
                          onUpdate={(remainingTime) => {
                            if (!playerAllowedToAnswer) {
                              const diff =
                                QUESTION_TIMER - ANSWER_NOT_ALLOWED_TIMER;
                              if (diff > 0) {
                                if (remainingTime > diff) return;
                              }
                              setPlayerAllowedToAnswer(true);
                            }
                          }}
                        >
                          {({ remainingTime }) => remainingTime}
                        </CountdownCircleTimer>
                      </div>
                    </Row>

                    <Row className="flex-center">{`Question ${
                      currentQuestionIndex + 1
                    }/${questions.length}`}</Row>

                    <Question question={questions[currentQuestionIndex]} />

                    <AnswerGroup
                      answers={allAnswers[currentQuestionIndex].split("\n")}
                      playerAllowedToAnswer={playerAllowedToAnswer}
                      onSelect={answerSelectHandler}
                    />
                  </Container>
                </>
              )}

            {currentQuestionIndex >= questions.length &&
              currentQuestionIndex >= allAnswers.length && (
                <Results results={selectedAnswers} />
              )}
          </Card>

          <Button variant="primary" href="/">
            PLAY AGAIN
          </Button>
        </div>
      )}
    </>
  );
}
