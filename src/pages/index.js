import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import classes from "@/styles/Home.module.css";
import GameController from "./gameController";
import Card from "@/components/card";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);

  const startGameHandler = () => {
    setGameStarted(true);
  };

  return (
    <Container className={classes.container}>
      {!gameStarted && (
        <>
          <Card>
            <div className={classes.welcomeContainer}>
              <h1>Welcome to Quiz App</h1>
              <p>
                <i>
                  Since it is still a demo version, interfaces will be improved
                  in the future.
                </i>
              </p>
              <Button variant="primary" onClick={startGameHandler} size="lg">
                START GAME
              </Button>
            </div>
          </Card>
        </>
      )}

      {gameStarted && (
        <GameController userId={Math.floor(Math.random() * 10) + 1} />
      )}
    </Container>
  );
}
