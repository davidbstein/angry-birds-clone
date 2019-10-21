// class Collision {
//   constructor(restitution = 0.2) {
//     this.restitution = restitution;
//   }

//   elastic() {
//     this.res;
//   }
// }

// class PhysicsEntity {
//   constructor(collisionName, type) {
//     this.type = type;
//     this.collisionName = collisionName;

//     this.width = 20;
//     this.height = 20;
//   }
// }

class Box {
  constructor(min, max) {
    this.min = min;
    this.max = max;
  }

  checkCollision(other) {
    // if(this.max.x < other.)
  }
}

class Circle {
  constructor(pos, rad) {
    this.radius = rad;
    this.position = pos;
  }
}
