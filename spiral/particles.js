class Particle {
  constructor() {
    this.posC = createVector(0, 0);
    // this.posR = p5.Vector.random2D();

    this.posR = createVector(random(width), random(height));
    this.pos = this.posR.copy();
    // this.fader = fade;
    // this.posR = createVector(
    //   Math.floor(Math.random() * height + (width - height) / 2),
    //   Math.floor(Math.random() * height)
    // );

    // this.r1 = random(30, 300);
    this.r1 = 150;
    // this.r = 250;
    this.angle = random(TWO_PI);

    // this.posC.x = this.r1 * cos(this.angle);
    // this.posC.y = this.r1 * sin(this.angle);

    this.size = random(5, 20);

    // this.pos = createVector(x, y);
  }

  update(fade) {
    this.pos.x = lerp(this.posR.x, this.posC.x, fade);
    this.pos.y = lerp(this.posR.y, this.posC.y, fade);

    this.posC.x = this.r1 * cos(this.angle);
    this.posC.y = this.r1 * sin(this.angle);
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
