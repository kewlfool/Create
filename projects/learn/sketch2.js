// By Manbir

/////////////////
/////////////////

let w, h;

// Its a dilemna, what to choose here.
// Define rows and columns and calculate size of tile based on that.
// Or define size first and then calcula rows and columns.
// Lets do both.

let cols = 10;
let rows = 10;

let grid = []; // Array of Vectors at cols and rows
let sclX = 40; // Size of the Tiles.
let sclY = 40; // Size of the Tiles.
let bdr = 100; // Keep border value more than scale in order to work
let mrg = 3;

let xoff = 0;
let counter = 0.5;
const totalFrames = 10;
let nR = 2;

//////////////
//////////////

let bobs = [];
let n = 10;

//////////////
//////////////

function setup() {
  w = windowWidth * 1;
  h = windowHeight * 1;

  createCanvas(w, h);
  cols = floor(w / sclX);
  rows = floor(h / sclY);
  // scl = min(w, h) / cols;
  noiseS = new OpenSimplexNoise(Date.now());

  // rectMode(CENTER);
  // ellipseMode(CENTER);

  initGrid();

  // setupPattern();
}

function draw() {
  // blendMode(MULTIPLY);

  let percent = float(counter % totalFrames) / totalFrames;
  draw_(percent);
}

function draw_(percent) {
  // frameRate(10);
  background(222);

  // for (let x = 0; x < cols; x++) {
  //   for (let y = 0; y < rows; y++) {
  //     grid[x][y].calcNextState();
  //   }
  // }

  // console.log(grid);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();

      grid[i][j].update();
    }
  }

  // console.log(bobs.length);

  // noLoop();
  // drawLine();
  // drawBlob();
}

function initGrid() {
  for (let i = 0; i < cols; i++) {
    grid[i] = []; // Create an empty array for each column
    for (let j = 0; j < rows; j++) {
      let y = j * (sclY + mrg);
      let x = i * (sclX + mrg);

      // let x = bdr + (i * (w - 2 * bdr)) / cols;
      // let y = bdr + (j * (h - 2 * bdr)) / rows;
      grid[i][j] = new Cell(x, y);
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let above = j - 1;
      let below = j + 1;
      let left = i - 1;
      let right = i + 1;

      if (above < 0) {
        above = rows - 1;
      }
      if (below == rows) {
        below = 0;
      }
      if (left < 0) {
        left = cols - 1;
      }
      if (right == cols) {
        right = 0;
      }

      grid[i][j].addNeighbor(grid[left][above]);
      grid[i][j].addNeighbor(grid[left][j]);
      grid[i][j].addNeighbor(grid[left][below]);
      grid[i][j].addNeighbor(grid[i][below]);
      grid[i][j].addNeighbor(grid[right][below]);
      grid[i][j].addNeighbor(grid[right][j]);
      grid[i][j].addNeighbor(grid[right][above]);
      grid[i][j].addNeighbor(grid[i][above]);
    }
  }
}

function mousePressed() {
  initGrid();
}

function mouseDragged() {
  // let r = random(10, 50);
  let w = new Cell(mouseX, mouseY, random(10, 50));
  bobs.push(w);
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
  xoff += 0.007;
  counter += 0.001;
  pop();
}

function drawLine() {
  push();
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
  xoff += 0.007;
  counter += 0.001;

  pop();
}
