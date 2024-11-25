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
  // rectMode(CENTER);
  // initGrid();
}

function draw() {
  let percent = float(counter % totalFrames) / totalFrames;
  draw_(percent);
}

function draw_(percent) {
  // background(222);

  noFill();
  strokeWeight(1);
  stroke(random(255), random(255), random(255), 80);
  stroke(222, 0, 0, 80);

  drawLine();
  push();
  fill(0, 20);
  noStroke();
  rect(0, 0, w, h);
  pop();

  xoff += 0.01;
  counter += 0.01;
}

function drawLine() {
  // translate(w / 2, h / 2);
  let v = createVector(0, 0);
  beginShape();

  let yoff = 0;
  for (let x = 0; x <= w; x += 3) {
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
