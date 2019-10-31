class Score {
  constructor(context, gameWidth) {
    this.context = context;
    this.gameWidth = gameWidth;

    this.currentScore = 0;
    this.highScore = localStorage.getItem('angry_birds_high_score')
      ? localStorage.getItem('angry_birds_high_score')
      : 0;
  }

  getCurrentScore() {
    return this.currentScore;
  }

  increaseScore(s) {
    this.currentScore += s;
  }

  setHighScore() {
    if (this.currentScore > localStorage.getItem('angry_birds_high_score')) {
      this.highScore = this.currentScore;
      localStorage.setItem('angry_birds_high_score', this.highScore);
    }
  }

  showHighScore() {
    var scoreFontSize = 20;
    this.context.font = scoreFontSize + 'px Arial';
    this.context.fillStyle = '#FFD700';
    // this.context.fillText(
    //   'Best:\n' + this.highScore,
    //   this.gameWidth / 2 - (scoreFontSize * 5) / 2,
    //   100
    // );

    this.context.fillText('Best:\n' + this.highScore, 5, 20);
  }

  showScore() {
    var scoreFontSize = 20;
    this.context.font = scoreFontSize + 'px Arial';
    this.context.fillStyle = '#FFD700';
    // this.context.fillText(
    //   this.currentScore,
    //   this.gameWidth / 2 - scoreFontSize / 2,
    //   75
    // );

    this.context.fillText('Score: ' + this.currentScore, 5, 45);

    this.showHighScore();
  }
}
