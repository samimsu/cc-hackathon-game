//some global variables
const gameState = {
  moveCount: 0,
};

const slots = {
  0: { x: 50, y: 50 },
  1: { x: 100, y: 50 },
  2: { x: 150, y: 50 },
  3: { x: 200, y: 50 },
  4: { x: 50, y: 100 },
  5: { x: 100, y: 100 },
  6: { x: 150, y: 100 },
  7: { x: 200, y: 100 },
  8: { x: 50, y: 150 },
  9: { x: 100, y: 150 },
  10: { x: 150, y: 150 },
  11: { x: 200, y: 150 },
  12: { x: 50, y: 200 },
  13: { x: 50, y: 200 },
  14: { x: 50, y: 200 },
  15: { x: 200, y: 200 },
};
const startingBoard = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "blank",
];

//helper function to display the first board

function displayBoard(board) {
  for (let i = 0; i < 4; i++) {
    const xVal = i * 50 + 100;
    for (let j = 0; j < 4; j++) {
      const yVal = j * 50 + 100;
      if (board[4 * j + i] === "blank") {
        gameState.tiles.create(xVal, yVal, board[4 * j + i]).setScale(0.6);
      } else {
        gameState.tiles.create(xVal, yVal, board[4 * j + i]);
      }
    }
  }
}

//standalone helper functions to do stuff

function getTiles() {
  return gameState.tiles.getChildren();
}

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

//standalone helper functions to move tiles
function handleRight(board) {
  const emptySquareIndex = board.findIndex((item) => item === "blank");
  if (emptySquareIndex % 4 === 0) {
    return;
  } else {
    board[emptySquareIndex] = board[emptySquareIndex - 1];
    board[emptySquareIndex - 1] = "blank";

    game.sound.play("click");
  }
}
function slideRight() {
  if (gameState.tweening) return;
  gameState.tweening = true;
  const emptySquare = getTiles().find((tile) => tile.texture.key === "blank");
  const emptySquareSlot = emptySquare.slot;
  if (emptySquareSlot % 4 === 0) {
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

function handleLeft(board) {
  const emptySquareIndex = board.findIndex((item) => item === "blank");
  if ((emptySquareIndex + 1) % 4 === 0) {
    return;
  } else {
    board[emptySquareIndex] = board[emptySquareIndex + 1];
    board[emptySquareIndex + 1] = "blank";
    game.sound.play("click");
  }
}

function slideLeft() {
  if (gameState.tweening) return;
  gameState.tweening = true;
  const emptySquare = getTiles().find((tile) => tile.texture.key === "blank");
  const emptySquareSlot = emptySquare.slot;
  if ((emptySquareSlot + 1) % 4 === 0) {
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

function handleUp(board) {
  const emptySquareIndex = board.findIndex((item) => item === "blank");
  if (emptySquareIndex > 11) {
    return;
  } else {
    board[emptySquareIndex] = board[emptySquareIndex + 4];
    board[emptySquareIndex + 4] = "blank";
    game.sound.play("click");
  }
}

function slideUp() {
  if (gameState.tweening) return;
  gameState.tweening = true;
  const emptySquare = getTiles().find((tile) => tile.texture.key === "blank");
  const emptySquareSlot = emptySquare.slot;
  if (emptySquareSlot > 11) {
    return (gameState.tweening = false);
  } else {
    const tileBelow = getTiles().find(
      (tile) => tile.slot === emptySquareSlot + 4
    );
    gameState.tweenUp(emptySquare, tileBelow);
    emptySquare.slot = emptySquareSlot + 4;
    tileBelow.slot = emptySquareSlot;
    game.sound.play("click");
    gameState.moveCount++;
  }
  return emptySquare;
}

function handleDown(board) {
  const emptySquareIndex = board.findIndex((item) => item === "blank");
  if (emptySquareIndex < 4) {
    return;
  } else {
    board[emptySquareIndex] = board[emptySquareIndex - 4];
    board[emptySquareIndex - 4] = "blank";
    game.sound.play("click");
  }
}

function slideDown() {
  if (gameState.tweening) return;
  gameState.tweening = true;
  const emptySquare = getTiles().find((tile) => tile.texture.key === "blank");
  const emptySquareSlot = emptySquare.slot;
  if (emptySquareSlot < 4) {
    return (gameState.tweening = false);
  } else {
    const tileAbove = getTiles().find(
      (tile) => tile.slot === emptySquareSlot - 4
    );
    gameState.tweenDown(emptySquare, tileAbove);
    emptySquare.slot = emptySquareSlot - 4;
    tileAbove.slot = emptySquareSlot;
    game.sound.play("click");
    gameState.moveCount++;
  }
  return emptySquare;
}

function isWin(board) {
  /* if (JSON.stringify(board) === JSON.stringify(startingBoard)) {
      return true;
    }
    return false;*/
  let matches = 0;

  for (i = 0; i < getTiles().length; i++) {
    if ((getTiles()[i].slot + 1).toString() === getTiles()[i].texture.key) {
      matches++;
    } else if (
      getTiles()[i].texture.key === "blank" &&
      getTiles()[i].slot === 15
    ) {
      matches++;
    }
  }
  if (matches === 16) {
    return true;
  }
  return false;
}

function setTweeningFalse() {
  gameState.tweening = false;
}
