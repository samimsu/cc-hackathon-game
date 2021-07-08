const startingBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, " "];

function generateRandomBoard(startingBoard) {
  let board = [...startingBoard];
  for (let i = 0; i < 1000; i++) {
    let rand = Math.floor(Math.random() * 4);
    if (rand === 0) {
      handleRight(board);
    } else if (rand === 1) {
      handleLeft(board);
    } else if (rand === 2) {
      handleUp(board);
    } else {
      handleDown(board);
    }
  }
  return board;
}

function displayBoard(board) {
  for (let i = 0; i < 15; i += 4) {
    const num1 = board[i] < 10 ? " " + board[i] : board[i];
    const num2 = board[i + 1] < 10 ? " " + board[i + 1] : board[i + 1];
    const num3 = board[i + 2] < 10 ? " " + board[i + 2] : board[i + 2];
    const num4 = board[i + 3] < 10 ? " " + board[i + 3] : board[i + 3];
    console.log(num1, num2, num3, num4);
  }
}

function handleRight(board) {
  const emptySquareIndex = board.findIndex((item) => item === " ");
  if (emptySquareIndex % 4 === 0) {
    return;
  } else {
    board[emptySquareIndex] = board[emptySquareIndex - 1];
    board[emptySquareIndex - 1] = " ";
  }
}

function handleLeft(board) {
  const emptySquareIndex = board.findIndex((item) => item === " ");
  if ((emptySquareIndex + 1) % 4 === 0) {
    return;
  } else {
    board[emptySquareIndex] = board[emptySquareIndex + 1];
    board[emptySquareIndex + 1] = " ";
  }
}

function handleUp(board) {
  const emptySquareIndex = board.findIndex((item) => item === " ");
  if (emptySquareIndex > 11) {
    return;
  } else {
    board[emptySquareIndex] = board[emptySquareIndex + 4];
    board[emptySquareIndex + 4] = " ";
  }
}

function handleDown(board) {
  const emptySquareIndex = board.findIndex((item) => item === " ");
  if (emptySquareIndex < 4) {
    return;
  } else {
    board[emptySquareIndex] = board[emptySquareIndex - 4];
    board[emptySquareIndex - 4] = " ";
  }
}

function isWin(board) {
  if (JSON.stringify(board) === JSON.stringify(startingBoard)) {
    return true;
  }
  return false;
}

function playGame() {
  console.log("generating board...");
  let board = generateRandomBoard(startingBoard);
  displayBoard(board);

  const readline = require("readline");
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.on("keypress", (str, key) => {
    if (key.ctrl && key.name === "c") {
      process.exit();
    } else if (key.name === "right") {
      console.log("sliding right");
      handleRight(board);
    } else if (key.name === "left") {
      console.log("sliding left");
      handleLeft(board);
    } else if (key.name === "up") {
      console.log("sliding up");
      handleUp(board);
    } else if (key.name === "down") {
      console.log("sliding down");
      handleDown(board);
    } else {
      console.log(`You pressed the "${key.name}" key`);
      console.log();
      console.log(key);
      console.log();
    }
    displayBoard(board);
    if (isWin(board)) {
      console.log("you won");
      process.exit();
    }
  });
  console.log("Press any key...");
}

playGame();
