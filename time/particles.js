class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    // this.vel = p5.Vector.random2D();
    // this.acc = createVector(0, 0);
    this.step = p5.Vector.random2D();

    this.mouseV = createVector(mouseX, mouseY);
    this.mouseV.normalize();
    // this.maxspeed = 3;
    this.prevPos = this.pos.copy();
    this.r = 0;
  }

  update() {
    // this.vel.add(this.acc);
    // this.vel.limit(this.maxspeed);
    // this.pos.add(this.vel);
    // this.acc.mult(0);
    this.step = p5.Vector.random2D();

    this.r = random(100);

    if (this.r < 35) {
      // Calculate the direction from the vector's position to the mouse position
      let direction = createVector(mouseX - this.pos.x, mouseY - this.pos.y);

      // Normalize the direction vector to have a length of 1
      direction.normalize();

      // Update the vector's direction
      this.step.set(direction);

      // this.step.mult(random(40, 60));
      // this.step.set(this.mouseV);
      this.step.setMag(15);
    } else {
      this.step.setMag(15);
    }

    // this.step.add(this.acc);
    // this.step.limit(this.maxspeed);
    // this.pos.add(this.step);
    // this.acc.mult(0);

    this.pos.add(this.step);
  }

  show() {
    stroke(0, 70);
    // stroke(random(10, 255), random(10, 255), random(100, 255), 9);
    strokeWeight(1.5);

    // point(this.pos.x, this.pos.y);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);

    this.updatePrev();
  }

  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  follow(vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }
}
