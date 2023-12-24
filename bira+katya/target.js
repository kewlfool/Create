class Attractor {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.mass = m;
    this.r = sqrt(this.mass) * 2;
  }

  attract(mover) {
    let force = p5.Vector.sub(this.pos, mover.pos);
    let distanceSq = constrain(force.magSq(), 100, 1000);
    let G = 5;
    let strength = (G * (this.mass * mover.mass)) / distanceSq;
    force.setMag(strength);
    mover.applyForce(force);
  }

  show() {
    noStroke();
    fill(255, 0, 100);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}

class Mover {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(5);
    this.acc = createVector(0, 0);
    this.mass = m;
    this.r = sqrt(this.mass) * 2;

    this.angle = 0;
    this.angleV = 0;
    this.angleA = 0;
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    //this.angleA = this.acc.y / 50.0;

    //this.angleV += this.angleA;
    //this.angle += this.angleV;

    this.acc.set(0, 0);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255, 100);

    push();
    translate(this.pos.x, this.pos.y);
    this.angle = this.vel.heading();
    rotate(this.angle);
    triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    //line(0,0,this.r,0);
    //ellipse(0, 0, this.r * 2);
    pop();
  }
}

class Walker {
  constructor(x = width / 2, y = height / 2) {
    this.pos = createVector(x, y);
    this.vel = createVector(4, 4);
    this.c = color(random(255), random(255), random(255), 50);
  }

  display() {
    strokeWeight(5);
    stroke(this.c);
    point(this.pos.x, this.pos.y);
  }

  step() {
    // moves in all directions
    // this.pos.x = this.pos.x + random(this.vel.x, -this.vel.x);
    // this.pos.y = this.pos.y + random(this.vel.y, -this.vel.y);

    // moves in 4 directions only

    let r = floor(random(4));

    switch (r) {
      case 0:
        this.pos.x += this.vel.x;
        break;

      case 1:
        this.pos.x -= this.vel.x;
        break;

      case 2:
        this.pos.y += this.vel.y;
        break;

      case 3:
        this.pos.y -= this.vel.y;
        break;
    }
  }
}
