class Particle {
  constructor(x = random(width), y = random(height)) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(4);
    this.acc = createVector(0, 0);
    this.maxSpeed = 5;
    this.maxForce = 0.2;
    this.r = 4;

    this.wanderTheta = PI / 2;
    this.xoff = 0;

    this.target = createVector(x, y);

    this.currentPath = [];
    this.paths = [this.currentPath];
  }

  arrive(target) {
    // 2nd argument true enables the arrival behavior

    if (target instanceof p5.Vector) {
      return this.seek(target, true);
    } else {
      let target2 = target.pos.copy();
      return this.seek(target2, true);
    }

    // let target2 = target;
    // return this.seek(target2, true);
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

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    this.currentPath.push(this.pos.copy());
    // Count positions
    let total = 0;
    for (let path of this.paths) {
      total += path.length;
    }

    if (total > 5000 || (total > 10 && millis() > 3000)) {
      this.paths[0].shift();
      if (this.paths[0].length === 0) {
        this.paths.shift();
      }
    }
  }

  show() {
    stroke(222);
    strokeWeight(1);
    fill(0);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    pop();

    for (let path of this.paths) {
      beginShape();
      push();
      noFill();
      stroke(222);
      strokeWeight(0.5);
      for (let v of path) {
        vertex(v.x, v.y);
      }
      endShape();
      pop();
    }
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

    this.maxSpeed = 16;
    this.maxForce = 4;
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

// Flocking
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM

class Boid {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4));
    this.acceleration = createVector();
    this.maxForce = 0.2;
    this.maxSpeed = 5;
  }

  edges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }

  align(boids) {
    let perceptionRadius = 25;
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && d < perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  separation(boids) {
    let perceptionRadius = 24;
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && d < perceptionRadius) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(d * d);
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  cohesion(boids) {
    let perceptionRadius = 50;
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && d < perceptionRadius) {
        steering.add(other.position);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  flock(boids) {
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let separation = this.separation(boids);

    alignment.mult(alignSlider.value());
    cohesion.mult(cohesionSlider.value());
    separation.mult(separationSlider.value());

    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  show() {
    strokeWeight(6);
    stroke(255);
    point(this.position.x, this.position.y);
  }
}
