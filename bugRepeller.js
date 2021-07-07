function preload() {
    this.load.image('bug1', 'https://content.codecademy.com/courses/learn-phaser/Bug%20Invaders/bug_1.png');
    this.load.image('bug2', 'https://content.codecademy.com/courses/learn-phaser/Bug%20Invaders/bug_2.png');
    this.load.image('bug3', 'https://content.codecademy.com/courses/learn-phaser/Bug%20Invaders/bug_3.png');
    this.load.image('platform', 'https://content.codecademy.com/courses/learn-phaser/physics/platform.png');
    this.load.image('codey', 'https://content.codecademy.com/courses/learn-phaser/Bug%20Invaders/codey.png');
    this.load.image('bugPellet', 'https://content.codecademy.com/courses/learn-phaser/Bug%20Invaders/bugPellet.png');
    this.load.image('bugRepellent', 'https://content.codecademy.com/courses/learn-phaser/Bug%20Invaders/bugRepellent.png');
  }
  
  // Helper Methods below:
  // sortedEnemies() returns an array of enemy sprites sorted by their x coordinate
  function sortedEnemies(){
    const orderedByXCoord = gameState.enemies.getChildren().sort((a, b) => a.x - b.x);
    return orderedByXCoord;
  }
  // numOfTotalEnemies() returns the number of total enemies 
  function numOfTotalEnemies() {
      const totalEnemies = gameState.enemies.getChildren().length;
    return totalEnemies;
  }
  
  const gameState = {};
  
  function create() {
      // When gameState.active is true, the game is being played and not over. When gameState.active is false, then it's game over
      gameState.active = true;
  
      // When gameState.active is false, the game will listen for a pointerup event and restart when the event happens
      this.input.on('pointerup', () => {
          if (gameState.active === false) {
              this.scene.restart();
          }
      })
  
      // Creating static platforms
      const platforms = this.physics.add.staticGroup();
      platforms.create(225, 490, 'platform').setScale(1, .3).refreshBody();
  
      // Displays the initial number of bugs, this value is initially hardcoded as 24 
      gameState.scoreText = this.add.text(175, 482, 'Bugs Left: 24', { fontSize: '15px', fill: '#000000' });
  //create bugs
  gameState.enemies = this.physics.add.group();
  for (let yVal = 1; yVal <4; yVal++){
    for (let xVal = 1; xVal <9; xVal++){
      gameState.enemies.create(50 * xVal, 50 * yVal, 'bug1').setScale(.6).setGravityY(-200);
    }
  }
  //create pellets (ew)
  const pellets = this.physics.add.group();
  
  function genPellet(){
    let randomBug = Phaser.Utils.Array.GetRandom(gameState.enemies.getChildren());
    pellets.create(randomBug.x,randomBug.y,'bugPellet')
  }
  
   gameState.pelletsLoop = this.time.addEvent({
    delay:300,
    callback:genPellet,
    callbackScope: this,
    loop: true,
  });
      // Uses the physics plugin to create Codey
      gameState.player = this.physics.add.sprite(225, 450, 'codey').setScale(.5);
  
      // Create Collider objects
      gameState.player.setCollideWorldBounds(true);
      this.physics.add.collider(gameState.player, platforms);
    this.physics.add.collider(pellets,platforms,function(pellet){pellet.destroy()})
      this.physics.add.collider(pellets,gameState.player,() => {
      gameState.active = false;
      gameState.pelletsLoop.destroy();
      this.physics.pause();
      this.add.text(300,300,'Game Over',{fontSize:'15px', fill: '#000'});
    });
 
      // Creates cursor objects to be used in update()
      gameState.cursors = this.input.keyboard.createCursorKeys();
  
      // Add new code below:
      gameState.bugRepellent = this.physics.add.group();
      this.physics.add.collider(gameState.enemies,gameState.bugRepellent,(bug,repellent) => {
        bug.destroy();
        repellent.destroy();
        //gameState.scoreText = `Bugs Left: ${numOfTotalEnemies()}`
          });
  }
  
  function update() {
      if (gameState.active) {
          // If the game is active, then players can control Codey
          if (gameState.cursors.left.isDown) {
              gameState.player.setVelocityX(-160);
          } else if (gameState.cursors.right.isDown) {
              gameState.player.setVelocityX(160);
          } else {
              gameState.player.setVelocityX(0);
          }
  
          // Execute code if the spacebar key is pressed
          if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space)) {
              gameState.bugRepellent.create(gameState.player.x,gameState.player.y,'bugRepellent').setGravityY(-400);
          }
  
          // Add logic for winning condition and enemy movements below:
      
    }
  }
  
  const config = {
      type: Phaser.AUTO,
      width: 450,
      height: 500,
      backgroundColor: "b9eaff",
      physics: {
          default: 'arcade',
          arcade: {
              gravity: { y: 200 },
              enableBody: true,
          }
      },
      scene: {
          preload,
          create,
          update
      }
  };
  
  
  const game = new Phaser.Game(config);