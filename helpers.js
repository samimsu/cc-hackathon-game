//some global variables
let gameState = {
  moveCount: 0,
};

let startingBoard = [];

function setStartingBoard(rows, columns) {
  startingBoard = [];
  for (let i = 0; i < rows * columns; i++) {
    if (i === rows * columns - 1) {
      return startingBoard.push("blank");
    }
    startingBoard.push(String(i + 1));
  }
}

// const startingBoard = [
//   "1",
//   "2",
//   "3",
//   "4",
//   "5",
//   "6",
//   "7",
//   "8",
//   "9",
//   "10",
//   "11",
//   "12",
//   "13",
//   "14",
//   "15",
//   "blank",
// ];

//helper function to display the first board

function displayBoard(board, rows, columns, tileWidth, tileHeight) {
  for (let i = 0; i < rows; i++) {
    const xVal = i * tileWidth + 100;
    for (let j = 0; j < columns; j++) {
      const yVal = j * tileHeight + 100;
      gameState.tiles.create(xVal, yVal, board[rows * j + i]);
    }
  }
}

//standalone helper functions to do stuff

function getTiles() {
  return gameState.tiles.getChildren();
}

function generateRandomBoard(startingBoard, rows, columns) {
  let board = [...startingBoard];
  for (let i = 0; i < 1000; i++) {
    let rand = Math.floor(Math.random() * 4);
    if (rand === 0) {
      handleRight(board, columns);
    } else if (rand === 1) {
      handleLeft(board, columns);
    } else if (rand === 2) {
      handleUp(board, rows, columns);
    } else {
      handleDown(board, rows, columns);
    }
  }
  return board;
}

//standalone helper functions to move tiles
function handleRight(board, columns) {
  const emptySquareIndex = board.findIndex((item) => item === "blank");
  if (emptySquareIndex % columns === 0) {
    return;
  } else {
    board[emptySquareIndex] = board[emptySquareIndex - 1];
    board[emptySquareIndex - 1] = "blank";

    game.sound.play("click");
  }
}
function slideRight(columns) {
  if (gameState.tweening) return;
  gameState.tweening = true;
  const emptySquare = getTiles().find((tile) => tile.texture.key === "blank");
  const emptySquareSlot = emptySquare.slot;
  if (emptySquareSlot % columns === 0) {
    return (gameState.tweening = false);
  } else {
    const tileToTheLeft = getTiles().find(
      (tile) => tile.slot === emptySquareSlot - 1
    );
    gameState.tweenRight(emptySquare, tileToTheLeft);
    emptySquare.slot = emptySquareSlot - 1;
    tileToTheLeft.slot = emptySquareSlot;
    gameState.moveCount++;
    game.sound.play("click");
  }
}

function handleLeft(board, columns) {
  const emptySquareIndex = board.findIndex((item) => item === "blank");
  if ((emptySquareIndex + 1) % columns === 0) {
    return;
  } else {
    board[emptySquareIndex] = board[emptySquareIndex + 1];
    board[emptySquareIndex + 1] = "blank";
    game.sound.play("click");
  }
}

function slideLeft(columns) {
  if (gameState.tweening) return;
  gameState.tweening = true;
  const emptySquare = getTiles().find((tile) => tile.texture.key === "blank");
  const emptySquareSlot = emptySquare.slot;
  if ((emptySquareSlot + 1) % columns === 0) {
    return (gameState.tweening = false);
  } else {
    const tileToTheRight = getTiles().find(
      (tile) => tile.slot === emptySquareSlot + 1
    );
    gameState.tweenLeft(emptySquare, tileToTheRight);
    emptySquare.slot = emptySquareSlot + 1;
    tileToTheRight.slot = emptySquareSlot;
    gameState.moveCount++;
    game.sound.play("click");
  }
}

function handleUp(board, rows, columns) {
  const emptySquareIndex = board.findIndex((item) => item === "blank");
  if (emptySquareIndex > 14) {
    return;
  } else {
    board[emptySquareIndex] = board[emptySquareIndex + 5];
    board[emptySquareIndex + 5] = "blank";
    game.sound.play("click");
  }
}

function slideUp(rows, columns) {
  if (gameState.tweening) return;
  gameState.tweening = true;
  const emptySquare = getTiles().find((tile) => tile.texture.key === "blank");
  const emptySquareSlot = emptySquare.slot;
  if (emptySquareSlot > 14) {
    return (gameState.tweening = false);
  } else {
    const tileBelow = getTiles().find(
      (tile) => tile.slot === emptySquareSlot + 5
    );
    gameState.tweenUp(emptySquare, tileBelow);
    emptySquare.slot = emptySquareSlot + 5;
    tileBelow.slot = emptySquareSlot;
    game.sound.play("click");
    gameState.moveCount++;
  }
  return emptySquare;
}

function handleDown(board, rows, columns) {
  const emptySquareIndex = board.findIndex((item) => item === "blank");
  if (emptySquareIndex < 5) {
    return;
  } else {
    board[emptySquareIndex] = board[emptySquareIndex - 5];
    board[emptySquareIndex - 5] = "blank";
    game.sound.play("click");
  }
}

function slideDown(rows) {
  if (gameState.tweening) return;
  gameState.tweening = true;
  const emptySquare = getTiles().find((tile) => tile.texture.key === "blank");
  const emptySquareSlot = emptySquare.slot;
  if (emptySquareSlot < 5) {
    return (gameState.tweening = false);
  } else {
    const tileAbove = getTiles().find(
      (tile) => tile.slot === emptySquareSlot - 5
    );
    gameState.tweenDown(emptySquare, tileAbove);
    emptySquare.slot = emptySquareSlot - 5;
    tileAbove.slot = emptySquareSlot;
    game.sound.play("click");
    gameState.moveCount++;
  }
  return emptySquare;
}

function isWin(board) {
  let matches = 0;

  for (i = 0; i < getTiles().length; i++) {
    if ((getTiles()[i].slot + 1).toString() === getTiles()[i].texture.key) {
      matches++;
    } else if (
      getTiles()[i].texture.key === "blank" &&
      getTiles()[i].slot === getTiles().length - 1
    ) {
      matches++;
    }
  }
  if (matches === getTiles().length) {
    return true;
  }
  return false;
}

function setTweeningFalse() {
  gameState.tweening = false;
}
