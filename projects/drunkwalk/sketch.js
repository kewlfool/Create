// random walker that follows mouse pointer
// in a random path, obiously

var bgcolor;
// var button;

let walker;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  // let canvas = createCanvas(500, 500);
  canvas.id("sketch-container");
  canvas.position(0, 0, "fixed");
  canvas.style("z-index", "-100");

  bgcolor = color(222, 222, 222);
  background(bgcolor);

  walker = new Particle();

  //   button = createButton("BG Color");
  // 	button.position(windowWidth/2-60, windowHeight-80, 'fixed');
  // 	button.style('z-index','10');
  //   button.mousePressed(changeBG);
}

function draw() {
  // background(bgcolor);

  walker.show();
  walker.update();
  walker.edges();
  frameRate(33);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function changeBG() {
  background(random(30, 255), random(30, 255), random(30, 255), 80);
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));

    this.step = p5.Vector.random2D();

    this.prevPos = this.pos.copy();
    this.r = 0;
  }

  update() {
    this.step = p5.Vector.random2D();

    this.r = random(100);

    if (this.r < 35) {
      // Calculate the direction from the vector's position to the mouse position
      let direction = createVector(mouseX - this.pos.x, mouseY - this.pos.y);

      // Normalize the direction vector to have a length of 1
      direction.normalize();

      // Update the vector's direction
      this.step.set(direction);

      // this.step.mult(random(40, 60));
      // this.step.set(this.mouseV);
      this.step.setMag(10);
    } else {
      this.step.setMag(10);
    }

    // this.step.add(this.acc);
    // this.step.limit(this.maxspeed);
    // this.pos.add(this.step);
    // this.acc.mult(0);

    this.pos.add(this.step);
  }

  show() {
    stroke(33, 19, 92, 50);
    // stroke(random(10, 255), random(10, 255), random(100, 255), 9);
    strokeWeight(1);

    // point(this.pos.x, this.pos.y);
    // strokeWeight(4);

    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);

    this.updatePrev();
  }

  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }
}
