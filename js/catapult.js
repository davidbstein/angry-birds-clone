class Catapult {
  constructor(context) {
    this.context = context;
    this.position = new Vector2D(100, 375);

    this.createImages();
  }

  createImages() {
    this.backImage = new Image();
    this.backImage.src = './images/catapult-back.png';

    this.frontImage = new Image();
    this.frontImage.src = './images/catapult-front.png';
  }

  draw() {
    this.context.drawImage(
      this.backImage,
      this.position.x,
      this.position.y,
      this.backImage.width,
      this.backImage.height
    );
  }
}
