// class Dot extends Particle {
//   constructor(x, y) {
//     super(x, y);

//     // this.r = random(25, 38);
//     this.r = 4;
//     // this.phase = 0;

//     // this.r0 = pow(random(1), 0.7) * 0.5 * h; // radius random distribution to have less dots near the center
//     // this.angle = random(TWO_PI);
//     // this.angle = 0;
//     // this.x0 = this.r0 * cos(this.angle);
//     // this.y0 = this.r0 * sin(this.angle);
//     // this.seed = random(10, 1000);

//     // this.tail = this.r * 1;
//   }

//   follow(vectors) {
//     var x = floor(this.pos.x / scl);
//     var y = floor(this.pos.y / scl);
//     var index = x + y * cols;
//     var force = vectors[index];
//     this.applyForce(force);
//   }
//   show() {
//     push();

//     noFill();
//     stroke(0, 160, 220);
//     strokeWeight(1);
//     // rect(this.pos.x, this.pos.y, scl * mrg, scl * mrg);
//     strokeWeight(this.r);
//     point(this.pos.x, this.pos.y);

//     pop();
//   }
//   edgesBounce() {
//     if (this.pos.y >= height - this.r) {
//       this.pos.y = height - this.r;
//       this.vel.y *= -1;
//     }

//     if (this.pos.x >= width - this.r) {
//       this.pos.x = width - this.r;
//       this.vel.x *= -1;
//     }

//     if (this.pos.y <= this.r) {
//       this.pos.y = this.r;
//       this.vel.y *= -1;
//     } else if (this.pos.x <= this.r) {
//       this.pos.x = this.r;
//       this.vel.x *= -1;
//     }
//   }

//   eggs() {
//     let noiseMax = 3.2;
//     beginShape();
//     push();
//     // noFill();
//     fill(255);
//     translate(this.pos.x, this.pos.y);
//     for (let a = 0; a < TWO_PI; a += 0.03) {
//       // let xoff = noiseMax * cos(a + phase);
//       // let yoff = noiseMax * sin(a + phase);
//       let xoff = map(cos(a + this.phase), -1, 1, 0, noiseMax);
//       let yoff = map(sin(a + this.phase), -1, 1, 0, noiseMax);
//       // let r = 100;
//       let rr = map(
//         noise.noise3D(xoff + this.seed, yoff + this.seed, zoff),
//         0,
//         1,
//         110,
//         160
//       );
//       this.x0 = rr * cos(a);
//       this.y0 = rr * sin(a);
//       vertex(this.x0, this.y0);
//       endShape();
//     }
//     pop();
//     // phase += 0.01;
//     zoff += 0.001;
//   }
// }

class Cell {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.str = 0.5;

    // this.nextState = random(2) > 1;

    if (random(1) > 0.5) {
      // this.nextState = random(2) > 1;
      this.nextState = 1;
    } else {
      this.nextState = 0;
    }

    this.state = this.nextState;

    if (this.state) {
      this.alpha = 255;
    } else {
      this.alpha = 0;
    }
    // this.alpha = 255;

    // if (this.state) {
    //   this.str = map(mouseX, 0, w, 0.5, 4);
    //   this.alpha = map(mouseX, 0, w, 0, 255);
    //   this.strClr = color(255, this.alpha);
    //   this.fillClr = color(255, this.alpha);
    // } else {
    //   this.str = map(mouseY, 0, h, 0.5, 4);
    //   this.alpha = map(mouseY, 0, h, 0, 255);
    //   this.strClr = color(0, this.alpha);
    //   this.fillClr = color(0, this.alpha);
    // }

    // if (this.state) {
    //   this.strClr = color(255, this.alpha);
    //   this.fillClr = color(255, this.alpha);
    // } else {
    //   this.strClr = color(0, this.alpha);
    //   this.fillClr = color(0, this.alpha);
    // }

    this.nbr = [];

