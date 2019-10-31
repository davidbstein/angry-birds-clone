class Tower {
  constructor(context) {
    this.context = context;

    this.position = new Vector2D(700, 475);
    this.components = [];
    this.pigs = [];

    this.createComponents();
    this.createPigs();
  }

  createComponents() {
    var base = new Pole(
      this.context,
      this.position,
      new Vector2D(0, 20),
      'wood',
      0,
      false
    );
    this.components.push(base);

    var base2 = new Pole(
      this.context,
      this.position,
      new Vector2D(0, 120),
      'wood',
      0,
      true
    );
    this.components.push(base2);

    var base3 = new Pole(
      this.context,
      this.position,
      new Vector2D(80, 120),
      'wood',
      0,
      true
    );
    this.components.push(base3);

    var base4 = new Pole(
      this.context,
      this.position,
      new Vector2D(0, 140),
      'wood',
      0,
      false
    );
    this.components.push(base4);

    var base4 = new Pole(
      this.context,
      this.position,
      new Vector2D(80, 200),
      'wood',
      1,
      false
    );
    this.components.push(base4);
  }

  createPigs() {
    var pig1 = new Pig(this.context, this.position, 20, 80, 'normal');
    this.components.push(pig1);
  }

  draw() {
    for (let i = 0; i < this.components.length; i++) {
      const element = this.components[i];

      element.draw();
    }

    for (let i = 0; i < this.pigs.length; i++) {
      const element = this.pigs[i];

      element.draw();
    }
  }
}
