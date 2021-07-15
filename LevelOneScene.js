class LevelOneScene extends Phaser.Scene {
  constructor() {
    super({
      key: "LevelOneScene",
    });
  }

  preload() {
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
    this.load.image("blank", "images/tiles/blank.png");
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
    let board = generateRandomBoard(startingBoard);

    displayBoard(board);
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
      displayBoard(startingBoard);
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
      this.tweens.add(getTweenObject(empty, 50, 0));
      this.tweens.add(getTweenObject(tile, -50, 0));
    };

    gameState.tweenRight = (empty, tile) => {
      this.tweens.add(getTweenObject(empty, -50, 0));
      this.tweens.add(getTweenObject(tile, 50, 0));
    };

    gameState.tweenUp = (empty, tile) => {
      this.tweens.add(getTweenObject(empty, 0, 50));
      this.tweens.add(getTweenObject(tile, 0, -50));
    };

    gameState.tweenDown = (empty, tile) => {
      this.tweens.add(getTweenObject(empty, 0, -50));
      this.tweens.add(getTweenObject(tile, 0, 50));
    };
  }

  update() {
    if (gameState.active === true) {
      let board = gameState.board;

      if (Phaser.Input.Keyboard.JustDown(gameState.cursors.right)) {
        console.log("sliding right");
        slideRight();
      } else if (Phaser.Input.Keyboard.JustDown(gameState.cursors.left)) {
        console.log("sliding left");
        slideLeft();
      } else if (Phaser.Input.Keyboard.JustDown(gameState.cursors.up)) {
        console.log("sliding up");
        slideUp();
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
