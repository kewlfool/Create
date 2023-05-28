class Walker {
  constructor(x = width / 2, y = height / 2) {
    this.pos = createVector(x, y);
    this.vel = createVector(4, 4);
    this.c = color(random(255), random(255), random(255), 50);
  }

  display() {
    strokeWeight(5);
    stroke(this.c);
    point(this.pos.x, this.pos.y);
  }

  step() {





    let r = floor(random(4));

    switch (r) {
      case 0:

        this.pos.x += this.vel.x;
        break;

      case 1:

        this.pos.x -= this.vel.x;
        break;

      case 2:

        this.pos.y += this.vel.y;
        break;

      case 3:

        this.pos.y -= this.vel.y;
        break;
    }
  }
}
