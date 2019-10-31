class Game {
  constructor(canvas) {
    // this.canvas = document.getElementById('angry-birds');
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');

    this.gameWidth = this.canvas.width;
    this.gameHeight = this.canvas.height;

    this.position = new Vector2D(
      this.canvas.getBoundingClientRect().left,
      this.canvas.getBoundingClientRect().top
    );

    this.bg = new Background(this.context, this.gameWidth, this.gameHeight);
    this.ground = new Ground(this.context);
    this.catapult = new Catapult(this.context);
    this.birds = [];
    this.createBirds(3);
    this.currentBirdIndex = 0;

    this.tower = new Tower(this.context);
    this.lineRenderer = new LineRenderer(this.context);

    this.score = new Score(this.context, this.gameWidth);

    this.audio = new Audio();
    this.audio.backgroundSound('./audio/music.mp3');

    this.maxVelocity = new Vector2D(10, 10);
    this.currentVelocity = new Vector2D(0, 0);
    this.firstClickPosition = new Vector2D(0, 0);

    this.previousX = 0;
    this.previousY = 0;

    // this.loop();

    this.handleInputs();
  }

  createBirds(n) {
    for (let i = 0; i < n; i++) {
      var b = new Bird(this.context, 50 * (i - 1), 425, 'red');
      this.birds.push(b);
    }

    // console.log(this.birds[this.currentBirdIndex].load());
    this.birds[0].load();
    this.bird = this.birds[0];
  }

  handleInputs() {
    window.addEventListener(
      'click',
      function(event) {
        // this.bird.fire(new Vector2D(2, 5));
      }.bind(this)
    );

    this.canvas.onmousedown = this.mouseClickListener.bind(this);
    document.onmousemove = this.mouseMoveListener.bind(this);
    document.onmouseup = this.mouseUpListener.bind(this);
  }

  mouseClickListener(e) {
    e.preventDefault();

    var mouseX = e.pageX - this.position.x;
    var mouseY = e.pageY - this.position.y;

    if (
      Math.abs(mouseX - (this.bird.position.x + this.bird.width / 2)) <= 20 &&
      Math.abs(mouseY - (this.bird.position.y + this.bird.height / 2)) <= 20
    ) {
      this.firstClickPosition = new Vector2D(mouseX, mouseY);
      this.bird.isPoweringUp = true;
    }
  }

  mouseMoveListener(e) {
    if (this.bird.isPoweringUp) {
      var mouseX = e.pageX - this.position.x;
      var mouseY = e.pageY - this.position.y;

      var differenceX = this.firstClickPosition.x - mouseX;
      var differenceY = this.firstClickPosition.y - mouseY;

      if (this.firstClickPosition.distance(new Vector2D(mouseX, mouseY)) > 50) {
        var newPos = new Vector2D(
          mouseX - this.firstClickPosition.x,
          mouseY - this.firstClickPosition.y
        )
          .unitVector()
          .scale(50);
        mouseX = this.firstClickPosition.x + newPos.x;
        mouseY = this.firstClickPosition.y + newPos.y;
      }

      if (differenceX > 50) differenceX = 50;
      else if (differenceX < -50) differenceX = -50;
      if (differenceY > 50) differenceY = 50;
      else if (differenceY < -50) differenceY = -50;

      this.currentVelocity.x = 0.2 * differenceX;

      this.currentVelocity.y = -0.2 * differenceY;

      this.bird.setPosition(new Vector2D(mouseX, mouseY));
      this.lineRenderer.setLine(
        new Vector2D(mouseX, mouseY),
        new Vector2D(this.currentVelocity.x, -this.currentVelocity.y)
      );

      this.previousX = mouseX;
      this.previousY = mouseY;
    }
  }

  mouseUpListener(e) {
    if (this.bird.isPoweringUp) {
      // if (this.currentVelocity.distance(this.maxVelocity) >= 10) {
      //   this.currentVelocity = this.maxVelocity;
      // }
      this.bird.fire(this.currentVelocity);

      this.bird.isPoweringUp = false;
    }
  }

  loop() {
    this.context.clearRect(0, 0, this.gameWidth, this.gameHeight);

    this.bg.draw();
    this.catapult.drawBackImage();
    this.lineRenderer.draw();
    this.ground.draw();

    for (let i = 0; i < this.birds.length; i++) {
      const element = this.birds[i];
      element.draw();
    }

    this.catapult.drawFrontImage();
    this.tower.draw();
    this.score.showScore();

    this.context.fillText(this.currentFps, 0, 0);

    this.detectCollision();
    this.queueBird();

    // requestAnimationFrame(this.loop.bind(this));
  }

  detectCollision() {
    this.ground.detectCollision([this.bird]);

    for (let i = 0; i < this.tower.components.length; i++) {
      const element = this.tower.components[i];

      if (element.collisionType == 'box') {
        element.detectCollision(
          this.tower.components,
          this.bird,
          this.ground,
          this.score
        );
      }
    }
  }

  queueBird() {
    if (this.bird.isStationary()) {
      // for (let i = 0; i < this.birds.length; i++) {
      //   if (this.bird == this.birds[i]) {
      //     this.birds.splice(i, 1);
      //     if (i < this.birds.length - 1) this.bird = this.birds[i + 1];
      //     break;
      //   }
      // }

      if (this.birds.length <= 1) {
        this.gameOver = true;
        return;
      }

      this.birds.splice(0, 1);
      this.bird = this.birds[0];

      this.bird.load();
    }
  }
}
