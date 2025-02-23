class Polygon {
  constructor(n, c) {
    this.sides = []; // sides of polygon

    this.vertices = []; // Store vertices of polygon
    this.r = random(radius, radius + h / 2);
    this.depth = 0; //  current depth level

    // this.c = createVector(c.x, c.y);

    this.p1 = createVector(this.r, 0);
    this.p0 = this.p1.copy();

    this.color = random([
      "#75D9B7",
      "#FD9A9A",
      "#8DBDF0",
      "#F9D472",
      "#BC83F9",
      "#FDA5C6",
      "#80F9D9",
      "#00A4FF",
      "#FBE4E4",
      "#EFFB91",
    ]);

    // this.angle = random(TWO_PI);
    // this is the basic polygon shape based on number of n sides
    for (let i = 1; i <= n; i++) {
      let angle = (TWO_PI / n) * i;

      this.p1 = createVector(this.r * cos(angle), this.r * sin(angle));
      this.sides.push(new Side(this.p0, this.p1, this));
      this.p0 = this.p1;
      this.vertices.push(this.p0);
    }
  }

  iterate() {
    if (this.depth < levels) {
      this.sides = this.divide(this.sides);
      this.depth++;
    }
    // if (depth > 0) {
    //   // this.sides.divide(this.sides);
    //   this.sides = this.divide(this.sides);
    //   this.iterate(depth - 1);
    // } else {
    //   this.show();
    // }
  }

  divide(sides) {
    let newSides = [];
    this.vertices = [];
    this.vertices.push(sides[0].p1);

    for (let side of sides) {
      side.divide(newSides, this);
    }

    let p2 = this.vertices[this.vertices.length - 1];
    let p1 = this.vertices[0];

    newSides.push(new Side(p2, p1, this));
    return newSides;
  }

  show() {
    push();
    let c = color(this.color);
    c.setAlpha(alpha);
    beginShape();
    for (let v of this.vertices) {
      strokeWeight(0);
      stroke(this.color);
      fill(c);
      // let v0 = createVector(this.x(p), this.y(p));
      // v.add(v0);
      vertex(v.x, v.y);
      if (showVertex) {
        push();
        strokeWeight(2);
        stroke(this.color);
        point(v.x, v.y);
        pop();
      }
    }
    endShape(CLOSE);

    pop();
    for (let side of this.sides) {
      side.show(this);
      side.update();
    }
  }
}
