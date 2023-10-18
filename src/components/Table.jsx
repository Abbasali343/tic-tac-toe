import { useState } from "react";
import Square from "./Square";
import "../assets/css/Table.css";
import {
  checkWinner,
  checkDraw,
  checkFreeSquares,
  findEasyAiMove,
  findMediumMove,
  humanPlayer,
  aiPlayer,
} from "./Functions/Handlers";

function Table({ table, playerName, difficultyLevel }) {
  const boardLength = table * table;
  const [board, setBoard] = useState(Array(boardLength).fill(null));
  const [isX, setIsX] = useState(true);

  const winner = checkWinner(board, table);
  const draw = checkDraw(board);

  let status;

  if (winner === humanPlayer) {
    status = `Winner is : ${playerName}`;
  } else if (winner === aiPlayer) {
    status = `Winner is : Computer`;
  } else if (draw) {
    status = `Game is Draw`;
  } else {
    status = `${playerName} will start`;
  }

  //function to determine the Ai's move

  //   function minimax(newBoard, player) {
  //     const availableSpots = checkFreeSquares(newBoard);
  //     if (checkWinner(newBoard, table) === humanPlayer) {
  //       return { score: -10 };
  //     } else if (checkWinner(newBoard, table) === aiPlayer) {
  //       return { score: 10 };
  //     } else if (availableSpots.length === 0) {
  //       return { score: 0 };
  //     }

  //     let moves = [];

  //     for (let i = 0; i < availableSpots.length; i++) {
  //       let move = {};
  //       move.index = availableSpots[i];
  //       newBoard[availableSpots[i]] = player;

  //       if (player === aiPlayer) {
  //         let result = minimax(newBoard, humanPlayer);
  //         if (result) {
  //           move.score = result.score;
  //         }
  //       } else {
  //         let result = minimax(newBoard, aiPlayer);
  //         if (result) {
  //           move.score = result.score;
  //         }
  //       }
  //       newBoard[availableSpots[i]] = null;
  //       moves.push(move);
  //     }

  //     let bestMove;
  //     if (player === aiPlayer) {
  //       let bestScore = -10000;
  //       for (let i = 0; i < moves.length; i++) {
  //         if (moves[i].score > bestScore) {
  //           bestScore = moves[i].score;
  //           bestMove = i;
  //         }
  //       }
  //     } else {
  //       let bestScore = 10000;
  //       for (let i = 0; i < moves.length; i++) {
  //         if (moves[i].score < bestScore) {
  //           bestScore = moves[i].score;
  //           bestMove = i;
  //         }
  //       }
  //     }
  //     return moves[bestMove];
  //   }

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

    // const bestMove = findEasyAiMove(board);
    const bestMove =
      difficultyLevel === "low"
        ? findEasyAiMove(board)
        : findMediumMove(board, table);

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

  return (
    <>
      <div className="sub_container">
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
        <p>{status}</p>
      </div>
    </>
  );
}

export default Table;
