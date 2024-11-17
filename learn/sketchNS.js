// By Manbir

/////////////////
/////////////////

let w, h;
let cols = 8;
let rows = 8;

let grid = []; // Array of Vectors at cols and rows
let scl = 30; // Size of the Tiles.
let bdr = 50; // Keep border value more than scale in order to work
let mrg = 1;
let startSteps = 5;

let v;

function setup() {
  w = windowWidth * 1;
  h = windowHeight * 1;
  startSize = scl;
  // cols = w / 60;
  // rows = h / 60;

  createCanvas(w, h);
  // noise = new OpenSimplexNoise(Date.now());
  // rectMode(CENTER);
}

function draw() {
  background(13);
  // noLoop();
  // console.log(grid.length);
  noFill();
  strokeWeight(2);
  stroke(222, 0, 0);

  push();
  translate(w / 2, h / 2);
  v = createVector(0, 0);

  // let xoff = random(100);
  let r = 90;
  let xoff = 100;
  beginShape();
  for (let a = 0; a <= TWO_PI; a += 0.01) {
    xoff += 0.06;
    // r += 0.05;
    // r = r + noise(xoff);
    // v.x = r * cos(a);
    // v.y = r * sin(a);
    let newR = r + 100 * noise(xoff);
    v.x = newR * cos(a);
    v.y = newR * sin(a);
    vertex(v.x, v.y);
    // point(v.x, v.y);
  }
  endShape();

  pop();
}
