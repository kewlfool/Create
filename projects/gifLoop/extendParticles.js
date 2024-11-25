class Dot extends Particle {
  constructor(x, y) {
    super(x, y);
    this.start = createVector(random(width), random(height));
    this.pos = this.start.copy();
    // this.target = this;
    this.target = createVector(x, y);
    // this.vel = p5.Vector.random2D();

    this.maxSpeed = 20;
    this.maxForce = 6;
  }

  behavior() {
    var arrive = this.arrive(this.target);
    let mouse = createVector(mouseX, mouseY);
    var flee = this.flee(mouse);

    arrive.mult(1.7);
    flee.mult(1.6);

    this.applyForce(arrive);
    this.applyForce(flee);
  }

  show() {
    stroke(255);
    strokeWeight(this.r / 8);
    point(this.pos.x, this.pos.y);
  }
  arrive(target) {
    // 2nd argument true enables the arrival behavior
    let target2 = target;
    return this.seek(target2, true);
  }

  // arrive(target) {
  //   let desired = p5.Vector.sub(target, this.pos);
  //   let d = desired.mag();
  //   let speed = this.maxspeed;
  //   if (d < 100) {
  //     speed = map(d, 0, 100, 0, this.maxspeed);
  //   }
  //   desired.setMag(speed);
  //   let steer = p5.Vector.sub(desired, this.vel);
  //   steer.limit(this.maxforce);
  //   return steer;
  // }

  // flee(target) {
  //   let desired = p5.Vector.sub(target, this.pos);
  //   let d = desired.mag();
  //   if (d < 50) {
  //     desired.setMag(this.maxspeed);
  //     desired.mult(-1);
  //     let steer = p5.Vector.sub(desired, this.vel);
  //     steer.limit(this.maxforce);
  //     return steer;
  //   } else {
  //     return createVector(0, 0);
  //   }
  // }
}

class Target extends Particle {
  constructor(x, y) {
    super(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(4);
  }

  show() {
    push();
    stroke(255);
    strokeWeight(0);
    fill(255, 30, 100);
    rectMode(CENTER);
    translate(this.pos.x, this.pos.y);
    circle(0, 0, this.r);
    pop();
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
    // this.edges();

    // super.update();
  }
}

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
