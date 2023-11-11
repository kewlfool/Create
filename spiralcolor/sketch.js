// By Aleksandra Jovanic
// twitter: @alexis_o_O
// instagram: aleksandrajovanic
// Submission for twitter.com/sableRaph's #WCCChallenge topic: RIBBONS

let num = 120;
let pos = [];
let stopped = 0;
let c = [];
let rnangle = 0;
let off, minangle, maxangle;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  setup_colors();

  strokeWeight(10);
  noFill();
  frameRate(25);

  //values that will change something :)
  off = 60; // offset from the straight path
  minangle = PI / 8;
  maxangle = PI / 4; //min and max angle - from this range, random angle is chosen for next point on path

  pos[0] = createVector(width / 2, height / 2);

  for (let i = 1; i < num; i++) {
    addPoints(i);
  }
}

//make initial points for curve
function addPoints(i) {
  let rn = random(-off, off);
  rnangle += random(minangle, maxangle);
  pos[i] = createVector(
    cos(rnangle) * (width * 0.4 + rn) + width / 2,
    sin(rnangle) * (width * 0.4 + rn) + height / 2
  );
}

//makes new point for next step
function addNewPoint() {
  let rn = random(-off, off);
  rnangle += random(minangle, maxangle);
  pos[pos.length - 1] = createVector(
    cos(rnangle) * (width * 0.4 + rn) + width / 2,
    sin(rnangle) * (width * 0.4 + rn) + height / 2
  );
}

function draw() {
  background(360, 0, 100, 100);
  let center = createVector(mouseX, mouseY);

  for (let j = 0; j < num - 4; j++) {
    stroke(c[(frameCount + j) % 16]);
    strokeWeight((j + 1) / 5); //change strokeWeight for more depth effect
    beginShape();
    curveVertex(
      ((pos[j].x - center.x) * j) / num + center.x,
      ((pos[j].y - center.y) * j) / num + center.y
    );
    curveVertex(
      ((pos[j + 1].x - center.x) * j) / num + center.x,
      ((pos[j + 1].y - center.y) * j) / num + center.y
    );
    curveVertex(
      ((pos[j + 2].x - center.x) * (j + 1)) / num + center.x,
      ((pos[j + 2].y - center.y) * (j + 1)) / num + center.y
    );
    curveVertex(
      ((pos[j + 3].x - center.x) * (j + 1)) / num + center.x,
      ((pos[j + 3].y - center.y) * (j + 1)) / num + center.y
    );
    endShape();
  }

  for (let i = 0; i < pos.length - 1; i++) {
    pos[i].x = pos[i + 1].x;
    pos[i].y = pos[i + 1].y;
  }

  addNewPoint();
}

function mouseReleased() {
  if (stopped === 1) {
    loop();
    stopped = 0;
  } else {
    noLoop();
    stopped = 1;
  }
}

function setup_colors() {
  c[0] = color(37, 86, 98);
  c[1] = color(19, 92, 99);
  c[2] = color(175, 66, 51);
  c[3] = color(47, 95, 67);
  c[4] = color(217, 6, 53);

  c[6] = color(66, 66, 51);
  c[7] = color(359, 80, 36);
  c[8] = color(169, 66, 22);
  c[5] = color(356, 51, 61);
  c[9] = color(47, 32, 95);
  c[10] = color(30, 81, 87);
  c[11] = color(20, 92, 84);

  c[12] = color(347, 91, 73);
  c[13] = color(211, 94, 25);
  c[14] = color(54, 27, 60);
  c[15] = color(179, 100, 70);
  c[16] = color(354, 91, 4);
}
