// random walker that follows mouse pointer
// in a random path, obiously

var bgcolor;
let rx, ry;
// var button;

let walker = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  // let canvas = createCanvas(500, 500);
  canvas.id("sketch-container");
  canvas.position(0, 0, "fixed");
  canvas.style("z-index", "-100");

  rx = random(windowWidth);
  ry = random(windowHeight);
  bgcolor = color(222, 222, 222);
  background(bgcolor);

  for (let i = 0; i < 10; i++) {
    walker.push(new Particle(random(windowWidth), random(windowHeight)));
  }

  // walker.push(new Particle());

  //   button = createButton("BG Color");
  // 	button.position(windowWidth/2-60, windowHeight-80, 'fixed');
  // 	button.style('z-index','10');
  //   button.mousePressed(changeBG);
}

function draw() {
  background(bgcolor);

  for (let i = 0; i < walker.length; i++) {
    walker[i].show();
    walker[i].update();
  }

  sugar();
  frameRate(17);
}

function sugar() {
  circle(rx, ry, 15);
}

function mousePressed() {
  rx = mouseX;
  ry = mouseY;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function changeBG() {
  background(random(30, 255), random(30, 255), random(30, 255), 80);
}
