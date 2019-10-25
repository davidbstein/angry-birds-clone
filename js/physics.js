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

// class Box {
//   constructor(min, max) {
//     this.min = min;
//     this.max = max;
//   }

//   checkCollision(other) {
//     // if(this.max.x < other.)
//   }
// }

// class Circle {
//   constructor(pos, rad) {
//     this.radius = rad;
//     this.position = pos;
//   }
// }

// circleVsCircle(a, b) {
//   var r = a.radius + b.radius;
//   r *= r;

//   return (r < ((a.position.x - b.position.x)^2 + (a.position.y - b.position.y)^2));
// }

// boxVsBox(a, b) {
//   var l1 = a.min.x;
//   var t1 = a.min.y;
//   var r1 = a.max.x;
//   var b1 = a.max.y;

//   var l2 = b.min.x;
//   var t2 = b.min.y;
//   var r2 = b.max.x;
//   var d2 = b.max.y;

//   if(r1 < l2 || l1 > r2 || b1 < t2 || t1 > b2) {
//     return false;
//   }

//   return true;

// }

// circleVsBox(circle, box) {

// }

// resolveCollision(object, other) {

// }
