class Vector2D {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  negative() {
    return new Vector2D(-this.x, -this.y);
  }

  distance(other) {
    var dx = other.x - this.x;
    var dy = other.y - this.y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  magnitude() {
    var m = Math.sqrt(this.x * this.x + this.y * this.y);
    return m;
  }

  unitVector() {
    return new Vector2D(this.x / this.magnitude(), this.y / this.magnitude());
  }

  normal() {
    var n = new Vector2D(0, 0);
    n.x = 1;
    n.y = -(this.x / this.y);

    return n.unitVector();
  }

  add(other) {
    var sum = new Vector2D(0, 0);
    sum.x = this.x + other.x;
    sum.y = this.y + other.y;
    return sum;
  }

  subtract(other) {
    return new Vector2D(this.x - other.x, this.y - other.y);
  }

  scale(coefficient) {
    return new Vector2D(this.x * coefficient, this.y * coefficient);
  }

  dot(other) {
    var d = this.x * other.x + this.y * other.y;
    return d;
  }

  cross(other) {
    var crossProductZ = this.x * other.y - this.y * other.x;
    return crossProductZ;
  }

  toString() {
    return '[' + this.x + ',' + this.y + ']';
  }

  rotate(angle, axis) {
    var x = this.x - axis.x;
    var y = this.y - axis.y;

    var x_prime = axis.x + (x * Math.cos(angle) - y * Math.sin(angle));
    var y_prime = axis.y + (x * Math.sin(angle) + y * Math.cos(angle));

    return new Vector2D(x_prime, y_prime);
  }
}

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};
