/////////////////

let capturer = new CCapture({
  format: "png",
  name: "open_simplex_noise_loop",
});

const totalFrames = 5;
let counter = 0.5;
const record = 0;
let canvas; // the canvas variable is needed for the capturer

/////////////////
let w, h;
let cols = 10;
let rows = 10;
let scl = 50; // Size of the Tiles.
let bdr = 90; // Keep border value more than scale in order to work
let mrg = 20;

let grid = []; // Array of Vectors at cols and rows

let startSteps = 5;

let dotCount = 20;

let noiseS;
let start = 0;
let radius = 0.2;

let inc = 0.031;
let xoff = 0;
let zoff = 0;
let zinc = 0.05;
let nR = 2;

// let phase = 0;
let bobs = [];
let n = 10;

function setup() {
  w = windowWidth * 1;
  h = windowHeight * 0.9;
  canvas = createCanvas(w, h).canvas;
  pixelDensity(1);
  noiseS = new OpenSimplexNoise(Date.now());
  if (record) capturer.start();

  slider = createSlider(0, 10, 0.6, 0.1);
}

function draw() {
  /////////////////////////
  let percent = float(counter % totalFrames) / totalFrames;
  draw_(percent);
  if (record && counter < totalFrames - 1) {
    // note that canvas animations don't run in the background
    // you will have to keep the window open to record

    capturer.capture(canvas);
  } else if (record) {
    capturer.stop();
    capturer.save();
    // console.log(frameRate);
    // this will download a tar archive with the pngs inside
    // extract with 7zip or a similar tool
    // then use ffmpeg to convert into a gif or video
    noLoop();
  }

  // console.log(float(counter % totalFrames));
  // let angle = map(percent, 0, 1, 0, TWO_PI);
  // console.log(angle);
  // console.log(percent);
  // console.log(counter / totalFrames);
  // console.log(cos((TWO_PI * 1.0 * (frameCount - 1)) / numFrames));
  // counter++;
}

function draw_(percent) {
  other();
}

function other() {
  background(13);
  noFill();
  strokeWeight(1);
  stroke(222);
  let yoff = 0;

  let noiseMax = slider.value();
  // push();
  // translate(width / 2, height / 2);
  // beginShape();
  // for (let a = 0; a < TWO_PI; a += radians(5)) {
  //   // Use circle-based noise mapping for xoff and yoff
  //   xoff = map(cos(a), -1, 1, 0, noiseMax);
  //   yoff = map(sin(a), -1, 1, 0, noiseMax);

  //   let r = map(noise(xoff, yoff, zoff), 0, 1, 100, height / 2);
  //   // let y = map(noiseS.noise3D(xoff, yoff, zoff), -1, 1, 0, h);
  //   let x = r * cos(a);
  //   let y = r * sin(a);

  //   vertex(x, y);
  // }
  // endShape();
  // pop();

  beginShape();

  for (let x = 0; x < w; x += 2) {
    // Map x to angle `a` for circular noise mapping
    let a = map(x, 0, width, 0, TWO_PI);

    // Use circle-based noise mapping for xoff and yoff
    xoff = map(cos(a + counter), -1, 1, 0, noiseMax);
    yoff = map(sin(a + counter), -1, 1, 0, noiseMax);

    // // Sharpen the falloff (Gaussian-like curve)
    // let baseR = noise(xoff, yoff, zoff);
    // let distanceFromCenter = abs(x - width / 2) / (width / 2); // 0 at center, 1 at edges
    // let amplification = exp(-pow(distanceFromCenter * 4, 2)); // Exponential falloff
    // let r = map(baseR * amplification, 0, 1, height / 2, 0);

    //OG method of calculation
    let amplification = transition(x);
    let r = -amplification * map(noise(xoff, yoff, zoff), 0, 1, height / 2, 0);

    let y = 200 + r;

    vertex(x, y);
  }
  endShape();

  zoff += 0.002124;
  counter -= 0.017;
  // noLoop();
}

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function transition(x) {
  var t1 = Math.abs(x - width / 2) / (width / 2); // 0 at center, 1 at edges
  // var t = 0.1 + pow(2.2 * t1, 5);
  var t = 1 / (0.1 + pow(2.2 * t1, 5));
  // let t =exp(-pow(t1 * 2.2, 5)); // Exponential falloff
  // console.log(t);
  return sigmoid(t - 3);
  // return t;
}

function simpleNoise() {
  let uoff, voff;
  // Only doing calculations if recording to save on computation
  if (record) {
    // let angle = map(percent, 0, 1, 0, TWO_PI);
    // uoff = radius * map(sin(angle), -1, 1, 0, 1);
    // voff = radius * map(sin(angle), -1, 1, 0, 1);
    uoff = radius * cos((TWO_PI * counter) / totalFrames);
    voff = radius * sin((TWO_PI * counter) / totalFrames);
  }

  // let xoff = start;
  let xoff = 0;
  loadPixels();
  push();
  for (let i = bdr; i < width - bdr; i += scl) {
    let yoff = 0;
    for (let j = bdr; j < height - bdr; j += scl) {
      let x = i;
      let y = j;

      let n;
      if (record) {
        // 4D Open Simplex Noise is very slow!
        n = noise.noise4D(xoff, yoff, uoff, voff);
      } else {
        // If you aren't worried about looping run this instead for speed!
        n = noise.noise3D(xoff, yoff, zoff);
      }

      let c = n > 0 ? 222 : 13;
      var index = (x + y * width) * 4;
      pixels[index + 0] = c;
      pixels[index + 1] = c;
      pixels[index + 2] = c;
      pixels[index + 3] = 255;

      yoff += inc;
    }
    xoff += inc;
  }
  zoff += zinc;
  // start += 0.1;
  pop();
  updatePixels();
}

function initGrid() {
  background(13);
  strokeWeight(2);
  noFill();

  // stroke(255, 0, 0);

  for (let i = 0; i < cols + 1; i++) {
    grid[i] = []; // Create an empty array for each column
    for (let j = 0; j < rows + 1; j++) {
      let x = bdr + i * (scl + mrg);
      let y = bdr + j * (scl + mrg);

      // Create a vector and assign it to the grid element
      grid[i][j] = createVector(x, y);
      // tile(x, y);
      // line(x, y, scl, scl, 2);
      // rect(x, y, scl, scl);
      // boxs(x, y, scl);
      // spiral(x, y);
      push();
      stroke(222, 0, 0);
      rect(x, y, scl, scl);
      // stroke(0, 0, 255);
      stroke(0, 0, 222);
      strokeWeight(5);
      point(x, y);
      pop();
    }
    // xoff += inc;
  }
}
