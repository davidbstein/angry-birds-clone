class Ground {
  constructor(context) {
    this.context = context;
    this.position = new Vector2D(0, 475);

    this.collisionType = 'ground';

    this.createGround();

    this.collision = new CollisionBox(
      this.position,
      3 * this.groundImage.width,
      this.groundImage.height * 10,
      1
    );
  }

  createGround() {
    this.groundImage = new Image();
    this.groundImage.src = './images/foreground.png';

    this.width = this.groundImage.width;
    this.height = this.groundImage.height;

    console.log(this.width);
  }

  draw() {
    for (let i = 0; i < 3; i++) {
      this.context.drawImage(
        this.groundImage,
        i * this.groundImage.width,
        this.position.y
      );
    }
  }

  detectCollision(others) {
    for (let i = 0; i < others.length; i++) {
      const element = others[i];

      if ((element.collisionType = 'circle')) {
        if (element.position.y + element.height >= this.position.y) {
          //   console.log(element);
          //   element.time = 0;
          //   element.velocity.y = Math.abs(element.velocity.y);
          element.bounce();
        }
      }
    }
  }
}
