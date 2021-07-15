class LevelTwoScene extends Phaser.Scene {
  constructor() {
    super({
      key: "LevelTwoScene",
    });
  }

  preload() {
    //load the sprites in this format:
    this.load.image("1", "images/level2/row-1-column-1.png");
    this.load.image("2", "images/level2/row-1-column-2.png");
    this.load.image("3", "images/level2/row-1-column-3.png");
    this.load.image("4", "images/level2/row-1-column-4.png");
    this.load.image("5", "images/level2/row-1-column-5.png");
    this.load.image("6", "images/level2/row-2-column-1.png");
    this.load.image("7", "images/level2/row-2-column-2.png");
    this.load.image("8", "images/level2/row-2-column-3.png");
    this.load.image("9", "images/level2/row-2-column-4.png");
    this.load.image("10", "images/level2/row-2-column-5.png");
    this.load.image("11", "images/level2/row-3-column-1.png");
    this.load.image("12", "images/level2/row-3-column-2.png");
    this.load.image("13", "images/level2/row-3-column-3.png");
    this.load.image("14", "images/level2/row-3-column-4.png");
    this.load.image("15", "images/level2/row-3-column-5.png");
    this.load.image("16", "images/level2/row-4-column-1.png");
    this.load.image("17", "images/level2/row-4-column-2.png");
    this.load.image("18", "images/level2/row-4-column-3.png");
    this.load.image("19", "images/level2/row-4-column-4.png");
    this.load.image("blank", "images/level2/blank.png");
    this.load.image("full", "images/level2/full.png");
    this.load.audio("click", "click.wav");
  }

  create() {
    gameState.active = true;

    gameState.tweening = false;

    //make phaser listen for input
    gameState.cursors = this.input.keyboard.createCursorKeys();

    //create game environment
    gameState.tiles = this.add.group();
    game.sound.mute = true;

    gameState = {
      ...gameState,
      rows: 4,
      columns: 5,
    };
    const rows = 5;
    const columns = 4;
    const tileWidth = 64;
    const tileHeight = 54;
    setStartingBoard(rows, columns);
    let board = generateRandomBoard(startingBoard, rows, columns);
    // let board = startingBoard;

    displayBoard(board, rows, columns, tileWidth, tileHeight);

    this.add.image(tileWidth + 164, tileHeight + 350, "full").setScale(0.8);

    gameState.tiles
      .getChildren()
      .forEach((tile) => (tile.slot = board.indexOf(tile.texture.key)));
    game.sound.mute = false;
    gameState.board = board;

    var combo = this.input.keyboard.createCombo(
      [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
      { resetOnMatch: true }
    );

    this.input.keyboard.on("keycombomatch", function (event) {
      gameState.board = [...startingBoard];
      displayBoard(startingBoard, rows, columns, tileWidth, tileHeight);
    });

    function getTweenObject(targets, x, y) {
      const tweenObj = {
        targets: targets,
        duration: 100,
        x: `+=${x}`,
        y: `+=${y}`,
        ease: "Linear",
        onComplete: setTweeningFalse,
      };
      return tweenObj;
    }

    //tween functions which need to be inside create for some reason? *cries
    gameState.tweenLeft = (empty, tile) => {
      this.tweens.add(getTweenObject(empty, tileWidth, 0));
      this.tweens.add(getTweenObject(tile, -tileWidth, 0));
    };

    gameState.tweenRight = (empty, tile) => {
      this.tweens.add(getTweenObject(empty, -tileWidth, 0));
      this.tweens.add(getTweenObject(tile, tileWidth, 0));
    };

    gameState.tweenUp = (empty, tile) => {
      this.tweens.add(getTweenObject(empty, 0, tileHeight));
      this.tweens.add(getTweenObject(tile, 0, -tileHeight));
    };

    gameState.tweenDown = (empty, tile) => {
      this.tweens.add(getTweenObject(empty, 0, -tileHeight));
      this.tweens.add(getTweenObject(tile, 0, tileHeight));
    };
  }

  update() {
    if (gameState.active === true) {
      let board = gameState.board;

      if (Phaser.Input.Keyboard.JustDown(gameState.cursors.right)) {
        console.log("sliding right");
        slideRight(gameState.columns);
      } else if (Phaser.Input.Keyboard.JustDown(gameState.cursors.left)) {
        console.log("sliding left");
        slideLeft(gameState.columns);
      } else if (Phaser.Input.Keyboard.JustDown(gameState.cursors.up)) {
        console.log("sliding up");
        slideUp(gameState.rows, gameState.columns);
      } else if (Phaser.Input.Keyboard.JustDown(gameState.cursors.down)) {
        console.log("sliding down");
        slideDown();
      } else {
      }

      if (isWin(getTiles())) {
        gameState.active = false;
        this.add.text(85, 100, "You Win", {
          color: "#000000",
          backgroundColor: "#ffffff",
        });
        this.add.text(35, 120, `You needed ${gameState.moveCount} moves`, {
          color: "#000000",
          backgroundColor: "#ffffff",
        });
        this.add.text(55, 140, "Click to restart", {
          color: "#000000",
          backgroundColor: "#ffffff",
        });
        this.input.on("pointerup", () => {
          gameState.active = true;
          this.scene.restart();
          Object.keys(gameState).forEach((key) => (gameState[key] = null));
        });
      }
    }
  }
}

//don't change anything below here

// const config = {
//   type: Phaser.AUTO,
//   width: 250,
//   height: 250,
//   backgroundColor: "b9eaff",
//   scene: [GameScene],
// };

// const game = new Phaser.Game(config);
