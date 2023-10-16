import { useEffect, useState } from "react";
import Square from "./Square";
import "../assets/css/Table.css";
import { useActionData } from "react-router";

export default function TableWith3({ playerName, table }) {
  
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);

  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkWin(values) {
    for (let i = 0; i < winningPatterns.length; i++) {
      const [a, b, c, d, e] = winningPatterns[i];
      if (values[a] && values[a] === values[b] && values[a] === values[c]) {
        return values[a];
      }
    }
    return null;
  }

  // function checkWin(a, b, c) {
  //   return winningPatterns.filter((indexes) => {
  //     const squareValues = indexes.map((index) => board[index]);
  //     return (
  //       JSON.stringify([a, b, c].sort()) === JSON.stringify(squareValues.sort())
  //     );
  //   });
  // }

  function checkDraw(values) {
    for (let i = 0; i < values.length; i++) {
      if (values[i] === null) {
        return null;
      }
    }
    return 1;
  }

  function calculateWinner(values, symbol) {
    for (let i = 0; i < winningPatterns.length; i++) {
      const [a, b, c] = winningPatterns[i];
      if (values[a] === symbol && values[b] === symbol && values[c] === null) {
        return c;
      } else if (
        values[c] === symbol &&
        values[b] === symbol &&
        values[a] === null
      ) {
        return a;
      } else if (
        values[a] === symbol &&
        values[c] === symbol &&
        values[b] === null
      ) {
        return b;
      }
    }
    return null;
  }

  let winningLines = null;
  winningLines = calculateWinner(board, "O");

  let losingLines = null;
  losingLines = calculateWinner(board, "X");

  // let randomTurn = null;

  // randomTurn =
  //   remainingIndexes[Math.ceil(Math.random() * remainingIndexes.length)];

  // const result =
  //   winningLines ? winningLines:
  //   losingLines ? losingLines :
  //   randomTurn;

  function handleClick(i) {
    if (checkWin(board) || board[i] || checkDraw(board)) {
      return;
    }

    board[i] = "X";
    setBoard(board);
    setIsX(!isX);

    aiMove();
  }

  // function findAiMove() {
  //   if (losingLines) {
  //     return losingLines;
  //   }
  //   if (winningLines && losingLines === null) {
  //     return winningLines;
  //   }
  //   if (randomTurn && (losingLines === null) & (winningLines === null)) {
  //     return randomTurn;
  //   }
  // }

  function aiMove(i) {
    if (checkWin(board) || checkDraw(board)) {
      return;
    }

    if (losingLines || board[losingLines]===null) {
      board[losingLines] = "O";
      setBoard(board);
      return;
    }

    if (winningLines || board[winningLines]===null) {
      board[winningLines] = "O";
      setBoard(board);
      return;
    }

    const cornersAndCenter = [4, 0, 2, 6, 8];

    for (let i = 0; i < cornersAndCenter.length; i++) {
      if (board[cornersAndCenter[i]] === null) {
        console.log(i);
        board[cornersAndCenter[i]] = "O";
        setBoard(board);
        return;
      }
    }
  }

  // function emptyIndexes(board) {
  //   let indexes = [];
  //   for (let i = 0; i < board.length; i++) {
  //     if (board[i] === null) {
  //       indexes.push(i);
  //     }
  //   }
  //   return indexes;
  // }

  function handleRestart() {
    setBoard(Array(9).fill(null));
    setIsX(!isX);
  }

  const winner = checkWin(board);
  const draw = checkDraw(board);
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

  const renderSquare = (i) => {
    return (
      <Square value={board[i]} index={i} onSelect={handleClick} table={table} />
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
          </div>
          <div className="square_container">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="square_container">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
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
