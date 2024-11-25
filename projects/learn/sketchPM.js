// By Manbir

/////////////////
/////////////////

let w, h;
let cols = 8;
let rows = 8;

let grid = []; // Array of Vectors at cols and rows
let scl = 500; // Size of the Tiles.
let bdr = 50; // Keep border value more than scale in order to work
let mrg = 1;
let step = 80;

/////////////////
/////////////////
let sqr = []; // Array
let sqr1;
let sqr2;
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
  initSq();

  // initGrid();
}

// function draw() {
//   background(222);
//   strokeWeight(5);
//   stroke(13);
//   noFill();
// }

function initSq() {
  sqr.push(createRect(0, 0, w, h));

  for (var i = 0; i < w; i += step) {
    splitSquaresWith({ y: i });
    splitSquaresWith({ x: i });
  }

  for (var i = 0; i < sqr.length; i++) {
    sqr[i].show();
  }
}
// Function to create a rectangle object
function createRect(x, y, w, h) {
  return {
    x: x,
    y: y,
    w: w,
    h: h,
    color: 1,
    show: function () {
      if (this.color) fill(random(colors));
      rect(this.x, this.y, this.w, this.h);
    },
  };
}

function splitSquaresWith(coordinates) {
  const { x, y } = coordinates;

  for (var i = sqr.length - 1; i >= 0; i--) {
    const square = sqr[i];

    if (x && x > square.x && x < square.x + square.w) {
      if (Math.random() > 0.5) {
        sqr.splice(i, 1);
        splitOnX(square, x);
      }
    }

    if (y && y > square.y && y < square.y + square.h) {
      if (Math.random() > 0.5) {
        sqr.splice(i, 1);
        splitOnY(square, y);
      }
    }
  }
}

function splitOnX(square, splitAt) {
  var squareA = createRect(
    square.x,
    square.y,
    square.w - (square.w - splitAt + square.x),
    square.h
  );

  var squareB = createRect(
    splitAt,
    square.y,
    square.w - splitAt + square.x,
    square.h
  );

  sqr.push(squareA);
  sqr.push(squareB);
}

function splitOnY(square, splitAt) {
  var squareA = createRect(
    square.x,
    square.y,
    square.w,
    square.h - (square.h - splitAt + square.y)
  );

  var squareB = createRect(
    square.x,
    splitAt,
    square.w,
    square.h - splitAt + square.y
  );

  sqr.push(squareA);
  sqr.push(squareB);
}
