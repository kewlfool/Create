var bgcolor;
var button;

let inc = 0.1;

let start = 0;

let zoff = 0;
// let zinc = 0.2;

var cols, rows;
let scl = 20;

var terr = [];

var fr;

var particles = [];
var flowfield;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  // let canvas = createCanvas(500, 500);
  canvas.id("sketch-container");

  bgcolor = color(255);
  // background(bgcolor);

  button = createButton("Change BG color");
  button.mousePressed(changeBG);

  // // bgcolor = color(255);
  // // background(bgcolor);

  // button = createButton("Change BG color");
  // // button.class("content");
  // button.mousePressed(changeBG);

  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP("");

  // flowfield = new Array(cols * rows);

  // for (var i = 0; i < 5000; i++) {
  //   particles[i] = new Particle();
  // }
}

function draw() {
  start -= 0.06;

  let yoff = start;

  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    terr[y] = []; // Initialize inner array
    for (let x = 0; x < cols; x++) {
      terr[y][x] = map(noise(xoff, yoff), 0, 1, -100, 100);
      // terr[y][x] = random(-10, 10);
      xoff += inc;
    }
    yoff += inc;
  }

  background(50);
  noFill();
  stroke(255);
  strokeWeight(1);
  // frameRate(5);

  rotateX(PI / 3);
  translate(-width / 2, -height / 2);

  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terr[y][x]);
      vertex(x * scl, (y + 1) * scl, terr[y + 1][x]);

      // point(x * scl, y * scl);

      // for (var i = 0; i < particles.length; i++) {
      //   particles[i].follow(flowfield);
      //   particles[i].update();
      //   particles[i].edges();
      //   particles[i].show();
      // }
      fr.html(floor(frameRate()));
    }
    endShape();
  }

  // noLoop();
}

function changeBG() {
  bgcolor = color(random(20, 255), random(20, 255), random(20, 255), 80);
}
