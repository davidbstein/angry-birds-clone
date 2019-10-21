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