    // this.vel = p5.Vector.random2D();
    // this.vel.mult(0.15);
    // this.maxSpeed = 4;
    // this.acc = createVector(0, -0.3);
    // this.maxForce = 1;
  }

  addNeighbor(cell) {
    this.nbr.push(cell);
  }

  calcNextState() {
    // To be implemented

    let liveCount = 0;
    for (let i = 0; i < this.nbr.length; i++) {
      if (this.nbr[i].state == true) {
        liveCount++;
      }
    }
    if (this.state == true) {
      if (liveCount == 2 || liveCount == 3) {
        this.nextState = true;
      } else {
        this.nextState = false;
      }
    } else {
      if (liveCount == 3) {
        this.nextState = true;
      } else {
        this.nextState = false;
      }
    }
  }

  // update() {

  show() {
    push();
    strokeWeight(0.5);
    this.state = this.nextState;
    noFill();
    // fill(255);

    if (this.state) {
      fill(0);
    } else {
      fill(222);
    }
    rect(this.pos.x, this.pos.y, scl, scl);
    pop();
  }
}

class Line extends Cell {
  constructor(x, y) {
    super(x, y);
  }

  update() {
    if (this.state) {
      this.str = map(mouseX, 0, w, 0.5, 25);
      // strokeWeight(1);
    } else {
      this.str = map(mouseY, 0, h, 0.5, 25);
    }
  }

  show() {
    push();
    strokeWeight(this.str);
    strokeCap(PROJECT);
    stroke(0);
    this.state = this.nextState;
    fill(255);

    if (this.state) {
      line(this.pos.x, this.pos.y, this.pos.x + sclX, this.pos.y + sclY);
    } else {
      line(this.pos.x + sclX, this.pos.y, this.pos.x, this.pos.y + sclY);
    }
    pop();
  }
}

class Circle extends Cell {
  constructor(x, y) {
    super(x, y);
  }

  update() {
    push();

    if (this.state) {
      this.str = map(mouseX, 0, w, 0.5, 4);
      this.alpha = map(mouseX, 0, w, 0, 255);
      this.strClr = color(255, this.alpha);
      this.fillClr = color(255, this.alpha);
    } else {
      this.str = map(mouseY, 0, h, 0.5, 4);
      this.alpha = map(mouseY, 0, h, 0, 255);
      this.strClr = color(0, this.alpha);
      this.fillClr = color(0, this.alpha);
    }

    pop();
  }

  show() {
    push();
    // blendMode(MULTIPLY);

    this.state = this.nextState;
    // this.str = 4;
    strokeWeight(this.str);
    strokeCap(PROJECT);
    stroke(this.strClr);
    fill(this.fillClr);
    // noFill();

    ellipse(this.pos.x, this.pos.y, sclX, sclY);
    pop();
  }
}

class Branch {
  constructor(level = 1, index = 0, x = w / 2, y = h / 2) {
    this.level = level;
    this.index = index;

    this.strokeW = (1 / this.level) * 100;
    this.alpha = 255 / this.level;
    this.len = (1 / this.level) * random(0.9);
    this.lenChange = random(10) - 5;
    this.rot = random(360);
    this.rotChange = random(10) - 5;
    // this.end = createVector(random(w), random(h));

    this.child = [];
    this.update(x, y);

    if (this.level < maxLevel) {
      for (let x = 0; x < numChild; x++) {
        let c = new Branch(this.level + 1, x, this.end.x, this.end.y);
        this.child.push(c);
      }
    }
  }

  update(x, y) {
    this.pos = createVector(x, y);

    this.rot += this.rotChange;
    if (this.rot > 360) {
      this.rot = 0;
    } else if (this.rot < 0) {
      this.rot = 360;
    }

    this.len -= this.lenChange;

    if (this.len < 0) {
      this.lenChange *= -1;
    } else if (this.len > 200) {
      this.lenChange *= -1;
    }

    let rad = radians(this.rot);
    this.end = createVector(
      this.pos.x + this.len * cos(rad),
      this.pos.y + this.len * sin(rad)
    );

    for (let i = 0; i < this.child.length; i++) {
      this.child[i].update(this.end.x, this.end.y);
    }
    // this.vel.add(this.acc);
    // this.vel.limit(this.maxSpeed);
    // this.pos.add(this.vel);
    // this.acc.set(0, 0);
  }

  show() {
    push();
    strokeWeight(this.strokeW * 0.2);
    stroke(2, this.alpha);
    fill(222, this.aplha);
    point(this.end);
    line(this.pos.x, this.pos.y, this.end.x, this.end.y);
    ellipse(this.pos.x, this.pos.y, this.len / 20, this.len / 20);
    for (let i = 0; i < this.child.length; i++) {
      this.child[i].show();
    }
    pop();
  }
}
