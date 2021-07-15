// const gameState = {
//   score: 0,
// };

const config = {
  type: Phaser.AUTO,
  width: 450,
  height: 500,
  backgroundColor: "b9eaff",
  scene: [StartScene, LevelOneScene, LevelTwoScene],
};

const game = new Phaser.Game(config);
