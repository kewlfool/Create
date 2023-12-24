let dots = [];
let noise = 0;

let points = [];
// let angle = 0;
let count = 20;
let numberOfDotsOnCurve = 200; // connection drawing quality
let noiseLoopRadius = 0.5; // noise circle radius
let globalDelayFactor = 50; // delay effect parameter
let swmax = 2.2; // maximum stroke weight
let D = 100; // global displacement intensity factor

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("sketch-container");
  bgcolor = color(0);
  background(bgcolor);
  noise = new OpenSimplexNoise(Date.now());

  for (var i = 0; i < count; i++) {
    dots[i] = new Dot();
  }

  // for (var i = 0; i < count; i++) {
  //     dots.push(new Dot(i));
  //   }
}

function draw() {
  background(bgcolor);

  // t = (mouseX * 1.0) / width;
  t = (1 * (frameCount - 1)) / width;
  c = (mouseY * 1.0) / height;

  // rotateAll();

  for (let i = 0; i < dots.length; i++) {
    dots[i].show();
    dots[i].displace(t);
  }

  connect();

  // noLoop();
}

function rotateAll() {
  // rotate everything forever with framecoiunt variable

  translate(windowWidth / 2, windowHeight / 2);
  rotate(frameCount * 0.01);
  translate(-windowWidth / 2, -windowHeight / 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
