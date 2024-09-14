import { useEffect, useState } from "react";
import Box from "./Box";
import Confetti from "react-confetti";

function Board() {
  const [boxes, setBoxes] = useState(Array(9).fill(""));
  const [curSign, setCurSign] = useState("o");
  const [winner, setWinner] = useState("");
  const [isMatchDraw, setMatchDraw] = useState(false);

  const checkForWinner = () => {
    const winnerPositon = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winnerPositon.length; i++) {
      const [pos1, pos2, pos3] = winnerPositon[i];
      if (
        boxes[pos1] !== "" &&
        boxes[pos1] === boxes[pos2] &&
        boxes[pos2] === boxes[pos3]
      ) {
        setWinner(boxes[pos1]);
        break;
      }
    }
  };
  const checkForDraw = () => {
    const allChecked = boxes.filter((box) => box === "").length === 0;
    if (winner === "" && allChecked) {
      setMatchDraw(true);
    }
  };

  const addSign = (idx) => {
    if (boxes[idx] !== "" || winner !== "") {
      return;
    }

    const newBoxes = boxes.slice();
    newBoxes[idx] = curSign;
    setBoxes(newBoxes);
    setCurSign(curSign === "o" ? "x" : "o");
  };
  const restart = () => {
    setBoxes(Array(9).fill(""));
    setWinner("");
    setCurSign("");
    setMatchDraw(false);
  };
  useEffect(() => {
    checkForWinner();
    checkForDraw();
  }, [boxes]);

  return (
    <>
      {winner !== "" && <Confetti />}
      {winner !== "" && <h1>winner is {winner}!!</h1>}
      {isMatchDraw && <h1>Match Draw!!</h1>}

      <div className="board">
        {boxes.map((boxValues, idx) => (
          <Box sign={boxValues} addSign={() => addSign(idx)} />
        ))}
        <button onClick={restart}>Restart</button>
      </div>
    </>
  );
}

export default Board;
