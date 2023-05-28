class Mover {
  constructor(x = width / 2, y = height / 2, m = 1) {
    this.mass = m;
    this.radius = m * 8;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {
    stroke(255, 0, 0);
    strokeWeight(2);
    fill(255, 0, 0);
    ellipse(this.position.x, this.position.y, this.radius * 2);
  }

  checkEdges() {

    // var buffer = r / 2;
    // if (x > width + buffer) x = -buffer;
    // else if (x < -buffer) x = width + buffer;
    // if (y > height + buffer) y = -buffer;
    // else if (y < -buffer) y = height + buffer;





    if (this.position.x > width + this.radius) {
      this.position.x = -this.radius;
      // this.velocity.x *= -1;
    } else if (this.position.x < -this.radius) {
      this.position.x = width + this.radius;
      // this.velocity.x *= -1;
    }
    if (this.position.y > height + this.radius) {
      this.position.y = -this.radius;
      // this.velocity.y *= -1;
    } else if (this.position.y < -this.radius) {
      this.position.y = height + this.radius;
      // this.velocity.y *= -1;
    }
  }

}