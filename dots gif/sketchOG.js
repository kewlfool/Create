let result;
let t, c;
let samplesPerFrame = 3;
let numFFrames = 93;
let shutterAngle = 0.6;
let recording = false;

let noise;

let n = 30; // number of white dots
let numberOfDotsOnCurve = 50; // connection drawing quality
let noiseLoopRadius = 0.5; // noise circle radius
let globalDelayFactor = 2; // delay effect parameter
let swmax = 2.2; // maximum stroke weight
let D = 100; // global displacement intensity factor

let arrays = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
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

    // console.log(t);
    // console.log(c);

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
  connectDots();

  pop();

  // noLoop();
}
