class Particle {
  constructor() {
    this.pos = createVector(0, 0);
    this.angle = random(TWO_PI);
    this.r = random(10, 300);
    this.r1 = 0;

    this.size = random(5, 25);

    // this.pos = createVector(x, y);

    // this.pos.x = x;
    // this.pos.y = y;
    // this.vel = p5.Vector.random2D();
    // this.acc = createVector(0, 0);
    // this.maxspeed = 5;
  }

  update() {
    // this.vel.add(this.acc);
    // this.vel.limit(this.maxspeed);
    // this.pos.add(this.vel);

    // this.acc.mult(0);
    // this.edges();
    // let m = random(-5, +5);
    // this.r1 = this.r + random(-5, +5);
    this.r1 = this.r + map(mouseX, 0, width, -125, +125);

    this.pos.x = this.r1 * cos(this.angle);
    this.pos.y = this.r1 * sin(this.angle);
    this.angle += 0.01;
  }

  show() {
    strokeWeight(1);
    stroke(252, 0, 0);
    fill(252, 238, 33);
    circle(this.pos.x, this.pos.y, this.size);
  }

  // edges() {
  //   if (this.pos.x > width) {
  //     this.pos.x = 0;
  //   }
  //   if (this.pos.x < 0) {
  //     this.pos.x = width;
  //   }
  //   if (this.pos.y > height) {
  //     this.pos.y = 0;
  //   }
  //   if (this.pos.y < 0) {
  //     this.pos.y = height;
  //   }
  // }
}
