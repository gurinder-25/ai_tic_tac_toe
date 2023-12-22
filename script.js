const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const EMPTY = '';
const HUMAN = 'X';
const AI = 'O';

function checkWinner(board, player) {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] === player && board[b] === player && board[c] === player) {
      return true;
    }
  }
  return false;
}

function isBoardFull(board) {
  return board.every(cell => cell !== EMPTY);
}

function minimax(board, depth, maximizingPlayer) {
  if (checkWinner(board, HUMAN)) {
    return -10 + depth;
  }
  if (checkWinner(board, AI)) {
    return 10 - depth;
  }
  if (isBoardFull(board)) {
    return 0;
  }

  if (maximizingPlayer) {
    let maxEval = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === EMPTY) {
        board[i] = AI;
        maxEval = Math.max(maxEval, minimax(board, depth + 1, false));
        board[i] = EMPTY;
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === EMPTY) {
        board[i] = HUMAN;
        minEval = Math.min(minEval, minimax(board, depth + 1, true));
        board[i] = EMPTY;
      }
    }
    return minEval;
  }
}

function bestMove() {
  let bestScore = -Infinity;
  let move;

  for (let i = 0; i < boardState.length; i++) {
    if (boardState[i] === EMPTY) {
      boardState[i] = AI;
      let score = minimax(boardState, 0, false);
      boardState[i] = EMPTY;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  return move;
}

let boardState = Array(9).fill(EMPTY);

function makeMove(cell) {
  const cellIndex = Array.from(cells).indexOf(cell);

  if (boardState[cellIndex] === EMPTY) {
    cell.textContent = HUMAN;
    boardState[cellIndex] = HUMAN;

    if (checkWinner(boardState, HUMAN)) {
      setTimeout(() => {
        alert('You win!');
        resetBoard();
      }, 100);
    } else if (isBoardFull(boardState)) {
      setTimeout(() => {
        alert('It\'s a tie!');
        resetBoard();
      }, 100);
    } else {
      const aiMoveIndex = bestMove();
      boardState[aiMoveIndex] = AI;
      cells[aiMoveIndex].textContent = AI;

      if (checkWinner(boardState, AI)) {
        setTimeout(() => {
          alert('AI wins!');
          resetBoard();
        }, 100);
      } else if (isBoardFull(boardState)) {
        setTimeout(() => {
          alert('It\'s a tie!');
          resetBoard();
        }, 100);
      }
    }
  }
}

function resetBoard() {
  boardState = Array(9).fill(EMPTY);
  cells.forEach(cell => cell.textContent = EMPTY);
}

for (const cell of cells) {
  cell.addEventListener('click', () => makeMove(cell));
}