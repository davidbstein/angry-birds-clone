class Bird {
  constructor(context, posX, posY) {
    this.context = context;

    this.position = new Vector2D(posX, posY);
    this.width = 108 / 2;
    this.height = 100 / 2;

    this.velocity = new Vector2D(0, 0);
    this.gravity = 0.0981;
    this.initialVelocity = new Vector2D(0, 0);
    this.dampingFactor = 0.3;

    this.xOffset = 0;

    this.frames = 0;
    this.time = 0;

    this.collisionType = 'circle';
    this.isFired = false;
    this.isPoweringUp = false;
    this.collision = new CollisionBox(
      this.position,
      this.width,
      this.height,
      1
    );

    this.createBird();
  }

  getPosition() {
    return this.position;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
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

    this.position.x += this.velocity.x;
    this.position.y -= this.velocity.y;

    if (this.isFired) {
      this.velocity.y = this.initialVelocity.y - this.gravity * this.time;
    }
  }

  setPosition(pos) {
    this.position.x = pos.x - this.width / 2;
    this.position.y = pos.y - this.height / 2;
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

  bounce() {
    this.time = 0;
    // this.frames = 0;
    this.initialVelocity.y = Math.abs(this.velocity.y);

    this.velocity.x -= this.dampingFactor;
    this.initialVelocity.y -= this.initialVelocity.y * this.dampingFactor;

    if (this.velocity.x < this.dampingFactor) this.velocity.x = 0;
    if (this.velocity.y < this.dampingFactor) this.velocity.y = 0;
  }

  resolveCollision(otherMat) {
    this.time = 0;
    this.initialVelocity.x = Math.abs(this.velocity.x);
    this.initialVelocity.y = this.velocity.y;

    switch (otherMat) {
      case 'wood':
        // this.velocity.x -= this.initialVelocity.x * this.dampingFactor;
        break;
      case 'ice':
        this.velocity.x -= this.initialVelocity.x * this.dampingFactor * 1.5;
        break;
    }
  }
}
