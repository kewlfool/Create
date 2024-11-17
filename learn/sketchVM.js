// By Manbir

/////////////////
/////////////////

let w, h;
let cols = 8;
let rows = 8;

let grid = []; // Array of Vectors at cols and rows
let scl = 60; // Size of the Tiles.
let bdr = 50; // Keep border value more than scale in order to work
let mrg = 1;

/////////////////
/////////////////

/////////////////
/////////////////

function setup() {
  /////////////////
  /////////////////

  w = windowWidth * 1;
  h = windowHeight * 1;
  // cols = w / 60;
  // rows = h / 60;

  createCanvas(w, h);
  noise = new OpenSimplexNoise(Date.now());
  rectMode(CENTER);

  initGrid();
}

// function draw() {
//   // background(13);
//   // noLoop();
//   // console.log(grid.length);
//   lines(0, 0, w, h);
// }

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
      boxs(x, y);
      // spiral(x, y);
      // point(x, y);
    }
    // xoff += inc;
  }
}

function boxs(x, y) {
  let rand = floor(random(15, 30));
  // let rand = 3;
  // let count = c;
  push();
  translate(x, y);
  noFill();
  strokeWeight(1);
  for (let i = 0; i < rand; i++) {
    let sqSize = random(scl);
    let sqColor = random(colors);
    let sqFill = random(colors2);
    stroke(sqColor);
    strokeWeight(0.5);
    // fill(sqFill);
    rect(0, 0, sqSize, sqSize);
  }

  pop();
}

function lines(x, y, w, h, c) {
  let count = c;
  push();
  // blendMode(MULTIPLY);
  translate(x - scl / 2, y - scl / 2);
  let lw = abs(w / count);
  let lh = abs(h / count);
  strokeWeight(1);
  // let col = color("#fc913a");
  // stroke(col);
  stroke(222, 0, 0, 100);
  let points = [];
  for (let i = 0; i < count + 1; i++) {
    for (let j = 0; j < count + 1; j++) {
      let nx = i * lw;
      let ny = j * lh;
      points.push(createVector(nx, ny));
    }
  }

  points.forEach((point, index) => {
    let otherIndex = index;
    while (otherIndex === index) {
      otherIndex = int(random(points.length));
    }

    let otherPoint = points[otherIndex];
    line(point.x, point.y, otherPoint.x, otherPoint.y);
  });

  pop();
}

function spiral(x, y) {
  push();
  translate(x, y);
  stroke(0, 160, 220);
  // strokeWeight(1);
  // if (random(1) > 0.5) line(0, 0, scl, scl);
  // else line(scl, 0, 0, scl);
  strokeWeight(3);
  point(0, 0);
  noFill();
  // strokeWeight(1);
  let abox = random(TWO_PI);
  strokeWeight(1);
  // let rbox = scl * 0.7;
  beginShape();
  for (let a = 0; a < TWO_PI * 4; a += 1.5) {
    let rbox = map(noise.noise2D(x * mrg, y * mrg), -1, 1, 2, 100);
    let xbox = rbox * cos(a + abox);
    let ybox = rbox * sin(a + abox);
    vertex(xbox, ybox);
    rbox -= 3.2;
  }
  endShape();
  // rect(0, 0, scl * mrg, scl * mrg);
  pop();
}
