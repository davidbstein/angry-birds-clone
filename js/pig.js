class Pig {
  constructor(context, towerPos, posX, posY, pigType) {
    this.context = context;

    this.localPosition = new Vector2D(posX, posY);
    this.position = new Vector2D(
      towerPos.x + this.localPosition.x,
      towerPos.y - this.localPosition.y
    );

    this.spritePosition = new Vector2D(0, 0);

    this.width = 116 / 2;
    this.height = 116 / 2;

    this.pigType = pigType;
    this.health = 50;

    this.frames = 0;
    this.time = 0;

    this.collisionType = 'pig';

    this.createPig();
  }

  createPig() {
    this.pigImage = new Image();

    this.pigImage.src = './images/Pigs.png';
  }

  decreaseHealth(h) {
    this.health -= h;
  }

  isPigDead() {
    if (this.health <= 0) return true;
    else return false;
  }

  draw() {
    this.context.drawImage(
      this.pigImage,
      this.spritePosition.x,
      this.spritePosition.y,
      this.width * 2,
      this.height * 2,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    this.update();
    this.animate();
  }

  update() {
    this.frames = ++this.frames % 60;
    this.time++;
  }

  setPosition(pos) {
    this.position.x = pos.x - this.width / 2;
    this.position.y = pos.y - this.height / 2;
  }

  animate() {
    if (this.frames % 15 == 0) {
      //   if (this.isLoaded) {
      //     this.xOffset = (this.xOffset + 124 * 2) % (124 * 4);
      //   } else if (this.isPoweringUp) {
      //   } else if (this.isFired) {
      //     this.xOffset = (this.xOffset + 124) % (124 * 2);
      //   }

      this.spritePosition.x = (this.spritePosition.x + 116) % (116 * 3);
    }
  }
}
