var bgcolor;
var button;

let inc = 0.05;
let scl = 20;
let start = 0;

let zoff = 0;
let zinc = 0.002;

var cols, rows;
var fr;

var particles = [];
var flowfield;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
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

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 5000; i++) {
    particles[i] = new Particle();
  }
}

function changeBG() {
  bgcolor = color(random(20, 255), random(20, 255), random(20, 255), 80);
}

function draw() {
  // Create an alpha blended background
  // background(bgcolor);

  loadbg();

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  fr.html(floor(frameRate()));
}

function loadbg() {
  let yoff = start;

  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle);
      // v.setMag(1);

      flowfield[index] = v;
      xoff += inc;
      stroke(0, 40);
      // push();
      // strokeWeight(1);
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // line(0, 0, scl, 0);
      // pop();
    }

    yoff += inc;
  }
  // noLoop();
  zoff += zinc;
  // start += zinc;
}
