class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);

    this.step = p5.Vector.random2D();

    // this.mouseV = createVector(mouseX, mouseY);
    // this.mouseV.normalize();

    this.prevPos = this.pos.copy();
    this.r = 0;

    this.history = [];
  }

  update() {
    this.step = p5.Vector.random2D();

    this.r = random(100);

    if (this.r < 35) {
      // Calculate the direction from the vector's position to the mouse position
      // let direction = createVector(mouseX - this.pos.x, mouseY - this.pos.y);
      let direction = createVector(rx - this.pos.x, ry - this.pos.y);

      // Normalize the direction vector to have a length of 1
      direction.normalize();

      // Update the vector's direction
      this.step.set(direction);

      // this.step.mult(random(40, 60));
      // this.step.set(this.mouseV);
      this.step.setMag(5);
    } else {
      this.step.setMag(5);
    }

    // this.step.add(this.acc);
    // this.step.limit(this.maxspeed);
    // this.pos.add(this.step);
    // this.acc.mult(0);
    this.pos.add(this.step);

    let v = createVector(this.pos.x, this.pos.y);
    this.history.push(v);

    if (this.history.length > 20) {
      this.history.splice(0, 1);
    }
  }

  show() {
    stroke(2);
    noFill();

    circle(this.pos.x, this.pos.y, 5);
    beginShape();
    for (let i = 0; i < this.history.length; i++) {
      this.pos = this.history[i];
      // circle(tpos.x, tpos.y, i);
      vertex(this.pos.x, this.pos.y);
    }
    endShape();

    this.checkedges();
  }

  checkedges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    }
  }
}
