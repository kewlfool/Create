let dots = [];
let points = [];
// let angle = 0;
let noise = 0;
let t = 0;
let count = 2;
let numberOfDotsOnCurve = 80; // connection drawing quality
let noiseLoopRadius = 0.51; // noise circle radius
let globalDelayFactor = 0.33; // delay effect parameter
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

  t = (mouseX * 1.0) / width;
  // t += 0.001;
  c = (mouseY * 1.0) / height;

  // console.log(t);

  // rotateAll();

  // Fader value ranges from 0 to 1 to 0 with mouseX
  // var fader = 1 - (abs(mouseX - windowWidth / 2) / (windowWidth / 2)) * 1;

  // var fader = map(mouseX, 0, width, -1, 1);

  // Fader value ranges from 1 to 0 to 1 with mouseX
  // var fader = (abs(mouseX - windowWidth / 2) / (windowWidth / 2)) * 1;

  // console.log(fader);

  for (let i = 0; i < dots.length; i++) {
    dots[i].show(t);
    // dots[i].displace(t);
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
