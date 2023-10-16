export default function Handlers() {}


// player's symbols. player is X and Ai is O
export const humanPlayer = "X";
export const aiPlayer = "O";


// function to check the winner

export function checkWinner(board, table) {
  let start = 0;
  let counter = parseInt(table);
  let end = counter;
  let hrLimit = counter * counter;
  let diagonalLimit = hrLimit - (counter - 1);

  for (let i = 0; i < counter; i++) {
    let result = [];
    for (let j = start; j < end; j++) {
      result.push(board[j]);
      start++;
    }
    if (allEqual(result)) {
      return result[0];
    }

    end += counter;
  }

  for (let i = 0; i < counter; i++) {
    let result = [];
    for (let j = i; j < hrLimit; j += counter) {
      result.push(board[j]);
    }
    if (allEqual(result)) {
      return result[0];
    }

    end += counter;
  }

  let result = [];
  for (let j = 0; j < hrLimit; j += counter + 1) {
    result.push(board[j]);
  }
  if (allEqual(result)) {
    return result[0];
  }

  result = [];

  for (let j = counter - 1; j < diagonalLimit; j += counter - 1) {
    result.push(board[j]);
  }
  if (allEqual(result)) {
    return result[0];
  }
}

function allEqual(arr) {
  return arr.every((val) => val === arr[0] && val !== null);
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
