import Row from "react-bootstrap/Row";

import classes from "@/styles/Question.module.css";
import Card from "./card";

export default function Question({ question }) {
  return (
    <Row>
      <Card fullWidth>
        <label className={classes.questionText}>{question}</label>
      </Card>
    </Row>
  );
}
