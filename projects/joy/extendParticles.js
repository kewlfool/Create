class Dot extends Particle {
  constructor(x, y) {
    super(x, y);

    // this.r = random(25, 38);
    this.r = 4;
    // this.phase = 0;

    // this.r0 = pow(random(1), 0.7) * 0.5 * h; // radius random distribution to have less dots near the center
    // this.angle = random(TWO_PI);
    // this.angle = 0;
    // this.x0 = this.r0 * cos(this.angle);
    // this.y0 = this.r0 * sin(this.angle);
    // this.seed = random(10, 1000);

    // this.tail = this.r * 1;
  }

  follow(vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  }
  show() {
    push();

    noFill();
    stroke(0, 160, 220);
    strokeWeight(1);
    // rect(this.pos.x, this.pos.y, scl * mrg, scl * mrg);
    strokeWeight(this.r);
    point(this.pos.x, this.pos.y);

    pop();
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

  eggs() {
    let noiseMax = 3.2;
    beginShape();
    push();
    // noFill();
    fill(255);
    translate(this.pos.x, this.pos.y);
    for (let a = 0; a < TWO_PI; a += 0.03) {
      // let xoff = noiseMax * cos(a + phase);
      // let yoff = noiseMax * sin(a + phase);
      let xoff = map(cos(a + this.phase), -1, 1, 0, noiseMax);
      let yoff = map(sin(a + this.phase), -1, 1, 0, noiseMax);
      // let r = 100;
      let rr = map(
        noise.noise3D(xoff + this.seed, yoff + this.seed, zoff),
        0,
        1,
        110,
        160
      );
      this.x0 = rr * cos(a);
      this.y0 = rr * sin(a);
      vertex(this.x0, this.y0);
      endShape();
    }
    pop();
    // phase += 0.01;
    zoff += 0.001;
  }
}
