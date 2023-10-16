import { useState } from "react";
import Square from "./Square";
import "../assets/css/Table7.css";

export default function TableWith7({ playerName, table }) {
  const [values, setValues] = useState(Array(49).fill(null));
  const [isX, setIsX] = useState(true);

  function calculateWinner(values) {
    const winningPatterns = [
      [0, 1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12, 13],
      [14, 15, 16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25, 26, 27],
      [28, 29, 30, 31, 32, 33, 34],
      [35, 36, 37, 38, 39, 40, 41],
      [42, 43, 44, 45, 46, 47, 48],
      [0, 7, 14, 21, 28, 35, 42],
      [1, 8, 15, 22, 29, 36, 43],
      [2, 9, 16, 23, 30, 37, 44],
      [3, 10, 17, 24, 31, 38, 45],
      [4, 11, 18, 25, 32, 39, 46],
      [5, 12, 19, 26, 33, 40, 47],
      [6, 13, 20, 27, 34, 41, 48],
      [0, 8, 16, 24, 32, 40, 48],
      [6, 12, 18, 24, 30, 36, 42],
    ];

    for (let i = 0; i < winningPatterns.length; i++) {
      const [a, b, c, d, e, f, g] = winningPatterns[i];
      if (
        values[a] &&
        values[a] === values[b] &&
        values[a] === values[c] &&
        values[a] === values[d] &&
        values[a] === values[e] &&
        values[a] === values[f] &&
        values[a] === values[g]
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
    setValues(Array(49).fill(null));
  }

  const renderSquare = (i) => {
    return (
      <Square
        value={values[i]}
        index={i}
        onSelect={handleClick}
        table={table}
      />
    );
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
            {renderSquare(5)}
            {renderSquare(6)}
          </div>
          <div className="square_container">
            {renderSquare(7)}
            {renderSquare(8)}
            {renderSquare(9)}
            {renderSquare(10)}
            {renderSquare(11)}
            {renderSquare(12)}
            {renderSquare(13)}
          </div>
          <div className="square_container">
            {renderSquare(14)}
            {renderSquare(15)}
            {renderSquare(16)}
            {renderSquare(17)}
            {renderSquare(18)}
            {renderSquare(19)}
            {renderSquare(20)}
          </div>
          <div className="square_container">
            {renderSquare(21)}
            {renderSquare(22)}
            {renderSquare(23)}
            {renderSquare(24)}
            {renderSquare(25)}
            {renderSquare(26)}
            {renderSquare(27)}
          </div>
          <div className="square_container">
            {renderSquare(28)}
            {renderSquare(29)}
            {renderSquare(30)}
            {renderSquare(31)}
            {renderSquare(32)}
            {renderSquare(33)}
            {renderSquare(34)}
          </div>
          <div className="square_container">
            {renderSquare(35)}
            {renderSquare(36)}
            {renderSquare(37)}
            {renderSquare(38)}
            {renderSquare(39)}
            {renderSquare(40)}
            {renderSquare(41)}
          </div>
          <div className="square_container">
            {renderSquare(42)}
            {renderSquare(43)}
            {renderSquare(44)}
            {renderSquare(45)}
            {renderSquare(46)}
            {renderSquare(47)}
            {renderSquare(48)}
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
