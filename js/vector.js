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

  multiply(coefficient) {
    return new Vector2D(this.x * coefficient, this.y * coefficient);
  }
}

// Vector2D.prototype = {
//   negative: function() {
//     this.x = -this.x;
//     this.y = -this.y;
//     return this;
//   }
// };

// Vector2D.negative = function(v) {
//   return new Vector2D(-v.x, -v.y);
// };
