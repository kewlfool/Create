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

function connectDots() {
  // draw connections
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      let distanceToCenter = dist(
        arrays[i].x(t),
        arrays[i].y(t),
        arrays[j].x(t),
        arrays[j].y(t)
      );

      let sw = constrain(
        map(distanceToCenter, 0, 0.45 * width, swmax, 0),
        0,
        swmax
      );
      strokeWeight(sw);
      stroke(255, 50); // curve drawn with small transparent dots

      let delayFactor = (distanceToCenter * globalDelayFactor) / width; // strength of the delay effect explained later

      for (let k = 0; k <= numberOfDotsOnCurve; k++) {
        let q = map(k, 0, numberOfDotsOnCurve, 0, 1); // parameter in [0,1], indicates where we are on the connection curve
        // let q = 0.5; // parameter in [0,1], indicates where we are on the connection curve

        // main trick here: interpolation between the positions of dots i and j,
        // but seeing them with more delay when further from them
        let v1 = createVector(
          arrays[i].x(t - delayFactor * q),
          arrays[i].y(t - delayFactor * q)
        ); // when q=0 it gives v1 = (arrays[i].x(t), arrays[i].y(t))
        let v2 = createVector(
          arrays[j].x(t - delayFactor * (1 - q)),
          arrays[j].y(t - delayFactor * (1 - q))
        ); // when q=1 it gives v2 = (arrays[j].x(t), arrays[j].y(t))

        let interpolatedPosition = p5.Vector.lerp(v1, v2, q);
        point(interpolatedPosition.x, interpolatedPosition.y);
      }
    }
  }
}
