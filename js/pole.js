class Pole {
  constructor(context, towerPos, polePos, material, mass, isVertical) {
    this.context = context;
    this.towerPosition = towerPos;
    this.material = material || 'wood';
    this.collisionType = 'box';

    this.length = isVertical ? 20 : 100;
    this.thickness = isVertical ? 100 : 20;

    this.localPosition = polePos;
    this.isVertical = isVertical;
    this.torque = 0;

    this.rotation = -90;
    this.isCollided = false;
    this.otherCollisionObject = null;

    this.position = new Vector2D(
      towerPos.x + this.localPosition.x,
      towerPos.y - this.localPosition.y
    );

    this.basePos = this.position.add(new Vector2D(this.length, this.thickness));

    this.createPole();

    // New logic
    this.dt = 0.02;
    this.linearB = -1;
    this.angularB = -1;

    this.collision = new CollisionBox(
      this.position,
      this.length,
      this.thickness,
      mass
    );
  }

  createPole() {
    this.poleImage = new Image();

    if (!this.isVertical) {
      this.poleImage.src = './images/log-1.png';
    } else {
      this.poleImage.src = './images/log-1-vertical.png';
    }

    this.health = 5;
  }

  enableGravity() {
    this.collision.m = 1;
  }

  draw() {
    // this.context.save();
    // this.context.translate(this.basePos.x, this.basePos.y);
    // this.context.rotate((this.rotation * Math.PI) / 180);
    // this.context.translate(0, 0);

    // this.context.drawImage(
    //   this.poleImage,
    //   //   this.position.x,
    //   //   this.position.y,
    //   0,
    //   0,
    //   this.length,
    //   this.thickness
    // );

    // this.context.restore();

    // if (this.isCollided) this.applyTorque(this.torque);

    //New logic

    this.context.save();

    this.context.translate(this.collision.topLeft.x, this.collision.topLeft.y);
    this.context.rotate(this.collision.theta);
    this.context.drawImage(
      this.poleImage,
      0,
      0,
      this.collision.width,
      this.collision.height
    );

    this.context.restore();

    this.update();
  }

  detectCollision(others, bird, ground, score) {
    if (
      bird.position.x + bird.width > this.collision.topLeft.x &&
      bird.position.x < this.collision.topRight.x &&
      bird.position.y + bird.height > this.collision.topLeft.y &&
      bird.position.y < this.collision.bottomLeft.y
    ) {
      this.initCircleCollision(bird);
      bird.resolveCollision(this.material);

      this.health--;

      for (let i = 0; i < others.length; i++) {
        const element = others[i];
        if (element.collisionType == 'box') {
          element.enableGravity();
        }
      }

      return;
    }

    if (
      ground.collision.topLeft.y < this.collision.bottomLeft.y &&
      ground.collision.bottomLeft.y > this.collision.topLeft.y
    ) {
      console.log('collided');
      this.initBoxCollision(ground);
    }

    if (this.getLowestVertex.y > ground.position.y) {
      this.collision.omega = -this.collision.omega;
      // this.collision.m = 0;
      this.collision.v.y = 0; //this.collision.v.negative();
      console.log('ground');
      this.initGroundCollision(ground);
      return;
    }

    for (let i = 0; i < others.length; i++) {
      const element = others[i];

      if (this.health <= 0) {
        others.splice(i, 1);
        score.increaseScore(5);
        break;
      }

      if (element != this) {
        switch (element.collisionType) {
          case 'box':
            // this.initCollision(element);
            if (
              element.collision.topLeft.x < this.collision.topRight.x &&
              element.collision.topRight.x > this.collision.topLeft.x &&
              element.collision.topLeft.y < this.collision.bottomLeft.y &&
              element.collision.bottomLeft.y > this.collision.topLeft.y
            ) {
              this.initBoxCollision(element);
              // this.health--;
            }
            break;

          case 'pig':
            if (
              element.position.x + element.width > this.collision.topLeft.x &&
              element.position.x < this.collision.topRight.x &&
              element.position.y + element.height > this.collision.topLeft.y &&
              element.position.y < this.collision.bottomLeft.y
            ) {
              element.decreaseHealth(1);
              score.increaseScore(1);
            }
            break;
        }
      }
    }
  }

  getLowestVertex() {
    if (this.collision.topLeft.y <= this.collision.bottomLeft.y) {
      return this.collision.bottomLeft;
    } else return this.collision.topLeft;
  }

  initCircleCollision(other) {
    this.isCollided = true;
    this.otherCollisionObject = other;
    this.health -= 2;

    // console.log(this.collision.topLeft);
    this.enableGravity();

    var collision = other.position;
    var N = this.collision.center().subtract(collision);

    N = N.scale(1 / N.magnitude());

    var Vr = this.collision.v;

    var I = N.scale(-1 * (1 + 0.3)); // * Vr.dot(N));

    this.collision.v = I.scale(0.01);

    var rotationDir = -1;
    this.collision.omega =
      -1 *
      0.2 *
      // (this.collision.omega / Math.abs(this.collision.omega)) *
      rotationDir *
      this.collision
        .center()
        .subtract(collision)
        .cross(Vr) *
      0.1;

    this.collision.v.x += 50;
  }

  initBoxCollision(other) {
    this.isCollided = true;
    this.otherCollisionObject = other;

    var collision = other.collision.center();

    var N = this.collision.center().subtract(collision);

    N = N.scale(1 / N.magnitude());

    var Vr = this.collision.v;

    var I = N.scale(-1 * (1 + 0.3) * Vr.dot(N)); // * Vr.dot(N));

    this.collision.v = I;

    var rotationDir = -1;
    this.collision.omega =
      0.1 *
      -1 *
      0.2 *
      // (this.collision.omega / Math.abs(this.collision.omega)) *
      rotationDir *
      this.collision
        .center()
        .subtract(collision)
        .cross(Vr);
  }

  // satTest(other) {
  //   // var otherCollision = other.collision;
  //   var testVectors = [
  //     this.collision.topRight.subtract(this.collision.topLeft),
  //     this.collision.bottomRight.subtract(this.collision.topRight),
  //     other.collision.topRight.subtract(other.collision.topLeft),
  //     other.collision.bottomRight.subtract(other.collision.topRight)
  //   ];

  //   var thisInvolvedVertices = [];
  //   var otherInvolvedVertices = [];

  //   // Check test vectors
  //   for (let i = 0; i < 4; i++) {
  //     thisInvolvedVertices[i] = [];
  //     otherInvolvedVertices[i] = [];

  //     var myProjections = [];
  //     var foreignProjections = [];

  //     for (let j = 0; j < 4; j++) {
  //       myProjections.push(testVectors[i].dot(this.collision.vertex(j)));
  //       foreignProjections.push(testVectors[i].dot(other.collision.vertex(j)));
  //     }

  //     for (var j in foreignProjections) {
  //       if (
  //         foreignProjections[j] > myProjections.min() &&
  //         foreignProjections[j] < myProjections.max()
  //       ) {
  //         otherInvolvedVertices[i].push(other.collision.vertex(j));
  //       }

  //       for (var j in myProjections) {
  //         if (
  //           myProjections[j] > foreignProjections.min() &&
  //           myProjections[j] < foreignProjections.max()
  //         ) {
  //           thisInvolvedVertices[i].push(this.collision.vertex(j));
  //         }
  //       }
  //     }
  //   }

  //   thisInvolvedVertices = this.intersectSafe(
  //     this.intersectSafe(thisInvolvedVertices[0], thisInvolvedVertices[1]),
  //     this.intersectSafe(thisInvolvedVertices[2], thisInvolvedVertices[3])
  //   );
  //   otherInvolvedVertices = this.intersectSafe(
  //     this.intersectSafe(otherInvolvedVertices[0], otherInvolvedVertices[1]),
  //     this.intersectSafe(otherInvolvedVertices[2], otherInvolvedVertices[3])
  //   );

  //   if (thisInvolvedVertices.length == 1 && otherInvolvedVertices.length == 2) {
  //     return thisInvolvedVertices[0];
  //   } else if (
  //     otherInvolvedVertices.length == 1 &&
  //     thisInvolvedVertices.length == 2
  //   ) {
  //     return otherInvolvedVertices[0];
  //   } else if (
  //     thisInvolvedVertices.length === 1 &&
  //     otherInvolvedVertices.length === 1
  //   ) {
  //     return thisInvolvedVertices[0];
  //   } else if (
  //     thisInvolvedVertices.length === 1 &&
  //     otherInvolvedVertices.length === 0
  //   ) {
  //     return thisInvolvedVertices[0];
  //   } else if (
  //     thisInvolvedVertices.length === 0 &&
  //     otherInvolvedVertices.length === 1
  //   ) {
  //     return otherInvolvedVertices[0];
  //   } else if (
  //     thisInvolvedVertices.length === 0 &&
  //     otherInvolvedVertices.length === 0
  //   ) {
  //     return false;
  //   } else {
  //     console.log('Unknown collision profile');
  //     console.log(thisInvolvedVertices);
  //     console.log(otherInvolvedVertices);
  //   }

  //   return true;
  // }

  // intersectSafe(a, b) {
  //   var result = new Array();

  //   var as = a.map(function(x) {
  //     return x.toString();
  //   });

  //   var bs = b.map(function(x) {
  //     return x.toString();
  //   });

  //   for (var i in as) {
  //     if (bs.indexOf(as[i]) !== -1) {
  //       result.push(a[i]);
  //     }
  //   }

  //   return result;
  // }

  // circleCollisionTest(other) {
  //   var cX, cY;
  //   if (other.position.x < this.collision.topLeft.x) {
  //     cX = this.collision.topLeft.x;
  //   } else if (other.position.x > this.collision.topRight.x) {
  //     cX = this.collision.topRight.x;
  //   } else {
  //     cX = other.position.x;
  //   }

  //   if (other.position.y < this.collision.topLeft.y) {
  //     cX = this.collision.topLeft.y;
  //   } else if (other.position.y > this.collision.bottomLeft.y) {
  //     cX = this.collision.bottomLeft.y;
  //   } else {
  //     cX = other.position.y;
  //   }

  //   if (other.position.distance(new Vector2D(cX, cY)) < other.width) {
  //     return new Vector2D(cX, cY);
  //   }
  //   return false;
  // }

  update() {
    var f = new Vector2D(0, 0);
    var torque = 0;

    var dr = this.collision.v
      .scale(this.dt)
      .add(this.collision.a.scale(0.5 * this.dt * this.dt));
    // this.collision.move(dr.scale(100));
    this.collision.move(dr.scale(10));

    //Gravity
    f = f.add(new Vector2D(0, this.collision.m * 9.81 * 0.5 * 10));
    // console.log(f);
    //Damping
    f = f.add(this.collision.v.scale(this.linearB));

    // Collision

    // if (this.isCollided) {
    //   if (this.otherCollisionObject.collisionType == 'box') {
    //     var collision = this.satTest(this.otherCollisionObject);
    //   } else if (this.otherCollisionObject.collisionType == 'circle') {
    //     var collision = this.circleCollisionTest(this.otherCollisionObject);
    //   }

    //   // console.log(this.collision.topLeft);

    //   if (collision) {
    //     //   var N = this.collision.center().subtract();
    //     var N = this.collision.center().subtract(collision);
    //     N = N.scale(1 / N.magnitude());
    //     var Vr = this.collision.v;
    //     var I = N.scale(-1 * (1 + 0.3) * Vr.dot(N));
    //     this.collision.v = I;
    //     this.collision.omega =
    //       -1 *
    //       0.2 *
    //       (this.collision.omega / Math.abs(this.collision.omega)) *
    //       this.collision
    //         .center()
    //         .subtract(collision)
    //         .cross(Vr);
    //   }
    // }

    //Velocity
    var new_a = f.scale(this.collision.m);
    var dv = this.collision.a.add(new_a).scale(0.5 * this.dt);
    this.collision.v = this.collision.v.add(dv);

    //Rotation
    torque += this.collision.omega * this.angularB * this.dt;
    this.collision.alpha = torque / this.collision.J;
    this.omega += this.collision.alpha * this.dt;
    var deltaTheta = this.collision.omega * this.dt;
    this.collision.rotate(deltaTheta * this.dt);
  }
}

