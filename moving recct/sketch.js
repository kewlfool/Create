let shapes = [];

let x = 0;
let y = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // angleMode(DEGREES);

  // rectMode(CENTER);
}

function draw() {
  // noLoop();
  // console.log(shapes.length);
  frameRate(1);
  background("#E7ECF2");
  shapes.push(
    new Shape(
      width * 0.8,
      // height / 2 + map(noise(frameCount * 0.01), 0, 1, -height / 2, height / 2),
      height * 0.5,
      map(noise(1000 + frameCount * 0.025), 0, 1, 3, 20),
      map(noise(10000 + frameCount * 0.025), 0, 1, 0, 300),
      map(noise(100000 + frameCount * 0.01), 0, 1, -360, 360)
    )
  );
  // shapes[0].move();
  // shapes[0].display();
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].move();
    shapes[i].display();
  }
  for (let j = shapes.length - 1; j >= 0; j--) {
    if (shapes[j].isFinish) {
      shapes.splice(j, 1);
    }
  }
}

class Shape {
  constructor(tmpX, tmpY, tmpW, tmpH, tmpT) {
    this.x = tmpX;
    this.y = tmpY;
    this.w = tmpW;
    this.h = tmpH;
    this.t = tmpT;
    this.isFinish = false;
  }

  move() {
    this.x -= 5;
    // console.log(this.x);
    if (this.x < width * 0.1) {
      this.isFinish = true;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    // rotate(this.t);

    stroke(200, 0, 0);
    fill(random(220), random(220), random(220));
    rect(0, this.h, this.w, this.h * 0.5);
    // stroke(0, 0, 200);
    // rect(0, this.h / 2, this.w, this.h * 0.5);

    pop();
  }
}