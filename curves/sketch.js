// Processing code by Etienne Jacob
// motion blur template by beesandbombs
// opensimplexnoise code (by Kurt Spencer) in another tab is necessary
// --> code here : https://gist.github.com/Bleuje/fce86ef35b66c4a2b6a469b27163591e
// See the license information at the end of this file.
// View the rendered result at: https://bleuje.com/gifanimationsite/single/sunconnections/

let result = [];
let t, c;

let noise;

let samplesPerFrame = 3;
let numFFrames = 93;
let shutterAngle = 0.6;

let recording = false;

// OpenSimplexNoise noise;

// note: good parameters have been lost

let n = 75; // number of white dots
let numberOfDotsOnCurve = 40; // connection drawing quality
let noiseLoopRadius = 0.2; // noise circle radius
let globalDelayFactor = 4.2; // delay effect parameter
let swmax = 1.7; // maximum stroke weight
let D = 150; // global displacement intensity factor

let arrays = [];
// Dot[] array = new Dot[n];

function setup() {
  let canvas = createCanvas(500, 500, P2D);
  // let canvas = createCanvas(500, 500);
  canvas.id("sketch-container");

  bgcolor = color(255);
  // background(bgcolor);
  // button = createButton("Change BG color");
  // button.mousePressed(changeBG);

  // size(500,500,P3D);

  /* let yoff = start;

  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    terr[y] = []; // Initialize inner array
    for (let x = 0; x < cols; x++) {
      terr[y][x] = map(noise(xoff, yoff), 0, 1, -100, 100);
      // terr[y][x] = random(-10, 10);
      xoff += inc;
    }
    yoff += inc;
  }    */

  // result = new int[width * height][3]();

  randomSeed(456);

  noise = new OpenSimplexNoise(Date.now());

  for (let i = 0; i < n; i++) {
    arrays[i] = new Dot();
  }

  smooth(8);
}

function draw() {
  // translate(-width / 2, -height / 2);

  if (!recording) {
    t = (mouseX * 1.0) / width;
    c = (mouseY * 1.0) / height;
    if (mouseIsPressed) println(c);
    draw_();
  } else {
    for (let i = 0; i < width * height; i++)
      for (let a = 0; a < 3; a++) result[i][a] = 0;

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

      for (let i = 0; i < pixels.length; i++) {
        result[i][0] += (pixels[i] >> 16) & 0xff;
        result[i][1] += (pixels[i] >> 8) & 0xff;
        result[i][2] += pixels[i] & 0xff;
      }
    }

    loadPixels();
    for (let i = 0; i < pixels.length; i++)
      pixels[i] =
        (0xff << 24) |
        (let((result[i][0] * 1.0) / samplesPerFrame) << 16) |
        (let((result[i][1] * 1.0) / samplesPerFrame) << 8) |
        let((result[i][2] * 1.0) / samplesPerFrame);
    updatePixels();

    saveFrame("fr###.gif");
    println(frameCount, "/", numFrames);
    if (frameCount == numFrames) stop();
  }
}

//////////////////////////////////////////////////////////////////////////////

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
        // (at q=0 we're on dot i, at q=1 we're on dot j)

        // main trick here: interpolation between the positions of dots i and j,
        // but seeing them with more delay when further from them
        let v1 = new p5.Vector(
          arrays[i].x(t - delayFactor * q),
          arrays[i].y(t - delayFactor * q)
        ); // when q=0 it gives v1 = (array[i].x(t), array[i].y(t))
        let v2 = new p5.Vector(
          arrays[j].x(t - delayFactor * (1 - q)),
          arrays[j].y(t - delayFactor * (1 - q))
        ); // when q=1 it gives v2 = (array[j].x(t), array[j].y(t))

        let interpolatedPosistion = v1.lerp(v2, q);

        point(interpolatedPosistion.x, interpolatedPosistion.y);
      }
    }
  }

  pop();
}

class Dot {
  constructor() {
    // polar coordinates
    this.r = pow(random(1), 0.2) * 0.3 * width; // radius random distribution to have less dots near the center
    this.theta = random(TWO_PI);

    // position without displacement
    this.x0 = this.r * cos(this.theta);
    this.y0 = this.r * sin(this.theta);

    this.displacementFactor = map(
      dist(this.x0, this.y0, 0, 0),
      0,
      0.3 * width,
      3.4,
      0
    );
    // this.displacementFactor = 0;
    // (more movement for the dots nearer the center)

    this.seed = random(10, 1000);
  }

  x(p) {
    return (
      this.x0 +
      this.displacementFactor *
        D *
        noise.noise2D(
          this.seed + noiseLoopRadius * cos(TWO_PI * this.p),
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
          2 * this.seed + noiseLoopRadius * cos(TWO_PI * this.p),
          noiseLoopRadius * sin(TWO_PI * this.p)
        )
    );
  }

  show(p) {
    stroke(255);
    fill(255);

    ellipse(this.x(p), this.y(p), 3, 3);
  }
}

/* License:
 *
 * Copyright (c) 2018, 2023 Etienne Jacob
 *
 * All rights reserved.
 *
 * This code after the template and the related animations are the property of the
 * copyright holder. Any reproduction, distribution, or use of this material,
 * in whole or in part, without the express written permission of the copyright
 * holder is strictly prohibited.
 */
