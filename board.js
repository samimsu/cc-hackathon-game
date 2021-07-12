const config = {
  type: Phaser.AUTO,
  width: 250,
  height: 250,
  backgroundColor: "b9eaff",
  scene: {
    preload,
    create,
    update,
  },
};

const game = new Phaser.Game(config);



function preload() {
  //load the sprites in this format:
  this.load.image("1", "images/tiles/1.png");
  this.load.image("2", "images/tiles/2.png");
  this.load.image("3", "images/tiles/3.png");
  this.load.image("4", "images/tiles/4.png");
  this.load.image("5", "images/tiles/5.png");
  this.load.image("6", "images/tiles/6.png");
  this.load.image("7", "images/tiles/7.png");
  this.load.image("8", "images/tiles/8.png");
  this.load.image("9", "images/tiles/9.png");
  this.load.image("10", "images/tiles/10.png");
  this.load.image("11", "images/tiles/11.png");
  this.load.image("12", "images/tiles/12.png");
  this.load.image("13", "images/tiles/13.png");
  this.load.image("14", "images/tiles/14.png");
  this.load.image("15", "images/tiles/15.png");
  this.load.image("blank", "blank.png");
  this.load.audio('click','click.wav');
}
const gameState = {};
let index = 0;


function create() {
  gameState.active = true;
  

  //make phaser listen for input
  gameState.cursors = this.input.keyboard.createCursorKeys();

  //create game environment
  gameState.tiles = this.add.group();
  game.sound.mute = true;
  let board = generateRandomBoard(startingBoard);
  displayBoard(board);
  gameState.tiles.getChildren().forEach(tile => tile.slot = board.indexOf(tile.texture.key));
  game.sound.mute = false;
  gameState.board = board;
/*
  const slideLeft = function(empty,tile){
      this.tweens.add({
    targets: empty,
    x:+50,
    yoyo:false,
    duration:2000,
    ease:'Sine.easeInOut',
    repeat:0, 
    callbackScope: this
  });*/


  var combo = this.input.keyboard.createCombo(
    [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
    { resetOnMatch: true }
  );

  this.input.keyboard.on("keycombomatch", function (event) {
    console.log("you win");
    gameState.board = [...startingBoard];
    displayBoard(startingBoard);
  });
}




function displayBoard(board) {
  for (let i = 0; i < 4; i++) {
    const xVal = (i + 1) * 50;
    for (let j = 0; j < 4; j++) {
      const yVal = j * 50 + 50;
      if (board[4 * j + i] === "blank") {
        gameState.tiles.create(xVal, yVal, board[4 * j + i]).setScale(0.6);
      } else {
        gameState.tiles.create(xVal, yVal, board[4 * j + i]);
      }
    }
  }
    
  
}

const slots = {
  0: {x:50,y:50},
  1: {x:100,y:50},
  2: {x:150,y:50},
  3: {x:200,y:50},
  4: {x:50,y:100},
  5: {x:100,y:100},
  6: {x:150,y:100},
  7: {x:200,y:100},
  8: {x:50,y:150},
  9: {x:100,y:150},
  10: {x:150,y:150},
  11: {x:200,y:150},
  12: {x:50,y:200},
  13: {x:50,y:200},
  14: {x:50,y:200},
  15: {x:200,y:200},
}
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

function handleRight(board) {
  const emptySquareIndex = board.findIndex((item) => item === "blank");
  if (emptySquareIndex % 4 === 0) {
    return;
  } else {
    board[emptySquareIndex] = board[emptySquareIndex - 1];
    board[emptySquareIndex - 1] = "blank";
   
    game.sound.play('click');
  }
}
function slideRight(){
  const emptySquare = getTiles().find(tile => tile.texture.key === "blank");
  const emptySquareSlot = emptySquare.slot;
  if (emptySquareSlot % 4 === 0) {
    return;
  } else { 
  const tileToTheLeft = getTiles().find(tile => tile.slot === emptySquareSlot-1);
  while (tileToTheLeft.x < slots[emptySquareSlot].x){
    tileToTheLeft.x++;
    emptySquare.x--;
  }
  emptySquare.slot= emptySquareSlot-1;
  tileToTheLeft.slot = emptySquareSlot;
  game.sound.play('click');
  console.log(emptySquare.slot);
  }
}


function handleLeft(board) {
  const emptySquareIndex = board.findIndex((item) => item === "blank");
  if ((emptySquareIndex + 1) % 4 === 0) {
    return;
  } else {
    board[emptySquareIndex] = board[emptySquareIndex + 1];
    board[emptySquareIndex + 1] = "blank";
    game.sound.play('click');
  }
}

function slideLeft(){
  const emptySquare = getTiles().find(tile => tile.texture.key === "blank");
  const emptySquareSlot = emptySquare.slot;
  if ((emptySquareSlot + 1) % 4 === 0) {
    return;
  } else {
  const tileToTheRight = getTiles().find(tile => tile.slot === emptySquareSlot+1);
  while (tileToTheRight.x > slots[emptySquareSlot].x){
    tileToTheRight.x--;
    emptySquare.x++;
  }

  emptySquare.slot= emptySquareSlot+1;
  tileToTheRight.slot = emptySquareSlot;
  game.sound.play('click');
  console.log(emptySquare.slot);
  }
}

function handleUp(board) {
  const emptySquareIndex = board.findIndex((item) => item === "blank");
  if (emptySquareIndex > 11) {
    return;
  } else {
    board[emptySquareIndex] = board[emptySquareIndex + 4];
    board[emptySquareIndex + 4] = "blank";
    game.sound.play('click');
  }
}

function handleDown(board) {
  const emptySquareIndex = board.findIndex((item) => item === "blank");
  if (emptySquareIndex < 4) {
    return;
  } else {
    board[emptySquareIndex] = board[emptySquareIndex - 4];
    board[emptySquareIndex - 4] = "blank";
    game.sound.play('click');
  }
}

function isWin(board) {
  if (JSON.stringify(board) === JSON.stringify(startingBoard)) {
    return true;
  }
  return false;
}

function update() {
  if (gameState.active === true) {
    let board = gameState.board;

    if (Phaser.Input.Keyboard.JustDown(gameState.cursors.right)) {
      console.log("sliding right");
      //handleRight(board);
      slideRight();
      //displayBoard(board);
    } else if (Phaser.Input.Keyboard.JustDown(gameState.cursors.left)) {
      console.log("sliding left");
      /*handleLeft(board);
      displayBoard(board);*/
      slideLeft();
    } else if (Phaser.Input.Keyboard.JustDown(gameState.cursors.up)) {
      console.log("sliding up");
      handleUp(board);
      displayBoard(board);
    } else if (Phaser.Input.Keyboard.JustDown(gameState.cursors.down)) {
      console.log("sliding down");
      handleDown(board);
      displayBoard(board);
    } else {
    }

    if (isWin(board)) {
      gameState.active = false;
      console.log("you won");
    }
  }
}


