// By Manbir

/////////////////
/////////////////

let w, h;
let cols = 8;
let rows = 8;

let grid = []; // Array of Vectors at cols and rows
let scl = 300; // Size of the Tiles.
let bdr = 50; // Keep border value more than scale in order to work
let mrg = 1;
let startSteps = 5;
let startSize = 0;

function setup() {
  /////////////////
  /////////////////

  w = windowWidth * 1;
  h = windowHeight * 1;
  startSize = scl;
  // cols = w / 60;
  // rows = h / 60;

  createCanvas(w, h);
  noise = new OpenSimplexNoise(Date.now());
  // rectMode(CENTER);

  // initGrid();
}

function draw() {
  background(13);
  // noLoop();
  // console.log(grid.length);
  push();
  // translate(w / 2, h / 2);
  boxs(0, 0, scl, scl, startSteps);
  pop();
}

function boxs(x, y, scl, scl, steps) {
  stroke(222, 0, 0);
  noFill();
  strokeWeight(1);
  // let sqSize = scl - 10;
  rect(x, y, scl, scl);

  if (steps >= 0) {
    let nScl = scl * (steps / startSteps);
    let nX = x + (scl - nScl) / 2;
    let nY = y + (scl - nScl) / 2;
    boxs(nX, nY, nScl, nScl, steps - 1);
  }
}

function initGrid() {
  background(13);
  strokeWeight(5);
  stroke(222, 0, 0);

  for (let i = 0; i < cols + 1; i++) {
    grid[i] = []; // Create an empty array for each column
    for (let j = 0; j < rows + 1; j++) {
      let x = bdr + (i * (w - 2 * bdr)) / cols;
      let y = bdr + (j * (h - 2 * bdr)) / rows;

      // Create a vector and assign it to the grid element
      grid[i][j] = createVector(x, y);
      // tile(x, y);
      // lines(x, y, scl, scl, 2);
      // rect(x, y, scl, scl);
      boxs(x, y, scl);
      // spiral(x, y);
      // point(x, y);
    }
    // xoff += inc;
  }
}
