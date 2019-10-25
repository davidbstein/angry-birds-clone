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

    this.mainMenu = new MainMenu(
      this.context,
      this.position,
      this.gameWidth,
      this.gameHeight
    );
    this.game = new Game(this.canvas);

    this.state = 'main-menu';

    this.loop();
  }

  handleInputs() {}

  loop() {
    if (this.mainMenu.isPlayButtonClicked()) this.state = 'game';

    if (this.state == 'main-menu') {
      this.mainMenu.draw();
    } else if (this.state == 'game') {
      this.game.loop();
    } else if (this.state == 'game-over') {
      this.gameOver.draw();
    }

    requestAnimationFrame(this.loop.bind(this));
  }
}

var m = new Main();
