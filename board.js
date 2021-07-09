function preload() {
  //load the sprites in this format:
  this.load.image('1', '1.png');
  this.load.image('2', '2.png');
  this.load.image('3', '3.png');
  this.load.image('4', '4.png');
  this.load.image('5', '5.png');
  this.load.image('6', '6.png');
  this.load.image('7', '7.png');
  this.load.image('8', '8.png');
  this.load.image('9', '9.png');
  this.load.image('10', '10.png');
  this.load.image('11', '11.png');
  this.load.image('12', '12.png');
  this.load.image('13', '13.png');
  this.load.image('14', '14.png');
  this.load.image('15', '15.png');

}
const gameState = {
  konami: ['u','u','d','d','l','r','l','r','b','a'],
  konamiEnter: ['']

}

function create() {
  
  gameState.active = true;

  //make phaser listen for input
  gameState.cursors = this.input.keyboard.createCursorKeys();
BKey = this.input.keyboard.addKey('b');
AKey = this.input.keyboard.addKey('a');
//create game environment
gameState.tiles = this.add.group();

  function displayBoard(board) {
    for (let i = 0; i < 4; i ++) {
      const xVal = (i+1)*50;
      for (let j = 0; j < 4; j++){
        const yVal = j*50;
      gameState.tiles.create(xVal,yVal,board[4*j+i]);
      }    
    }
  }
  let board = generateRandomBoard(startingBoard);
  displayBoard(board);
  gameState.board = board;


}

const startingBoard = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', " "];

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

function update() {
let board = gameState.board;

  if (gameState.cursors.right.isDown) {
      console.log("sliding right");
      handleRight(board);
      gameState.konamiEnter.push('r');
    } else if (gameState.cursors.left.isDown) {
      console.log("sliding left");
      handleLeft(board);
      gameState.konamiEnter.push('l');
    } else if (gameState.cursors.up.isDown){
      console.log("sliding up");
      handleUp(board);
      gameState.konamiEnter.push('u');
    } else if (gameState.cursors.down.isDown) {
      console.log("sliding down");
      handleDown(board);
      gameState.konamiEnter.push('d');
    } 
    else if (BKey.isDown) {
      gameState.konamiEnter.push('b');
    } 
    else if (AKey.isDown) {
      gameState.konamiEnter.push('a');
    }
    else {
    }

    if (gameState.konamiEnter.length === 10){
      if (gameState.konamiEnter === konami){
        board = [...startingBoard];
        console.log("you win")
      }
      else {
        gameState.konamiEnter= [];
      }
    }
    else if (gameState.konamiEnter){
for (i = 0; i<gameState.konamiEnter.length; i++){
  if (gameState.konamiEnter[i] != gameState.konami[i]){
    gameState.konamiEnter = [];
  }
}
    }
 
   // if (isWin(board)) {
   //   console.log("you won");
      
 //   }
  }



const config = {
  type: Phaser.AUTO,
  width: 450,
  height: 500,
  backgroundColor: "b9eaff",
  scene: {
      preload,
      create,
      update
  }
};


const game = new Phaser.Game(config);