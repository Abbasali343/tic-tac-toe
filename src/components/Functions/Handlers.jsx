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
  const humanWinIndex = humanWinningMove(humanPlayer, 2, table, board);

  if (humanWinIndex) {
    return humanWinIndex;
  }

  const emptySquares = checkFreeSquares(board);

  const randomMove =
    emptySquares[Math.ceil(Math.random() * emptySquares.length)];

  return randomMove;
}

// function to find Ai Move for Hard Level Difficulty

export function findHardMove(board, table) {
  const blockHuman = humanBlockMove(humanPlayer, 1, table, board);
  const aiWinIndex = aiWinningMove(aiPlayer, 2, table, board);
  const humanWinIndex = humanWinningMove(humanPlayer, 2, table, board);

  if (aiWinIndex !== undefined) {
    return aiWinIndex;
  } else if (humanWinIndex !== undefined) {
    return humanWinIndex;
  } else if (blockHuman !== undefined) {
    return blockHuman;
  }
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

// function to make hard level pattern to compare with winning patterns

function makeContinuePattern(player, depth, table) {
  let values = [];
  for (let i = 0; i < table; i++) {
    values.push(player);
  }
  for (let i = depth; i < values.length; i++) {
    values[i] = null;
  }

  return values;
}

// function to make the winning patterns and make patterns

function checkHardPatterns(player, depth, table, board) {
  let finalResult = [];
  const values = makeContinuePattern(player, depth, table);
  const winningPatterns = generateWinningPatterns(table);
  const filteredPatterns = winningPatterns.filter((squareIndexes) => {
    const squareValues = squareIndexes.map((index) => board[index]);
    const result =
      JSON.stringify(values.sort()) === JSON.stringify(squareValues.sort());
    if (result) {
      finalResult.push({
        squareIndexes,
      });
    }
  });
  return finalResult;
}

// function for pattern's comparison between winning and the comparison patterns

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

// function to check whether the human is about to win

function humanWinningMove(humanPlayer, depth, table, board) {
  const winIndex = checkPatterns(humanPlayer, depth, table, board);
  if (winIndex !== undefined) {
    const length = winIndex.squareIndexes.length;
    for (let i = 0; i < length; i++) {
      if (board[winIndex.squareIndexes[i]] === null) {
        return winIndex.squareIndexes[i];
      }
    }
  }
}

// function to check whether the ai is about to win

function aiWinningMove(aiPlayer, depth, table, board) {
  const loseIndex = checkPatterns(aiPlayer, depth, table, board);
  if (loseIndex !== undefined) {
    const length = loseIndex.squareIndexes.length;
    for (let i = 0; i < length; i++) {
      if (board[loseIndex.squareIndexes[i]] === null) {
        return loseIndex.squareIndexes[i];
      }
    }
  }
}

// function to start blocking human on its first attempt

function humanBlockMove(humanPlayer, depth, table, board) {
  const continueLines = checkHardPatterns(humanPlayer, depth, table, board);
  if (continueLines !== undefined) {
    const randomMove =
      continueLines[Math.floor(Math.random() * continueLines.length)];

    if (randomMove !== undefined) {
      const firstBlock = randomMove.squareIndexes;
      let freeIndexes = [];
      for (let i = 0; i < firstBlock.length; i++) {
        if (board[firstBlock[i]] === null) {
          freeIndexes.push(firstBlock[i]);
        }
      }

      const randomIndex =
        freeIndexes[Math.floor(Math.random() * freeIndexes.length)];

      return randomIndex;
    }
  }
}
