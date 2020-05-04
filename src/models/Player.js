class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
    }

    getPoints() {
        return this.score;
    }


    scorePoint() {
        this.score += 1;
    }


}

module.exports = Player;