//
//  new logic

class MyPole {
  constructor(context, towerPos, polePos, material, mass, isVertical) {
    this.context = context;
    this.towerPosition = towerPos;
    this.material = material || 'wood';
    this.collisionType = 'box';

    this.length = isVertical ? 20 : 100;
    this.thickness = isVertical ? 100 : 20;

    this.length = 20;
    this.thickness = 100;

    this.localPosition = polePos;
    this.isVertical = isVertical;
    this.torque = 0;

    this.initialVelocity = new Vector2D(0, 5);

    this.health = 5;

    this.rotation = -90;
    this.isCollided = false;
    this.otherCollisionObject = null;

    this.position = new Vector2D(
      towerPos.x + this.localPosition.x,
      towerPos.y - this.localPosition.y
    );

    this.basePos = this.position.add(new Vector2D(this.length, this.thickness));

    this.createPole();

    // New logic
    this.dt = 0.02;
    this.linearB = -1;
    this.angularB = -1;

    this.collision = new CollisionBox(
      this.position,
      this.length,
      this.thickness,
      mass
    );

    this.frames = 0;
    this.time = 0;
    this.gravity = -0.0981;

    // this.collision.theta = 0;
    if (isVertical) {
      this.collision.theta = (-90 * Math.PI) / 180;
    }
  }

