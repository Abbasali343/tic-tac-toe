import { useState } from "react";
import StatusModal from "./StatusModal";
import Square from "./Square";
import "../assets/css/Table.css";
import {
  checkWinner,
  checkDraw,
  checkFreeSquares,
  findEasyAiMove,
  findMediumMove,
  findHardMove,
  humanPlayer,
  aiPlayer,
} from "./Functions/Handlers";

function Table({ boardLength, table, difficultyLevel }) {
  const [board, setBoard] = useState(boardLength);
  const [isX, setIsX] = useState(true);

  // check whether anyone win or game is draw or continue

  const winner = checkWinner(board, table);
  const draw = checkDraw(board);

  let status = "";

  if (winner === humanPlayer) {
    status = "You Win";
  } else if (winner === aiPlayer) {
    status = "You Lose";
  } else if (draw) {
    status = "Game is Draw";
  }

  // function to determine player's move

  async function handleClick(i) {
    if (checkWinner(board, table) || checkDraw(board) || board[i]) {
      return;
    }
    board[i] = humanPlayer;
    setBoard(board);
    setIsX(!isX);
    if (checkWinner(board, table)) {
      return;
    }

    const bestMove =
      difficultyLevel === "low"
        ? findEasyAiMove(board)
        : difficultyLevel === "medium"
        ? findMediumMove(board, table)
        : findHardMove(board, table);
    AiMove(bestMove);
  }

  // function to perform Ai's move

  function AiMove(index) {
    if (board[index] || index >= board.length) {
      return;
    }
    board[index] = aiPlayer;
    setBoard(board);
    setIsX(!isX);
  }

  // function to restart the game

  function handleRestart() {
    status = "";
    setIsX(true);
    setBoard(Array(table * table).fill(null));
  }

  return (
    <>
      <div className="sub_container">
        {status !== "" ? (
          <StatusModal status={status} closeModal={handleRestart} />
        ) : null}
        <div className="grid_container">
          {board.map((squares, index) => (
            <Square
              value={board[index]}
              index={index}
              onSelect={handleClick}
              table={table}
              key={index}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Table;
