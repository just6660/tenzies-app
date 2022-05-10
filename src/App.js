import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(createRandomDiceArr());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You won!");
    }
  }, [dice]);

  function createRandomDiceArr() {
    const dice_arr = [];
    for (let i = 0; i < 10; i++) {
      let random_num = Math.floor(Math.random() * 6 + 1);
      dice_arr.push({
        value: random_num,
        isHeld: false,
        id: nanoid(),
      });
    }
    return dice_arr;
  }

  function rollDice() {
    if (tenzies) {
      setDice(createRandomDiceArr());
      setTenzies(false);
    } else {
      setDice((oldDice) => {
        return oldDice.map((die) => {
          return die.isHeld
            ? die
            : {
                value: Math.floor(Math.random() * 6 + 1),
                isHeld: false,
                id: nanoid(),
              };
        });
      });
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-btn" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
