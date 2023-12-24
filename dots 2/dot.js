class Dot {
  constructor() {
    // this.r = pow(random(1), 0.2) * 0.3 * width; // radius random distribution to have less dots near the center
    this.r = random(1) * width * 0.5;
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
  }

  displace(p) {
    this.x0 =
      this.displacementFactor *
      D *
      noise.noise2D(
        this.seed + noiseLoopRadius * cos(TWO_PI * p),
        noiseLoopRadius * sin(TWO_PI * p)
      );

    this.y0 =
      this.displacementFactor *
      D *
      noise.noise2D(
        2 * this.seed + noiseLoopRadius * cos(TWO_PI * p),
        noiseLoopRadius * sin(TWO_PI * p)
      );
  }

  show() {
    push();
    translate(windowWidth / 2, windowHeight / 2);
    stroke(255);
    fill(255);
    ellipse(this.x0, this.y0, 3, 3);

    pop();
  }
}

function connect() {
  push();
  translate(width / 2, height / 2);
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < i; j++) {
      let distanceToCenter = dist(
        dots[i].x0,
        dots[i].y0,
        dots[j].x0,
        dots[j].y0
      );

      let sw = constrain(
        map(distanceToCenter, 0, 0.45 * width, swmax, 0),
        0,
        swmax
      );
      strokeWeight(sw);
      stroke(255, 50); // curve drawn with small transparent dots

      // strength of the delay effect explained later
      let delayFactor = (distanceToCenter * globalDelayFactor) / width;
      // let delayFactor = 6;

      for (let k = 0; k <= numberOfDotsOnCurve; k++) {
        // parameter in [0,1], indicates where we are on the connection curve
        let q = map(k, 0, numberOfDotsOnCurve, 0, 1);
        // let q = 0.5;

        // main trick here: interpolation between the positions of dots i and j,
        // but seeing them with more delay when further from them

        let v1 = createVector(
          dots[i].x0 * (1 - delayFactor * q),
          dots[i].y0 * (1 - delayFactor * q)
        ); // when q=0 it gives v1 = (dots[i].x(t), dots[i].y(t))
        let v2 = createVector(
          dots[j].x0 * (1 - delayFactor * (1 - q)),
          dots[j].y0 * (1 - delayFactor * (1 - q))
        ); // when q=1 it gives v2 = (dots[j].x(t), dots[j].y(t))

        let interpolatedPosition = p5.Vector.lerp(v1, v2, q);
        point(interpolatedPosition.x, interpolatedPosition.y);
      }
    }
  }

  pop();
}
