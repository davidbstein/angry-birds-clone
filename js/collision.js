class CollisionCircle {
  constructor(pos, r, m = 1) {
    this.position = pos;

    this.radius = r;

    this.m = m;
    this.v = new Vector2D(0, 0);
    this.a = new Vector2D(0, 0);
    this.theta = 0;
    this.omega = 0;
    this.alpha = 0;
    this.J = (this.m * (this.radius * this.radius)) / 12000;
  }
}

class CollisionBox {
  constructor(pos, w, h, m = 1) {
    this.position = pos;

    this.width = w;
    this.height = h;

    this.topLeft = this.position;
    this.topRight = new Vector2D(pos.x + w, pos.y);
    this.bottomRight = new Vector2D(pos.x + w, pos.y + h);
    this.bottomLeft = new Vector2D(pos.x, pos.y + h);

    this.m = m;
    this.v = new Vector2D(0, 0);
    this.a = new Vector2D(0, 0);
    this.theta = 0;
    this.omega = 0; //Math.random() * 4;
    this.alpha = 0;
    this.J =
      (this.m * (this.height * this.height + this.width * this.width)) / 12000;
  }

  center() {
    var diagonal = this.bottomRight.subtract(this.topLeft);
    var midPoint = this.topLeft.add(diagonal.scale(0.5));

    return midPoint;
  }

  rotate(angle) {
    this.theta += angle;
    var center = this.center();

    this.topLeft = this.topLeft.rotate(angle, center);
    this.topRight = this.topRight.rotate(angle, center);
    this.bottomRight = this.bottomRight.rotate(angle, center);
    this.bottomLeft = this.bottomLeft.rotate(angle, center);

    return this;
  }

  move(v) {
    this.topLeft = this.topLeft.add(v);
    this.topRight = this.topRight.add(v);
    this.bottomRight = this.bottomRight.add(v);
    this.bottomLeft = this.bottomLeft.add(v);

    return this;
  }

  vertex(id) {
    switch (id) {
      case 0:
        return this.topLeft;
        break;
      case 1:
        return this.topRight;
        break;
      case 2:
        return this.bottomRight;
        break;
      case 3:
        return this.bottomLeft;
        break;
    }
  }
}
