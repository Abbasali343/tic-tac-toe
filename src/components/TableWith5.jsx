import { useState } from "react";
import Square from "./Square";
import "../assets/css/Table5.css";

export default function TableWith5({ playerName,table }) {
  const [values, setValues] = useState(Array(25).fill(null));
  
  const [isX, setIsX] = useState(true);

  function calculateWinner(values) {
    const winningPatterns = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      [0, 6, 12, 18, 24],
      [4, 8, 12, 16, 20],
    ];

    for (let i = 0; i < winningPatterns.length; i++) {
      const [a, b, c, d, e] = winningPatterns[i];
      if (
        values[a] && 
        values[a] === values[b] &&
        values[a] === values[c] &&
        values[a] === values[d] &&
        values[a] === values[e]
      ) {
        return values[a];
      }
    }
    return null;
  }

  function checkDraw(values) {
    for (let i = 0; i < values.length; i++) {
      if (values[i] === null) {
        return null;
      }
    }
    return 1;
  }

  function handleClick(i) {
    if (calculateWinner(values) || values[i] || checkDraw(values)) {
      return;
    }

    values[i] = "X";
    setValues(values);
    setIsX(!isX);
    AiMove();
  }

  function AiMove() {
    if (calculateWinner(values)) {
      return;
    }

    for (let i = 0; i < values.length; i++) {
      if (values[i] === null) {
        values[i] = "O";
        setValues(values);

        return;
      }
    }
  }

  const winner = calculateWinner(values);
  const draw = checkDraw(values);

  let status;

  if (winner === "X") {
    status = `Winner is : ${playerName}`;
  } else if (winner === "O") {
    status = `Winner is : Computer`;
  } else if (draw) {
    status = `Game is Draw`;
  } else {
    status = `${playerName} will start`;
  }

  function handleRestart() {
    setIsX(true);
    setValues(Array(25).fill(null));
  }

  const renderSquare = (i) => {
    return <Square value={values[i]} index={i} onSelect={handleClick} table={table} />;
  };

  return (
    <>
      <div className="sub_container">
        <div className="grid_container">
          <div className="square_container">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
            {renderSquare(3)}
            {renderSquare(4)}
          </div>
          <div className="square_container">
            {renderSquare(5)}
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
            {renderSquare(9)}
          </div>
          <div className="square_container">
            {renderSquare(10)}
            {renderSquare(11)}
            {renderSquare(12)}
            {renderSquare(13)}
            {renderSquare(14)}
          </div>
          <div className="square_container">
            {renderSquare(15)}
            {renderSquare(16)}
            {renderSquare(17)}
            {renderSquare(18)}
            {renderSquare(19)}
          </div>
          <div className="square_container">
            {renderSquare(20)}
            {renderSquare(21)}
            {renderSquare(22)}
            {renderSquare(23)}
            {renderSquare(24)}
          </div>
          <p className="status">{status}</p>
          <button className="reset_btn" onClick={handleRestart}>
            Restart
          </button>
        </div>
      </div>
    </>
  );
}