  createPole() {
    this.poleImage = new Image();

    // if (!this.isVertical) {
    //   this.poleImage.src = './images/log-1.png';
    // } else {
    this.poleImage.src = './images/log-1-vertical.png';
    // }
  }

  draw() {
    this.context.save();

    this.context.translate(this.collision.topLeft.x, this.collision.topLeft.y);
    this.context.rotate(this.collision.theta);
    this.context.drawImage(
      this.poleImage,
      0,
      0,
      this.collision.width,
      this.collision.height
    );

    this.context.restore();

    this.update();
  }

  update() {
    this.frames = ++this.frames % 60;
    this.time++;

    this.position.x += this.collision.v.x;
    this.position.y -= this.collision.v.y;

    this.collision.move(new Vector2D(this.collision.v.x, this.collision.v.y));

    // if (this.isFired) {
    this.collision.v.y = this.initialVelocity.y - this.gravity * this.time;
    // }

    //Force

    var slope =
      (this.collision.bottomLeft.y - this.collision.topLeft.y) /
      (this.collision.bottomLeft.x - this.collision.topLeft.x);

    // if (this.isVertical) slope = 1 - slope;
    slope *= Math.PI / 180;
    if (slope != Infinity && slope != NaN) this.collision.rotate(-slope);
  }

