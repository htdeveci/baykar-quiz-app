import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import classes from "@/styles/AnswerGroup.module.css";
import Card from "./card";

export default function AnswerGroup({
  playerAllowedToAnswer = false,
  answers,
  onSelect,
}) {
  const answerSelectHandler = (selectedAnswer) => {
    onSelect(selectedAnswer);
  };

  return (
    <Row xs={1} lg={2} className={classes.container}>
      {answers.map((answer) => {
        return (
          <Col key={answer}>
            {playerAllowedToAnswer && (
              <Card onClick={answerSelectHandler.bind(this, answer)}>
                <label>{answer}</label>
              </Card>
            )}
            {!playerAllowedToAnswer && (
              <Card>
                <label>{answer}</label>
              </Card>
            )}
          </Col>
        );
      })}
    </Row>
  );
}
