class Main {
  constructor() {
    this.canvas = document.getElementById('angry-birds');
    this.context = this.canvas.getContext('2d');

    this.gameWidth = this.canvas.width;
    this.gameHeight = this.canvas.height;

    this.position = new Vector2D(
      this.canvas.getBoundingClientRect().left,
      this.canvas.getBoundingClientRect().top
    );

    this.bg = new Background(this.context, this.gameWidth, this.gameHeight);
    this.catapult = new Catapult(this.context);
    this.bird = new Bird(this.context, 100, 375);

    this.maxVelocity = new Vector2D(10, 10);
    this.currentVelocity = new Vector2D(0, 0);

    this.previousX = 0;
    this.previousY = 0;

    this.isPoweringUp = false;

    this.loop();

    this.handleInputs();
  }

  handleInputs() {
    window.addEventListener(
      'click',
      function(event) {
        // this.bird.fire(new Vector2D(2, 5));
      }.bind(this)
    );

    this.canvas.onmousedown = this.mouseClickListener.bind(this);
    this.canvas.onmousemove = this.mouseMoveListener.bind(this);
    this.canvas.onmouseup = this.mouseUpListener.bind(this);
  }

  mouseClickListener(e) {
    e.preventDefault();
    console.log('clicked');

    var mouseX = e.pageX - this.position.x;
    var mouseY = e.pageY - this.position.y;

    if (
      Math.abs(mouseX - (this.bird.position.x + this.bird.width / 4)) <= 20 &&
      Math.abs(mouseY - (this.bird.position.y + this.bird.height / 4)) <= 20
    ) {
      this.isPoweringUp = true;
    }
  }

  mouseMoveListener(e) {
    if (this.isPoweringUp) {
      var mouseX = e.pageX - this.position.x;
      var mouseY = e.pageY - this.position.y;

      if (mouseX - this.previousX >= 1 && mouseY - this.previousY >= 1) {
        this.currentVelocity.x =
          this.bird.position.x + this.bird.width / 4 - mouseX;

        this.currentVelocity.y =
          this.bird.position.y + this.bird.height / 4 - mouseY;

        this.previousX = mouseX;
        this.previousY = mouseY;
      }
    }
  }

  mouseUpListener(e) {
    if (this.isPoweringUp) {
      // if (this.currentVelocity.distance(this.maxVelocity) >= 10) {
      //   this.currentVelocity = this.maxVelocity;
      // }
      console.log(this.currentVelocity);
      this.bird.fire(this.currentVelocity);

      this.isPoweringUp = false;
    }
  }

  loop() {
    this.context.clearRect(0, 0, this.gameWidth, this.gameHeight);

    this.bg.draw();
    this.catapult.draw();
    this.bird.draw();

    this.context.fillText(this.currentFps, 0, 0);

    requestAnimationFrame(this.loop.bind(this));
  }
}

var m = new Main();
