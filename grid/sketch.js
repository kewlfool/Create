// By Manbir

/////////////////
/////////////////

let w, h;
let cols = 10;
let rows = 10;

let grid = []; // Array of Vectors at cols and rows
let scl = 50; // Size of the Tiles.
let bdr = 90; // Keep border value more than scale in order to work
let mrg = 20;
let startSteps = 5;

let bobs = [];
let n = 10;

let xoff = 0;
let counter = 0.5;
let nR = 2;
const totalFrames = 10;

function setup() {
  w = windowWidth * 1;
  h = windowHeight * 1;
  createCanvas(w, h);
  // startSize = scl;
  cols = floor((w - 2 * bdr) / (scl + mrg));
  rows = floor((h - 2 * bdr) / (scl + mrg));

  for (let i = 0; i < n; i++) {
    bobs.push(new Circle());
  }
  noiseS = new OpenSimplexNoise(Date.now());
  rectMode(CENTER);
  initGrid();
}

// function draw() {
//   let percent = float(counter % totalFrames) / totalFrames;
//   draw_(percent);
// }

function draw_(percent) {
  // background(222);

  noFill();
  strokeWeight(1);
  // stroke(random(255), random(255), random(255),80);
  stroke(222, 0, 0, 80);

  // for (let i = bobs.length - 1; i >= 0; i--) {
  //   bobs[i].show();
  //   bobs[i].update();

  //   // Check a condition for removal, for example, if it's beyond the canvas width
  //   if (bobs[i].pos.x > width || bobs[i].pos.y < 0) {
  //     bobs.splice(i, 1);
  //   }
  // }
  drawBlob();
  // drawLine();
  push();
  fill(0, 20);
  noStroke();
  rect(0, 0, w, h);
  pop();

  xoff += 0.007;
  counter += 0.001;
}

function drawBlob() {
  push();
  translate(w / 2, h / 2);
  let v = createVector(0, 0);

  beginShape();
  for (let a = 0; a <= TWO_PI; a += 0.01) {
    // r += 0.05;
    // r = r + noise(xoff);
    // v.x = r * cos(a);
    // v.y = r * sin(a);
    // n = noise.noise4D(xoff, yoff, uoff, voff);
    let uoff = map(cos(a + counter), -1, 1, 0, nR);
    let voff = map(sin(a + counter), -1, 1, 0, nR);
    let r = 1 * map(noiseS.noise3D(xoff, uoff, voff), -1, 1, 1, h / 2);
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
    // point(v.x, v.y);
    yoff += 0.01;
  }
  endShape();
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
