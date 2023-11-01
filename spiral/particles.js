class Particle {
  constructor() {
    this.pos = createVector(0, 0);
    this.posR = createVector(
      Math.floor(Math.random() * height + (width - height) / 2),
      Math.floor(Math.random() * height)
    );

    this.r1 = random(30, 300);
    this.r = 250;
    this.angle = random(TWO_PI);

    this.pos.x = this.r1 * cos(this.angle);
    this.pos.y = this.r1 * sin(this.angle);

    this.size = random(5, 20);

    // this.pos = createVector(x, y);
  }

  update() {
    // this.r1 = this.r + random(-5, +5);
    // this.r1 = this.r + map(mouseX, 0, width, 0, 125);
    // var fader =
    //   1 - (Math.abs(mouseX - windowWidth / 2) / (windowWidth / 2)) * 0.5;
    // this.pos.x = lerp(this.posR.x, this.pos.x, fader);
    // this.pos.y = lerp(this.posR.y, this.pos.y, fader);
    // this.pos.x = this.r1 * cos(this.angle);
    // this.pos.y = this.r1 * sin(this.angle);
    // this.angle += 0.01;
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
