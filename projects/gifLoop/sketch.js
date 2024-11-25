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
let scl = 1; // Size of the Tiles.
let bdr = 20; // Keep border value more than scale in order to work
let mrg = 0;

let grid = []; // Array of Vectors at cols and rows

let startSteps = 5;

let dotCount = 20;

let noiseS;
let start = 0;
let radius = 0.2;

let inc = 0.025;
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

  // cols = floor((w - 2 * bdr) / (scl + mrg));
  // rows = floor((h - 2 * bdr) / (scl + mrg));
  // createCanvas(w, h);
  pixelDensity(1);
  // cols = floor(width / scl);
  // rows = floor(height / scl);

  noiseS = new OpenSimplexNoise(Date.now());
  // rectMode(CENTER);
  // initGrid();

  if (record) capturer.start();
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
  // background(13);

  // stroke(222);
  // worms();
  // other();
  simpleNoise();
}

function other() {
  noFill();
  strokeWeight(1);
  stroke(random(255), random(255), random(255), 80);
  stroke(222, 0, 0, 80);

  for (let i = bobs.length - 1; i >= 0; i--) {
    bobs[i].show();
    bobs[i].update();

    // Check a condition for removal, for example, if it's beyond the canvas width
    if (bobs[i].pos.x > width || bobs[i].pos.y < 0) {
      bobs.splice(i, 1);
    }
  }
  // drawBlob();
  drawLine();
  push();
  fill(0, 20);
  noStroke();
  rect(0, 0, w, h);
  pop();

  xoff += 0.01;
  // counter += 0.01;
}

function drawBlob() {
  push();
  translate(w / 2, h / 2);
  let v = createVector(0, 0);

  beginShape();
  for (let a = 0; a <= TWO_PI; a += 0.001) {
    // r = r + noise(xoff);
    // v.x = r * cos(a);
    // v.y = r * sin(a);
    // n = noise.noise4D(xoff, yoff, uoff, voff);
    let uoff = map(cos(a + counter), -1, 1, 0, nR);
    let voff = map(sin(a + counter), -1, 1, 0, nR);
    let r = 1 * map(noiseS.noise3D(xoff, uoff, voff), -1, 1, 1, h / 3);
    v.x = r * cos(a);
    v.y = r * sin(a);
    vertex(v.x, v.y);
    // point(v.x, v.y);
  }
  endShape();
  pop();
}
function drawLine() {
  // translate(w / 2, h / 2);
  let v = createVector(0, 0);
  beginShape();

  let yoff = 0;
  for (let x = 0; x <= w; x += 2) {
    let y = noise(xoff, yoff) * h;
    v.x = x;
    v.y = y;
    vertex(v.x, v.y);
    point(v.x, v.y);
    yoff += 0.01;
  }
  endShape();
}

function worms() {
  background(13);

  stroke(222);
  scl = 50;
  push();

  for (let i = bdr; i < width - bdr; i += scl) {
    let yoff = 0;
    for (let j = bdr; j < height - bdr; j += scl) {
      let x = i;
      let y = j;

      for (let k = 0; k < dotCount; k++) {
        let worm = noiseV(x, y);
        // worm.mult(0.1);
        x += worm.x;
        y += worm.y;

        stroke(255, 40);
        strokeWeight(1);
        point(x, y);
      }
      stroke(255, 0, 200);
      strokeWeight(3);
      point(x, y);
    }
    // yoff += inc;
    // xoff += inc;
    counter += 0.0008;
  }
  pop();
}

function noiseV(x, y) {
  let amount = 2;
  let scale = 0.1;
  let radius = 3;

  let xNoise = noiseS.noise4D(
    scale * x,
    scale * y,
    radius * cos((TWO_PI * 1.0 * counter) / totalFrames),
    radius * sin((TWO_PI * 1.0 * counter) / totalFrames)
  );
  let yNoise = noiseS.noise4D(
    1000 + scale * x,
    scale * y,
    radius * cos((TWO_PI * 1.0 * counter) / totalFrames),
    radius * sin((TWO_PI * 1.0 * counter) / totalFrames)
  );
  //int value2 = (int) Math.round(value);
  // let parameter1 = (int) Math.round(value1)/100.0;
  // let parameter2 = (int) Math.round(value2)/100.0;
  //if(random(100)<1) println(parameter);
  let worm = createVector(amount * xNoise, amount * yNoise);
  return worm;
}

function simpleNoise() {
  background(13);
  stroke(222);
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
        n = noiseS.noise4D(xoff, yoff, uoff, voff);
      } else {
        // If you aren't worried about looping run this instead for speed!
        n = noiseS.noise3D(xoff, yoff, zoff);
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

// function mousePressed() {
//   // let r = random(10, 50);
//   // let p = new Particle(mouseX, mouseY);
//   // planes.push(p);
//   resizeCanvas(windowWidth, windowHeight);
// }

function rotateAll() {
  // rotate everything forever with framecoiunt variable

  translate(windowWidth / 2, windowHeight / 2);
  rotate(frameCount * 0.01);
  translate(-windowWidth / 2, -windowHeight / 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
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
