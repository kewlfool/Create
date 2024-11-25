class Particle {
  constructor(i) {
    this.r = 180;
    this.i = i;
    // this.r = random(250);
    this.angle = random(TWO_PI);
    // this.angle = (i * TWO_PI) / count;

    // this.posC = createVector(windowWidth / 2, windowHeight / 2);
    this.posC = createVector(random(width), random(height));
    // this.posC = createVector(0, 0);
    this.posC.x = this.r * cos((i * TWO_PI) / countOG) + windowWidth / 2;
    this.posC.y = this.r * sin((i * TWO_PI) / countOG) + windowHeight / 2;

    this.posR = createVector(
      Math.floor(Math.random() * height + (width - height) / 2),
      Math.floor(Math.random() * height)
    );
    // this.posR = createVector(random(width), random(height));
    this.pos = this.posR.copy();
    this.size = random(5, 15);
  }

  update(fade) {
    this.pos.x = lerp(this.posR.x, this.posC.x, fade);
    this.pos.y = lerp(this.posR.y, this.posC.y, fade);
  }

  show() {
    push();
    // translate(windowWidth / 2, windowHeight / 2);
    strokeWeight(2);
    stroke(0, 200, 200);
    fill(252, 238, 33);
    circle(this.pos.x, this.pos.y, this.size);
    // point(this.pos.x, this.pos.y);
    pop();

    // strokeWeight(1);
    // stroke(252, 2000, 0);
    // fill(252, 28, 33);
    // circle(this.pos.x, this.pos.y, this.size);
  }
}

// SPRIRAL OG CODE FROM SOMEONE ELSE THAT I MODIFIED

class Circle {
  constructor(i) {
    this.i = i;
    this.circlePos = createVector(random(width), random(height));
    this.circlePos.x = r * cos((i * TWO_PI) / countOG) + windowWidth / 2;
    this.circlePos.y = r * sin((i * TWO_PI) / countOG) + windowHeight / 2;

    // this.randomPos = createVector(random(width), random(height));
    this.randomPos = createVector(
      Math.floor(Math.random() * height + (width - height) / 2),
      Math.floor(Math.random() * height)
    );

    this.pos = this.randomPos.copy();
    this.size = Math.floor(Math.random() * 18 + 1);
    this.fillColor = color(Math.random() * 50 + 200);
  }

  update(fader) {
    this.pos.x = lerp(this.randomPos.x, this.circlePos.x, fader);
    this.pos.y = lerp(this.randomPos.y, this.circlePos.y, fader);
    // this.size = Math.floor(Math.sin(frameCount * 0.01) * 20 + 5);
  }

  show() {
    push();
    stroke(0);
    fill(this.fillColor);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
    pop();
  }
}
