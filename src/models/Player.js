class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }

  getPoints() {
    return this.score;
  }

  initializeGame() {
    this.score = 0;
  }

  scorePoint() {
    this.score += 1;
  }
}
module.exports = Player;
