class GameOver {
  constructor(context, pos, canvasWidth, canvasHeight) {
    this.context = context;
    this.position = pos;

    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;

    this.playButtonClicked = false;
    this.restartClicked = false;
    this.isGameOver = false;
    this.nextLevel = false;

    this.bg = new Background(this.context, canvasWidth, canvasHeight);
    this.createElements();

    this.handleInputs();
  }

  createElements() {
    this.gameOverImage = new Image();
    this.gameOverImage.src = './images/gameOver.png';
    this.gameOverImage.width = 400;
    this.gameOverImage.height = 133;

    this.homeButton = new Image();
    this.homeButton.src = './images/home-button.png';

    this.restartButton = new Image();
    this.restartButton.src = './images/restart-button.png';

    this.nextButton = new Image();
    this.nextButton.src = './images/next-button.png';
  }

  handleInputs() {
    document.onmousedown = !this.playButtonClicked
      ? this.mouseClickListener.bind(this)
      : null;
  }

  mouseClickListener(e) {
    e.preventDefault();

    if (!this.restartClicked && this.isGameOver) {
      var mouseX = e.pageX - this.position.x;
      var mouseY = e.pageY - this.position.y;

      if (
        mouseX > this.canvasWidth / 2 - this.restartButton.width / 2 &&
        mouseX < this.canvasWidth / 2 + this.restartButton.width / 2 &&
        mouseY > this.canvasHeight / 2 - this.restartButton.height / 2 &&
        mouseY < this.canvasHeight / 2 + this.restartButton.height / 2
      ) {
        this.restartClicked = true;
        this.gameOver = false;
      }
    }
  }

  draw() {
    this.bg.draw();

    this.context.drawImage(
      this.gameOverImage,
      this.canvasWidth / 2 - this.gameOverImage.width / 2,
      this.canvasHeight / 8 - this.gameOverImage.height / 4,
      this.gameOverImage.width,
      this.gameOverImage.height / 2
    );

    this.context.drawImage(
      this.restartButton,
      this.canvasWidth / 2 - this.restartButton.width / 2,
      this.canvasHeight / 2 - this.restartButton.height / 2,
      this.restartButton.width,
      this.restartButton.height
    );

    this.context.drawImage(
      this.homeButton,
      this.canvasWidth / 2 - this.homeButton.width * 2,
      this.canvasHeight / 2 - this.homeButton.height / 2,
      this.homeButton.width,
      this.homeButton.height
    );

    this.context.drawImage(
      this.nextButton,
      this.canvasWidth / 2 + this.nextButton.width,
      this.canvasHeight / 2 - this.nextButton.height / 2,
      this.nextButton.width,
      this.nextButton.height
    );

    if (this.isGameOver) {
      this.context.beginPath();
      this.context.arc(
        this.canvasWidth / 2 +
          this.nextButton.width +
          this.nextButton.width / 2,
        this.canvasHeight / 2,
        this.nextButton.height / 2,
        0,
        Math.PI * 2
      );
      this.context.fillStyle = 'rgba(55, 55, 55, 0.5)';
      this.context.fill();
    }
  }
}