  detectCollision(others) {
    for (let i = 0; i < others.length; i++) {
      const element = others[i];

      switch (element.collisionType) {
        case 'ground':
          if (this.getLowestVertex().y > element.position.y) {
            this.gravity = 0;
            this.collision.v.y = 0;
          }

        case 'circle':
          this.resolveCircleCollision(element);
          break;
        case 'box':
          //this.resolveBoxCollision(element);
          break;
      }
    }

    return;
  }

  getLowestVertex() {
    if (this.collision.topLeft.y <= this.collision.bottomLeft.y) {
      return this.collision.bottomLeft;
    } else return this.collision.topLeft;
  }

  resolveCircleCollision(element) {
    if (
      element.position.x + element.width > this.collision.topLeft.x &&
      element.position.x < this.collision.topRight.x &&
      element.position.y + element.height > this.collision.topLeft.y &&
      element.position.y < this.collision.bottomLeft.y
    ) {
      var collision = this.collision.center().subtract(element.center);

      // this.collision.rotate(
      //   (element.velocity.x *
      //     (this.collision.center().y - element.center.y) *
      //     Math.PI) /
      //     180
      // );

      if (element.center.x < this.collision.topLeft.x) {
        element.velocity.x = -1;
      }
      if (element.center.y < this.collision.topLeft.y) {
        element.velocity.y = -element.velocity.y;
      }

      // this.collision.omega = -1;
    }
  }

  resolveBoxCollision(element) {
    if (
      element.collision.topLeft.x < this.collision.topRight.x &&
      element.collision.topRight.x > this.collision.topLeft.x &&
      element.collision.topLeft.y < this.collision.bottomLeft.y &&
      element.collision.bottomLeft.y > this.collision.topLeft.y
    ) {
      // this.collision.v.y = 0;
      this.collision.omega = 0;
    }
  }
}
