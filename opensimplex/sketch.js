var bgcolor;
var button;

let inc = 0.1;

let start = 0;

let zoff = 0;
let zinc = 0.2;

var cols, rows;
let scl = 20;

let c = 0;

var terr = [];

var fr;

let noises;

var particles = [];
var flowfield;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  // let canvas = createCanvas(500, 500);
  canvas.id("sketch-container");

  noises = new OpenSimplexNoise(Date.now());

  bgcolor = color(255);
  // background(bgcolor);
  pixelDensity(1);

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
  // noFill();
  // stroke(255);
  // strokeWeight(1);
  // frameRate(5);

  // rotateX(PI / 3);
  // translate(-width / 2, -height / 2);

  background(50);

  loadPixels();
  start -= 0.5;

  // let xoff = start;
  let xoff = 0;

  for (let x = 0; x < width; x++) {
    xoff += inc;
    let yoff = 0;
    for (let y = 0; y < height; y++) {
      yoff += inc;

      // c = random(255);
      // c = noise(xoff, yoff, zoff) * 255;
      let n = noises.noise3D(xoff, yoff, zoff);
      c = n > 0 ? 255 : 0;

      var index = (x + y * width) * 4;
      pixels[index + 0] = c;
      pixels[index + 1] = c;
      pixels[index + 2] = c;
      pixels[index + 3] = 255;
    }
  }
  zoff += zinc;

  updatePixels();
}

function changeBG() {
  bgcolor = color(random(20, 255), random(20, 255), random(20, 255), 80);
}
