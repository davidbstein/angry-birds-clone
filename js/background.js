class Background {
  constructor(context, width, height) {
    this.context = context;

    this.width = width;
    this.height = height;

    this.position = new Vector2D(-500, 0);

    this.createImages();
    console.log(this.width);

    this.sineAngle = 0;
  }

  createImages() {
    this.skyImage = new Image();
    this.skyImage.src = './images/AkakiCape/sky.png';

    this.mountainImage = new Image();
    this.mountainImage.src = './images/AkakiCape/mtn.png';

    this.forestImage = new Image();
    this.forestImage.src = './images/AkakiCape/bg_2 (z -2).png';

    this.middleGround = new Image();
    this.middleGround.src = './images/AkakiCape/middleground (z 0).png';

    this.middlePlus = new Image();
    this.middlePlus.src = './images/AkakiCape/middleplus (z 1).png';

    console.log(this.skyImage);
  }

  draw() {
    this.drawSky();
    this.drawMountain();
    this.drawForest();
    this.drawMiddleGround();
    this.drawMiddlePlus();

    // this.move();
  }

  drawSky() {
    this.context.drawImage(
      this.skyImage,
      this.position.x,
      this.position.y,
      this.width * 2,
      this.height
    );
  }

  drawMountain() {
    this.context.drawImage(
      this.mountainImage,
      this.position.x,
      this.position.y,
      this.width * 2,
      this.height
    );
  }

  drawForest() {
    this.context.drawImage(
      this.forestImage,
      this.position.x,
      this.position.y,
      this.width * 2,
      this.height
    );
  }

  drawMiddleGround() {
    this.context.drawImage(
      this.middleGround,
      this.position.x,
      this.position.y + 25,
      this.width * 2,
      this.height
    );
  }

  drawMiddlePlus() {
    this.context.drawImage(
      this.middlePlus,
      this.position.x,
      this.position.y + 25,
      this.width * 2,
      this.height
    );
  }

  move() {
    this.sineAngle = ++this.sineAngle;
    this.position.x = 500 * Math.sin((this.sineAngle * Math.PI) / 360) - 500;
  }
}
