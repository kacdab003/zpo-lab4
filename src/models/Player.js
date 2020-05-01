class Player {
  constructor(name) {
    this.name = name;
    this.points = 0;
  }

  getName() {
    return this.name;
  }

  scorePoint() {
    this.points += 1;
  }
}
module.exports = Player;
