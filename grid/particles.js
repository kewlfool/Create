class Particle {
  constructor(x = random(width), y = random(height)) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    // this.vel.mult(1);
    this.maxSpeed = 4;
    this.acc = createVector(0, 0);
    this.maxForce = 1;

    this.r = 5;

    this.wanderTheta = PI / 2;

    this.currentPath = [];
    this.paths = [this.currentPath];
    this.tail = random(3, 5);

    //noise loops
    this.xNoise = new NoiseLoop(0.5, -width, width * 2);
    this.yNoise = new NoiseLoop(0.5, -height, height * 2);
    this.dNoise = new NoiseLoop(7, 10, 120);
    this.rNoise = new NoiseLoop(7, 100, 255);
    this.bNoise = new NoiseLoop(7, 100, 255);
  }

  update() {
    this.acc.limit(this.maxForce);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
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

  applyForce(force) {
    this.acc.add(force);
  }

  trail() {
    this.currentPath.push(this.pos.copy());
    // Count positions
    let total = 0;
    for (let path of this.paths) {
      total += path.length;
    }

    // total > 5000 || (total > 10 && millis() > 3000)
    if (total > this.tail) {
      this.paths[0].shift();
      if (this.paths[0].length === 0) {
        this.paths.shift();
      }
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
  checkEdges() {
    if (
      this.pos.x > width ||
      this.pos.x < 0 ||
      this.pos.y > height ||
      this.pos.y < 0
    ) {
      this.pos.x = random(50, width);
      this.pos.y = random(50, height);
    }
  }
}

class Circle {
  constructor(x, y) {
    this.pos = createVector(x * scl, y * scl);

    this.nextState = random(2) > 1;
    this.state = this.nextState;

    this.nbr = [];

    // this.vel = p5.Vector.random2D();
    // this.vel.mult(0.15);
    // this.maxSpeed = 4;
    // this.acc = createVector(0, -0.3);
    // this.maxForce = 1;
  }

  addNeighbor(cell) {
    this.nbr.push(cell);
  }

  calcNextState() {
    // To be implemented
  }

  update() {
    this.acc.limit(this.maxForce);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  show() {
    noFill();
    strokeWeight(1);

    this.state = this.nextState;
    stroke(0);

    if (this.state) {
      fill(0);
    } else {
      fill(255);
    }
    rect(this.pos.x, this.pos.y, scl, scl);
  }
}
