let inc = 0.1;
let scl = 50;
let start = 0;

let zoff = 0;
let zinc = 0.006;

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

  cols = floor(width / scl);
  rows = floor(height / scl);
  // fr = createP("");

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 50; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  // Create an alpha blended background
  background(0);
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;

      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      console.log(v);
      // console.log(flowfield);

      v.setMag(1);
      flowfield[index] = v;

      flowfield[index] = v;
      stroke(0, 50);
      push();
      fill(25, 25, 25);
      strokeWeight(1);
      translate(x * scl, y * scl);
      // rotate(v.heading());
      circle(0, 0, 50);
      // console.log(flowfield);

      // line(0, 0, scl, 0);
      pop();
      xoff += inc;
    }
    yoff += inc;
    zoff += zinc;
  }
  // noLoop();

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  // fr.html(floor(frameRate()));
}
