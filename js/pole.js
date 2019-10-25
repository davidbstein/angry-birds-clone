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
  }

  createPole() {
    this.poleImage = new Image();

    if (!this.isVertical) {
      this.poleImage.src = './images/log-1.png';
    } else {
      this.poleImage.src = './images/log-1-vertical.png';
    }
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

  applyTorque(torque) {
    if (this.rotation < 0) this.rotation -= torque;
  }

  detectCollision(others) {
    this.position.x = this.basePos.x;
    this.position.y = this.basePos.y - this.length;

    for (let i = 0; i < others.length; i++) {
      const element = others[i];
      if (element != this) {
        switch (element.collisionType) {
          case 'circle':
            if (
              element.position.x + element.width > this.collision.topLeft.x &&
              element.position.x < this.collision.topRight.x &&
              element.position.y + element.height > this.collision.topLeft.y &&
              element.position.y < this.collision.bottomLeft.y &&
              1
            ) {
              this.initCollision(element);
              this.torque = 0.01 * (this.basePos.y - element.position.x);
              element.resolveCollision(this.material);

              for (let i = 0; i < others.length; i++) {
                const element = others[i];
                if (element.collisionType == 'box') {
                  element.enableGravity();
                }
              }
            }
            break;
          case 'box':
            // this.initCollision(element);
            break;
        }
      }
    }
  }

  initCollision(other) {
    this.isCollided = true;
    this.otherCollisionObject = other;

    console.log(this.collision.topLeft);
    this.enableGravity();

    var collision = other.position;
    var N = this.collision.center().subtract(collision);

    N = N.scale(1 / N.magnitude());

    var Vr = this.collision.v;

    var I = N.scale(-1 * (1 + 0.3)); // * Vr.dot(N));

    this.collision.v = I;

    var rotationDir = -1;
    this.collision.omega =
      -1 *
      0.2 *
      // (this.collision.omega / Math.abs(this.collision.omega)) *
      rotationDir *
      this.collision
        .center()
        .subtract(collision)
        .cross(Vr);

    console.log(this.collision.omega);
  }

  satTest(other) {
    // var otherCollision = other.collision;
    var testVectors = [
      this.collision.topRight.subtract(this.collision.topLeft),
      this.collision.bottomRight.subtract(this.collision.topRight),
      other.collision.topRight.subtract(other.collision.topLeft),
      other.collision.bottomRight.subtract(other.collision.topRight)
    ];

    var thisInvolvedVertices = [];
    var otherInvolvedVertices = [];

    // Check test vectors
    for (let i = 0; i < 4; i++) {
      thisInvolvedVertices[i] = [];
      otherInvolvedVertices[i] = [];

      var myProjections = [];
      var foreignProjections = [];

      for (let j = 0; j < 4; j++) {
        myProjections.push(testVectors[i].dot(this.collision.vertex(j)));
        foreignProjections.push(testVectors[i].dot(other.collision.vertex(j)));
      }

      for (var j in foreignProjections) {
        if (
          foreignProjections[j] > myProjections.min() &&
          foreignProjections[j] < myProjections.max()
        ) {
          otherInvolvedVertices[i].push(other.collision.vertex(j));
        }

        for (var j in myProjections) {
          if (
            myProjections[j] > foreignProjections.min() &&
            myProjections[j] < foreignProjections.max()
          ) {
            thisInvolvedVertices[i].push(this.collision.vertex(j));
          }
        }
      }
    }

    thisInvolvedVertices = this.intersectSafe(
      this.intersectSafe(thisInvolvedVertices[0], thisInvolvedVertices[1]),
      this.intersectSafe(thisInvolvedVertices[2], thisInvolvedVertices[3])
    );
    otherInvolvedVertices = this.intersectSafe(
      this.intersectSafe(otherInvolvedVertices[0], otherInvolvedVertices[1]),
      this.intersectSafe(otherInvolvedVertices[2], otherInvolvedVertices[3])
    );

    if (thisInvolvedVertices.length == 1 && otherInvolvedVertices.length == 2) {
      return thisInvolvedVertices[0];
    } else if (
      otherInvolvedVertices.length == 1 &&
      thisInvolvedVertices.length == 2
    ) {
      return otherInvolvedVertices[0];
    } else if (
      thisInvolvedVertices.length === 1 &&
      otherInvolvedVertices.length === 1
    ) {
      return thisInvolvedVertices[0];
    } else if (
      thisInvolvedVertices.length === 1 &&
      otherInvolvedVertices.length === 0
    ) {
      return thisInvolvedVertices[0];
    } else if (
      thisInvolvedVertices.length === 0 &&
      otherInvolvedVertices.length === 1
    ) {
      return otherInvolvedVertices[0];
    } else if (
      thisInvolvedVertices.length === 0 &&
      otherInvolvedVertices.length === 0
    ) {
      return false;
    } else {
      console.log('Unknown collision profile');
      console.log(thisInvolvedVertices);
      console.log(otherInvolvedVertices);
    }

    return true;
  }

  intersectSafe(a, b) {
    var result = new Array();

    var as = a.map(function(x) {
      return x.toString();
    });

    var bs = b.map(function(x) {
      return x.toString();
    });

    for (var i in as) {
      if (bs.indexOf(as[i]) !== -1) {
        result.push(a[i]);
      }
    }

    return result;
  }

  circleCollisionTest(other) {
    var cX, cY;
    if (other.position.x < this.collision.topLeft.x) {
      cX = this.collision.topLeft.x;
    } else if (other.position.x > this.collision.topRight.x) {
      cX = this.collision.topRight.x;
    } else {
      cX = other.position.x;
    }

    if (other.position.y < this.collision.topLeft.y) {
      cX = this.collision.topLeft.y;
    } else if (other.position.y > this.collision.bottomLeft.y) {
      cX = this.collision.bottomLeft.y;
    } else {
      cX = other.position.y;
    }

    if (other.position.distance(new Vector2D(cX, cY)) < other.width) {
      return new Vector2D(cX, cY);
    }
    return false;
  }

  update() {
    var f = new Vector2D(0, 0);
    var torque = 0;

    var dr = this.collision.v
      .scale(this.dt)
      .add(this.collision.a.scale(0.5 * this.dt * this.dt));
    this.collision.move(dr.scale(100));

    //Gravity
    f = f.add(new Vector2D(0, this.collision.m * 9.81 * 0.5));
    // console.log(f);
    //Damping
    f = f.add(this.collision.v.scale(this.linearB));

    // Collision

    if (this.isCollided) {
      if (this.otherCollisionObject.collisionType == 'box') {
        var collision = this.satTest(this.otherCollisionObject);
      } else if (this.otherCollisionObject.collisionType == 'circle') {
        var collision = this.circleCollisionTest(this.otherCollisionObject);
      }

      // console.log(this.collision.topLeft);

      if (collision) {
        //   var N = this.collision.center().subtract();
        var N = this.collision.center().subtract(collision);
        N = N.scale(1 / N.magnitude());
        var Vr = this.collision.v;
        var I = N.scale(-1 * (1 + 0.3) * Vr.dot(N));
        this.collision.v = I;
        this.collision.omega =
          -1 *
          0.2 *
          (this.collision.omega / Math.abs(this.collision.omega)) *
          this.collision
            .center()
            .subtract(collision)
            .cross(Vr);
      }
    }

    //Velocity
    var new_a = f.scale(this.collision.m);
    var dv = this.collision.a.add(new_a).scale(0.5 * this.dt);
    this.collision.v = this.collision.v.add(dv);

    //Rotation
    torque += this.collision.omega * this.angularB;
    this.collision.alpha = torque / this.collision.J;
    this.omega += this.collision.alpha * this.dt;
    var deltaTheta = this.collision.omega * this.dt;
    this.collision.rotate(deltaTheta);
  }
}
