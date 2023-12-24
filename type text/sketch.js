let font;
let noiseScale = 0.005;
let dots = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  let points = font.textToPoints("hey yooo!!", 100, windowHeight / 2, 50, {
    sampleFactor: 0.99,
  });

  for (var i = 0; i < points.length; i++) {
    let pt = points[i];
    let dot = new Dot(pt.x, pt.y);
    dots.push(dot);
  }
}

function draw() {
  background(13);

  for (let i = 0; i < dots.length; i++) {
    let dot = dots[i];
    // dot.behavior();
    dot.update();
    dot.show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function preload() {
  font = loadFont("AvenirNextLTPro-Demi.otf");
}
