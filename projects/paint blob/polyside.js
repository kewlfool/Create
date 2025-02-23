class Side {
  constructor(p1, p2, polygon) {
    this.p1 = p1;
    this.p2 = p2;
    this.polygon = polygon;
    this.move = random(5);
  }

  divide(newSides, polygon) {
    let p1 = this.p1;
    let p2 = this.p2;

    let mid = p5.Vector.lerp(p1, p2, random(0.3, 0.7));
    let d = p1.dist(mid) * factor;
    let px = p5.Vector.random2D().mult(d);
    mid.add(px);
    p1.add(px);
    p2.add(px);

    // console.log(this.vertices);
    polygon.vertices.push(mid);
    polygon.vertices.push(p2);
    // this.vertices.push(p1);

    newSides.push(new Side(p1, mid));
    newSides.push(new Side(mid, p2));
    return newSides;
  }

  show(polygon) {
    let c = color(polygon.color);
    c.setAlpha(100);
    // c.setAlpha(alpha);
    stroke(c);
    strokeWeight(1);
    fill(255, 0, 20, 100);
    if (showSide) {
      line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
    }
  }

  update() {
    // sides = sidesS.value();
    // levels = levelsS.value();
    // factor = factorS.value();
    alpha = alphaS.value();
    n = nS.value();
  }
}
