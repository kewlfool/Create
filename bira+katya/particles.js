class Particle {
  constructor(x = random(width), y = random(height)) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(4);
    this.acc = createVector(0, 0);
    this.maxSpeed = 5;
    this.maxForce = 0.2;
    this.r = 18;

    this.wanderTheta = PI / 2;
    this.xoff = 0;

    this.currentPath = [];
    this.paths = [this.currentPath];
  }

  wander() {
    let wanderPoint = this.vel.copy();
    wanderPoint.setMag(10);
    wanderPoint.add(this.pos);

    let wanderRadius = 6;
    // noFill();
    // stroke(255);
    // circle(wanderPoint.x, wanderPoint.y, 5);
    // line(this.pos.x, this.pos.y, wanderPoint.x, wanderPoint.y);

    let theta = this.wanderTheta + this.vel.heading();

    let x = wanderRadius * cos(theta);
    let y = wanderRadius * sin(theta);
    wanderPoint.add(x, y);
    // fill(0, 255, 0);
    // noStroke();
    // circle(wanderPoint.x, wanderPoint.y, 16);

    // stroke(255);
    // line(this.pos.x, this.pos.y, wanderPoint.x, wanderPoint.y);

    let steer = wanderPoint.sub(this.pos);
    steer.setMag(this.maxForce);
    this.applyForce(steer);

    let displaceRange = 0.3;
    this.wanderTheta += random(-displaceRange, displaceRange);
  }

  wanderNoise() {
    let angle = noise(this.xoff) * TWO_PI * 2;
    let steer = p5.Vector.fromAngle(angle);

    steer.setMag(this.maxForce);
    this.applyForce(steer);

    this.xoff += 0.02;
  }

  pursue(target) {
    let target2 = target.pos.copy();
    let prediction = target.vel.copy();

    prediction.mult(10);
    target2.add(prediction);
    fill(0, 255, 0);
    // circle(target2.pos.x, target2.pos.y, 16);
    return this.seek(target2);
  }

  arrive(target) {
    // 2nd argument true enables the arrival behavior
    let target2 = target.pos.copy();
    return this.seek(target2, true);
  }

  seek(target, arrival = false) {
    let force = p5.Vector.sub(target, this.pos);
    let desiredSpeed = this.maxSpeed;
    if (arrival) {
      let slowRadius = 100;
      let distance = force.mag();
      if (distance < slowRadius) {
        desiredSpeed = map(distance, 0, slowRadius, 0, this.maxSpeed);
      }
    }
    force.setMag(desiredSpeed);
    force.sub(this.vel);
    force.limit(this.maxForce);
    return force;
  }

  flee(target) {
    // let target2 = target.pos.copy();
    return this.seek(target).mult(-1);
  }

  evade(target) {
    let pursuit = this.pursue(target);
    pursuit.mult(-1);
    return pursuit;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  trail() {
    this.currentPath.push(this.pos.copy());
    // Count positions
    let total = 0;
    for (let path of this.paths) {
      total += path.length;
    }

    // total > 5000 || (total > 10 && millis() > 3000)
    if (total > 10) {
      this.paths[0].shift();
      if (this.paths[0].length === 0) {
        this.paths.shift();
      }
    }
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    pop();

    for (let path of this.paths) {
      beginShape();
      push();
      noFill();
      strokeWeight(0.5);
      for (let v of path) {
        vertex(v.x, v.y);
      }
      endShape();
      pop();
    }
  }

  edgesBounce() {
    if (this.pos.y >= height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y *= -1;
    }

    if (this.pos.x >= width - this.r) {
      this.pos.x = width - this.r;
      this.vel.x *= -1;
    }

    if (this.pos.y <= this.r) {
      this.pos.y = this.r;
      this.vel.y *= -1;
    } else if (this.pos.x <= this.r) {
      this.pos.x = this.r;
      this.vel.x *= -1;
    }
  }

  edges() {
    let hitEdge = false;
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
      hitEdge = true;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
      hitEdge = true;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
      hitEdge = true;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
      hitEdge = true;
    }

    if (hitEdge) {
      this.currentPath = [];
      this.paths.push(this.currentPath);
    }
  }
}

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
