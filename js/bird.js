class Bird {
  constructor(context, posX, posY) {
    this.context = context;

    this.position = new Vector2D(posX, posY);
    this.width = 108;
    this.height = 100;

    this.velocity = new Vector2D(0, 0);
    this.gravity = 0.0981;
    this.initialVelocity = new Vector2D(0, 0);

    this.xOffset = 0;

    this.frames = 0;
    this.time = 0;

    this.isFired = false;
    this.isPoweringUp = false;

    this.createBird();
  }

  createBird() {
    this.birdImage = new Image();
    this.birdImage.src = './images/red.png';
  }

  draw() {
    this.context.drawImage(
      this.birdImage,
      this.xOffset,
      0,
      this.width,
      this.height,
      this.position.x,
      this.position.y,
      this.width / 2,
      this.height / 2
    );

    this.update();
    this.animate();
  }

  update() {
    this.frames = ++this.frames % 60;
    this.time++;

    this.position.x += this.velocity.x;
    this.position.y -= this.velocity.y;

    if (this.isFired) {
      this.velocity.y = this.initialVelocity.y - this.gravity * this.time;
    }
  }

  setPosition(pos) {
    this.position.x = pos.x - this.width / 4;
    this.position.y = pos.y - this.height / 4;
  }

  animate() {
    if (this.frames % 10 == 0) {
      this.xOffset = (this.xOffset + 124) % (124 * 3);
    }
  }

  fire(initialVelocity) {
    this.initialVelocity.x = initialVelocity.x;
    this.initialVelocity.y = initialVelocity.y;
    this.time = 0;
    this.isFired = true;

    this.velocity = initialVelocity;
  }
}
