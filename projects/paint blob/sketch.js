//////////////////
//////////////////

let w, h;

// let noise = 0;

let t = 0;
let sides = 5; // polygon sides
let levels = 3; //  recurssion depth
let factor = 0.8; // displacement of divided vertex
let radius = 10; // min radius of polygon
let alpha = 150; // transparency of polygons
let n = 10; // number of polygons on top of each other
let showVertex = 1; // show polygon vetex or not
let showSide = 1; // show polygon vetex or not

let blob = [];
// let points = [];

let sidesS, levelsS, factorS, alphaS, nS;

function setup() {
  w = windowWidth * 1;
  h = windowHeight * 0.95;
  createCanvas(w, h);

  // sidesS = createSlider(0, 25, 3, 1);
  // levelsS = createSlider(0, 10, 1, 1);
  // factorS = createSlider(0, 2, 0.45, 0.01);
  nS = createSlider(1, n, n, 1);
  alphaS = createSlider(0, 255, alpha, 1);
  // n = nS.value();

  for (let i = 0; i < n; i++) {
    blob.push(new Polygon(sides));
  }
  blendMode(BLEND);
}

function draw() {
  background(255);

  // t += 0.000025;
  // Fader value ranges from 0 to 1 to 0 with mouseX
  // t = 1 - (abs(mouseX - windowWidth / 2) / (windowWidth / 2)) * 1;

  push();
  translate(w / 2, h / 2);

  for (let i = 0; i < n; i++) {
    blob[i].iterate(levels);
    blob[i].show(t);
    // console.log(blob[i].sides);
    // console.log(blob[i].vertices);
  }

  // noLoop();
  pop();
  levels = 0;
}
