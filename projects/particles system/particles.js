class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(0.5, 2));
    this.acc = createVector(0, 0);
    this.r = 4;
    this.lifetime = 255;
  }

  finished() {
    return this.lifetime < 0;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  edges() {
    if (this.pos.y >= height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y *= -1;
    }
    if (this.pos.y <= this.r) {
      this.pos.y = this.r;
      this.vel.y *= -1;
    }

    if (this.pos.x >= width - this.r) {
      this.pos.x = width - this.r;
      this.vel.x *= -1;
    } else if (this.pos.x <= this.r) {
      this.pos.x = this.r;
      this.vel.x *= -1;
    }
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    this.lifetime -= 5;
  }

  show() {
    stroke(255, this.lifetime);
    strokeWeight(2);
    fill(255, this.lifetime);

    ellipse(this.pos.x, this.pos.y, this.r * 2);
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

class Mover extends Particle {
  constructor(x, y, m) {
    super(x, y);
    this.vel.mult(5);
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
class Dot extends Particle {
  constructor(x, y) {
    super(x, y);
    this.start = createVector(random(width), random(height));
    this.pos = this.start.copy();
    // this.target = this;
    // this.target = createVector(x, y);
    // this.vel = p5.Vector.random2D();

    this.maxSpeed = 19;
    this.maxForce = 3.4;
  }

  behavior() {
    var arrive = this.arrive(this.target);
    let mouse = createVector(mouseX, mouseY);
    var flee = this.flee(mouse);

    // arrive.mult(1.8);   // main set of values
    // flee.mult(1.7);   // main set of values

    arrive.mult(1.8);
    flee.mult(1.7);

    this.applyForce(arrive);
    this.applyForce(flee);
  }

  show() {
    stroke(222);
    strokeWeight(this.r / 2);
    point(this.pos.x, this.pos.y);
  }

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
