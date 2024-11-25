// By Manbir

/////////////////
/////////////////

var cnv;
var lines = [];
var NUMBER_OF_FRAMES = 50 * 3 * 2;
var globalTime = 0;

let w, h;
let cols = 10;
let rows = 10;
let grid = []; // Array of Vectors at cols and rows
let scl = 50; // Size of the Tiles.
let bdr = 90; // Keep border value more than scale in order to work
let mrg = 20;
let startSteps = 5;

let bobs = [];
let n = 1;

let xoff = 0;
let counter = 0.5;
let nR = 2;

const totalFrames = 10;

/////////////////
/////////////////

var nb_points = 400;
var noiseIntensity = 1.5;
var start_pos = 40;
var end_pos = 370;
var start_posh = 65;
var end_posh = 370;

function setup() {
  cnv = createCanvas(400, 400);
  cnv.parent("canvas");

  button = createButton("Generate a new cover");
  button.mousePressed(new_cover);
  button.parent("buttons");
  button.class("btn btn-default");
  button.style("border-radius: 0px");
  button2 = createButton("Pause");
  button2.mousePressed(noLoop);
  button2.parent("buttons");
  button2.class("btn btn-default");
  button2.style("border-radius: 0px");
  button3 = createButton("Play (Warning : it is laggy)");
  button3.mousePressed(loop);
  button3.parent("buttons");
  button3.class("btn btn-default");
  button3.style("border-radius: 0px");
  button4 = createButton("Next time step");
  button4.mousePressed(increase_time);
  button4.parent("buttons");
  button4.class("btn btn-default");
  button4.style("border-radius: 0px");

  noiseDetail(3);

  framesSliderT = createP("Frames per cycle :");
  framesSliderT.parent("buttons");
  framesSlider = createSlider(5, 300, NUMBER_OF_FRAMES, 5);
  framesSlider.parent("buttons");

  lenSliderT = createP("Cycle length :");
  lenSliderT.parent("buttons");
  lenSlider = createSlider(5, 100, 0, 1);
  lenSlider.parent("buttons");

  new_cover();

  noLoop();
}

function draw() {
  increase_time();
}

function new_cover() {
  seed = random(100000);
  for (var i = 0; i < n; i++) {
    lines[i] = new divisionLine(i * 100, seed);
  }

  show_cover();
}

function show_cover() {
  background(0);
  for (var i = 0; i < n; i++) {
    lines[i].show(globalTime);
  }
}

function increase_time() {
  globalTime -= TWO_PI / framesSlider.value();
  show_cover();
}

var divisionLine = function (start_y, seed) {
  this.y = start_y;

  this.offset = 0.5 * noise(seed + 0.07 * start_y);
  // console.log(this.offset);
  this.offset2 = 0.08 * start_y + random(0.1);

  this.show = function (t) {
    stroke(255, 200);
    fill(0);

    this.addedValue = [];
    this.randomArray = [];

    for (var i = 0; i < nb_points; i++) {
      var myRand = random(noiseIntensity);

      // var x = (i * width) / nb_points;
      var x = i;
      var myTime =
        (TWO_PI * (0.025 * x + seed + this.offset)) / lenSlider.value() + t;
      var radius = lenSlider.value() / TWO_PI;
      var myNoise =
        noise(
          radius * cos(myTime) + 0.2 * this.offset2,
          radius * sin(myTime) + 0.2 * this.offset2,
          this.offset2
        ) + 0.56;

      var myNoise2 =
        -5.8 * pow(myNoise, 7.7) -
        10 *
          noise(
            radius * cos(myTime) + 0.2 * this.offset2,
            radius * sin(myTime) + 0.2 * this.offset2,
            this.offset2 + 5
          );

      this.addedValue[i] = myRand + myNoise2;
      this.randomArray[i] = myRand;
    }

    var realY = map(this.y, 0, 400, start_posh, end_posh);

    // beginShape();
    strokeWeight(1);
    // point(start_pos, realY + 0);
    for (var i = 0; i < nb_points; i++) {
      // myInterpoler = transition((i * width) / nb_points);
      myInterpoler = transition(i);
      console.log(myInterpoler);
      let aY = lerp(this.randomArray[i], this.addedValue[i], myInterpoler);
      // console.log(aY);

      point(start_pos + (i * (end_pos - start_pos)) / nb_points, realY + aY);
    }
    // point(end_pos, realY + 0);
    // endShape(CLOSE);
    noStroke();
    // rect(
    //   start_pos - 1,
    //   realY + 2,
    //   end_pos - start_pos + 2,
    //   end_posh + 1 - realY
    // );
  };
};

var sigmoid = function (x) {
  return 1 / (1 + Math.exp(-x));
};

var transition = function (x) {
  var t1 = Math.abs(x - width / 2) / (width / 2);
  // console.log(t1);
  // var t = 0.1 + pow(2.2 * t1, 5);
  var t = 1 / (0.1 + pow(2.2 * t1, 5));
  // console.log(t);
  return sigmoid(t - 3);
  // return t;
};
