class MainMenu {
  constructor(context, pos, canvasWidth, canvasHeight) {
    this.context = context;
    this.position = pos;

    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;

    this.playButtonClicked = false;

    this.bg = new Background(this.context, canvasWidth, canvasHeight);
    this.createElements();

    this.handleInputs();
  }

  createElements() {
    this.titleImage = new Image();
    this.titleImage.src = './images/title.png';
    this.titleImage.width = 400;
    this.titleImage.height = 133;

    this.playButton = new Image();
    this.playButton.src = './images/play-button.png';
  }

  handleInputs() {
    document.onmousedown = !this.playButtonClicked
      ? this.mouseClickListener.bind(this)
      : null;
  }

  mouseClickListener(e) {
    e.preventDefault();

    if (!this.playButtonClicked) {
      var mouseX = e.pageX - this.position.x;
      var mouseY = e.pageY - this.position.y;

      if (
        mouseX > this.canvasWidth / 2 - this.playButton.width / 2 &&
        mouseX < this.canvasWidth / 2 + this.playButton.width / 2 &&
        mouseY > this.canvasHeight / 2 - this.playButton.height / 2 &&
        mouseY < this.canvasHeight / 2 + this.playButton.height / 2
      ) {
        this.playButtonClicked = true;
      }
    }
  }

  draw() {
    this.bg.draw();

    this.context.drawImage(
      this.titleImage,
      this.canvasWidth / 2 - this.titleImage.width / 2,
      this.canvasHeight / 8 - this.titleImage.height / 2,
      this.titleImage.width,
      this.titleImage.height
    );

    this.context.drawImage(
      this.playButton,
      this.canvasWidth / 2 - this.playButton.width / 2,
      this.canvasHeight / 2 - this.playButton.height / 2,
      this.playButton.width,
      this.playButton.height
    );
  }

  isPlayButtonClicked() {
    return this.playButtonClicked;
  }
}
