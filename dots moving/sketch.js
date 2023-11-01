let result;
let t, c;
let samplesPerFrame = 3;
let numFFrames = 93;
let shutterAngle = 0.6;
let recording = false;

let noise;

let n = 25; // number of white dots
let numberOfDotsOnCurve = 100; // connection drawing quality
let noiseLoopRadius = 0.2; // noise circle radius
let globalDelayFactor = 4.2; // delay effect parameter
let swmax = 1.7; // maximum stroke weight
let D = 150; // global displacement intensity factor

let arrays = [];

function setup() {
  createCanvas(500, 500);
  result = new Array(width * height).fill([0, 0, 0]);

  // noise = new p5.Noise("openSimplex"); // Using the p5.js built-in noise function
  noise = new OpenSimplexNoise(Date.now());

  for (let i = 0; i < n; i++) {
    arrays.push(new Dot());
  }

  smooth(8);
}

function draw() {
  if (!recording) {
    t = (mouseX * 1.0) / width;
    c = (mouseY * 1.0) / height;
    if (mouseIsPressed) {
      console.log(c);
    }
    draw_();
  } else {
    for (let i = 0; i < width * height; i++) {
      result[i] = [0, 0, 0];
    }

    c = 0;
    for (let sa = 0; sa < samplesPerFrame; sa++) {
      t = map(
        frameCount - 1 + (sa * shutterAngle) / samplesPerFrame,
        0,
        numFFrames,
        0,
        1
      );
      draw_();
      loadPixels();
      for (let i = 0; i < pixels.length; i++) {
        result[i][0] += (pixels[i] >> 16) & 0xff;
        result[i][1] += (pixels[i] >> 8) & 0xff;
        result[i][2] += pixels[i] & 0xff;
      }
    }

    /*
      for (let x = 0; x < width; x++) {
        xoff += inc;
        let yoff = 0;
        for (let y = 0; y < height; y++) {
          yoff += inc;
    
          // c = random(255);
          // c = noise(xoff, yoff, zoff) * 255;
          let n = noises.noise3D(xoff, yoff, zoff);
          c = n > 0 ? 255 : 0;
    
          var index = (x + y * width) * 4;
          pixels[index + 0] = c;
          pixels[index + 1] = c;
          pixels[index + 2] = c;
          pixels[index + 3] = 255;
        }
      }    */

    loadPixels();
    for (let i = 0; i < pixels.length; i++) {
      pixels[i] =
        (0xff << 24) |
        (int((result[i][0] * 1.0) / samplesPerFrame) << 16) |
        (int((result[i][1] * 1.0) / samplesPerFrame) << 8) |
        int((result[i][2] * 1.0) / samplesPerFrame);
    }
    updatePixels();

    saveFrame("fr###.png");
    console.log(frameCount + " / " + numFFrames);
    if (frameCount == numFFrames) {
      noLoop();
    }
  }
}

function draw_() {
  background(0);

  push();
  translate(width / 2, height / 2);

  // draw white dots
  for (let i = 0; i < n; i++) {
    arrays[i].show(t);
  }

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

  pop();
}

class Dot {
  // polar coordinates
  constructor() {
    this.r = pow(random(1), 0.2) * 0.3 * width; // radius random distribution to have less dots near the center
    this.theta = random(TWO_PI);
    this.x0 = this.r * cos(this.theta);
    this.y0 = this.r * sin(this.theta);
    this.displacementFactor = map(
      dist(this.x0, this.y0, 0, 0),
      0,
      0.3 * width,
      3.4,
      0
    );
    this.seed = random(10, 1000);
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
