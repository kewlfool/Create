class Dot {
  // polar coordinates
  constructor() {
    this.r = pow(random(1), 0.2) * 0.3 * width; // radius random distribution to have less dots near the center
    this.angle = random(TWO_PI);
    this.x0 = this.r * cos(this.angle);
    this.y0 = this.r * sin(this.angle);
    this.displacementFactor = map(
      dist(this.x0, this.y0, 0, 0),
      0,
      0.3 * width,
      3.5,
      0
    );
    this.seed = random(10, 1000);
    // this.seed = 0;
  }

  x(p) {
    return (
      this.x0 +
      this.displacementFactor *
        D *
        noise.noise2D(
          this.seed + noiseLoopRadius * cos(TWO_PI * p),
          noiseLoopRadius * sin(TWO_PI * p)
        )
    );
  }

  y(p) {
    return (
      this.y0 +
      this.displacementFactor *
        D *
        noise.noise2D(
          2 * this.seed + noiseLoopRadius * cos(TWO_PI * p),
          noiseLoopRadius * sin(TWO_PI * p)
        )
    );
  }

  show(p) {
    stroke(255);
    fill(255);
    ellipse(this.x(p), this.y(p), 3, 3);
  }
}
