let dots = [];
let angle = 0;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("sketch-container");
  bgcolor = color(0);
  background(bgcolor);

  for (var i = 0; i < 150; i++) {
    dots[i] = new Particle();
  }
}

function draw() {
  // background(bgcolor);

  translate(windowWidth / 2, windowHeight / 2);

  var fader =
    1 - (Math.abs(mouseX - windowWidth / 2) / (windowWidth / 2)) * 0.5;

  for (let i = 0; i < dots.length; i++) {
    dots[i].update(fader);
    dots[i].show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
