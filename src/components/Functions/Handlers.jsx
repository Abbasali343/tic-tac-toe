export default function Handlers() {}

// player's symbols. player is X and Ai is O
export const humanPlayer = "X";
export const aiPlayer = "O";

// function to check the winner

export function checkWinner(board, table) {
  const playerWon = checkPatterns(humanPlayer, 3, table, board);
  const aiWon = checkPatterns(aiPlayer, 3, table, board);

  if (playerWon !== undefined) {
    if (playerWon.result) {
      return humanPlayer;
    }
  }
  if (aiWon !== undefined) {
    if (aiWon.result) {
      return aiPlayer;
    }
  }
  return null;
}

// function to make pattern to compare with winning patterns

function makePattern(player, depth, table) {
  let values = [];
  for (let i = 0; i < table; i++) {
    values.push(player);
  }
  if (depth === 3) {
    return values;
  } else {
    values.pop();
    values.push(null);
    return values;
  }
}

// function to make the winning patterns and make patterns

function checkPatterns(player, depth, table, board) {
  let finalResult = [];
  let values = makePattern(player, depth, table);
  const winningPatterns = generateWinningPatterns(table);
  const filteredPatterns = winningPatterns.filter((squareIndexes) => {
    const squareValues = squareIndexes.map((index) => board[index]);
    const result =
      JSON.stringify(values.sort()) === JSON.stringify(squareValues.sort());
    if (result) {
      finalResult.push({
        result,
        squareIndexes,
      });
    }
  });
  if (filteredPatterns.length > 0) {
    return finalResult;
  } else {
    return finalResult[0];
  }
}

// function to check if the game is draw

export function checkDraw(board) {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      return null;
    }
  }
  return 1;
}

// function to check remaining spaces in the game board

export function checkFreeSquares(board) {
  let squares = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      squares.push(i);
    }
  }
  return squares;
}

// function to find Ai Move for Easy Level Difficulty

export function findEasyAiMove(board) {
  const emptySquares = checkFreeSquares(board);

  const randomMove =
    emptySquares[Math.ceil(Math.random() * emptySquares.length)];
  return randomMove;
}

// function to find Ai Move for Medium Level Difficulty

export function findMediumMove(board, table) {
  const winIndex = checkPatterns(humanPlayer, 2, table, board);
  if (winIndex !== undefined) {
    const length = winIndex.squareIndexes.length;
    for (let i = 0; i < length; i++) {
      if (board[winIndex.squareIndexes[i]] === null) {
        return winIndex.squareIndexes[i];
      }
    }
  }

  const emptySquares = checkFreeSquares(board);

  const randomMove =
    emptySquares[Math.ceil(Math.random() * emptySquares.length)];

  return randomMove;
}

//function used for the making of winning patterns according the table length

function generateWinningPatterns(boardSize) {
  const patterns = [];

  // Rows
  for (let row = 0; row < boardSize; row++) {
    const pattern = [];
    for (let col = 0; col < boardSize; col++) {
      pattern.push(row * boardSize + col);
    }
    patterns.push(pattern);
  }

  // Columns
  for (let col = 0; col < boardSize; col++) {
    const pattern = [];
    for (let row = 0; row < boardSize; row++) {
      pattern.push(row * boardSize + col);
    }
    patterns.push(pattern);
  }

  // Diagonals
  const diagonal1 = [];
  const diagonal2 = [];
  for (let i = 0; i < boardSize; i++) {
    diagonal1.push(i * boardSize + i);
    diagonal2.push(i * boardSize + (boardSize - i - 1));
  }
  patterns.push(diagonal1, diagonal2);

  return patterns;
}
