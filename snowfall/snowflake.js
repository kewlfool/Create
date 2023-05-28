
function getRandomSize() {

  let r = randomGaussian(15, 5);
  return abs(r);

  // while (true) {

  //   let r1 = random(1);
  //   let r2 = random(1);


  //   if (r2 > r1) {
  //     return r1 * 30;
  //   }


  // }
}



class Snowflake {


  constructor(img) {

    let x = random(width);
    let y = random(-100, -10);
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector();
    this.r = getRandomSize();
    this.img = img;
    this.xoff = 0;
    this.direction = (random(1) > 0.5) ? 1 : -1;
    this.angle = random(TWO_PI);


  }

  applyForce(force) {
    // paralex effect hack

    let f = force.copy();
    f.mult(this.r)

    // let f = force.copy();
    // f.div(this.mass);
    this.acc.add(f);
  }

  update() {

    this.xoff = sin(this.angle) * this.r;
    this.vel.add(this.acc);
    this.vel.limit(this.r * 0.2);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // Wrapping Left and Right
    if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    }




    this.angle += this.direction * this.vel.mag() / 150;


  }

  render() {
    // stroke(255);
    // strokeWeight(this.r);
    // point(this.pos.x, this.pos.y);

    push();
    imageMode(CENTER);

    translate(this.pos.x + this.xoff, this.pos.y);
    rotate(this.angle)
    image(this.img, 0, 0, this.r, this.r);

    pop();

  }




  offScreen() {
    return (this.pos.y > height + this.r);
  }

}