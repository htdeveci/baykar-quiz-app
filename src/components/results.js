import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import classes from "@/styles/Results.module.css";

export default function Results({ results }) {
  return (
    <Container className={classes.container}>
      <Row className={classes.labelsRow}>
        <Col className={classes.labelCol}>
          <label>Question</label>
        </Col>
        <Col className={classes.labelCol}>
          <label>Selected Answer</label>
        </Col>
      </Row>

      {results.map((result, index) => {
        return (
          <Row key={index} className={classes.resultsRow}>
            <Col className={classes.resultCol}>
              <label>{index + 1}</label>
            </Col>
            <Col className={classes.resultCol}>{result ? result : "-"}</Col>
          </Row>
        );
      })}
    </Container>
  );
}
