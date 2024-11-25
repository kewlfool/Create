let font;
let dots = [];

const flock = [];

let alignSlider, cohesionSlider, separationSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);

  alignSlider = createSlider(0, 2, 1.5, 0.1);
  cohesionSlider = createSlider(0, 2, 1, 0.1);
  separationSlider = createSlider(0, 2, 2, 0.1);
  for (let i = 0; i < 200; i++) {
    flock.push(new Boid());
  }

  // let points = font.textToPoints("hey yooo!!", 100, windowHeight / 2, 50, {
  //   sampleFactor: 0.99,
  // });

  // for (var i = 0; i < points.length; i++) {
  //   let pt = points[i];
  //   let dot = new Dot(pt.x, pt.y);
  //   dots.push(dot);
  // }
}

function draw() {
  background(13);

  for (let boid of flock) {
    boid.edges();
    boid.flock(flock);
    boid.update();
    boid.show();
  }

  // for (let i = 0; i < dots.length; i++) {
  //   let dot = dots[i];
  //   dot.behavior();
  //   dot.update();
  //   dot.show();
  // }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function preload() {
  font = loadFont("AvenirNextLTPro-Demi.otf");
}
